import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const password = String(body.password || "");

    if (!token || token.length < 20) {
      return NextResponse.json(
        { ok: false, error: "Lien invalide ou expiré" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe trop court (min. 6)" },
        { status: 400 }
      );
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    await connectDB();
    const user = await User.findOne({
      passwordResetToken: tokenHash,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, error: "Lien invalide ou expiré" },
        { status: 400 }
      );
    }

    user.passwordHash = await bcrypt.hash(password, 10);
    user.passwordResetToken = "";
    user.passwordResetExpires = null;
    await user.save();

    return NextResponse.json({
      ok: true,
      message: "Mot de passe mis à jour. Vous pouvez vous connecter.",
    });
  } catch (e) {
    console.error("[reset-password]", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
