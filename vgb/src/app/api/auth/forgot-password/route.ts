import { NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { isValidEmail, normalizeEmail, sendMail } from "@/lib/mail";

export const dynamic = "force-dynamic";

const GENERIC_OK =
  "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = normalizeEmail(String(body.email || ""));

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });

    // Réponse identique que le compte existe ou non (anti-énumération)
    if (!user) {
      return NextResponse.json({ ok: true, message: GENERIC_OK });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    user.passwordResetToken = tokenHash;
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 h
    await user.save();

    const origin =
      process.env.NEXTAUTH_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      new URL(req.url).origin;
    const resetUrl = `${origin.replace(/\/$/, "")}/reset-password.html?token=${rawToken}`;

    await sendMail({
      to: email,
      subject: "Réinitialisation du mot de passe — Video Games Battle",
      text: `Bonjour ${user.username},\n\nPour choisir un nouveau mot de passe, ouvrez ce lien (valable 1 h) :\n${resetUrl}\n\nSi vous n'êtes pas à l'origine de cette demande, ignorez cet email.`,
      html: `<p>Bonjour <strong>${user.username}</strong>,</p>
<p>Pour choisir un nouveau mot de passe, cliquez sur le lien ci-dessous (valable <strong>1 heure</strong>) :</p>
<p><a href="${resetUrl}">${resetUrl}</a></p>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>`,
    });

    return NextResponse.json({ ok: true, message: GENERIC_OK });
  } catch (e) {
    console.error("[forgot-password]", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
