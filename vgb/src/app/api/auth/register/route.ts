import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User, { publicUser } from "@/models/User";
import { isValidEmail, normalizeEmail } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");
    const email = normalizeEmail(String(body.email || ""));

    if (username.length < 3 || username.length > 24) {
      return NextResponse.json(
        { ok: false, error: "Pseudo entre 3 et 24 caractères" },
        { status: 400 }
      );
    }
    if (!/^[a-zA-Z0-9_\-]+$/.test(username)) {
      return NextResponse.json(
        { ok: false, error: "Pseudo: lettres, chiffres, _ et - uniquement" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Email valide requis" },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe trop court (min. 6)" },
        { status: 400 }
      );
    }

    await connectDB();
    const exists = await User.findOne({ username }).collation({
      locale: "en",
      strength: 2,
    });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "Ce pseudo est déjà pris" },
        { status: 409 }
      );
    }

    const emailTaken = await User.findOne({ email }).collation({
      locale: "en",
      strength: 2,
    });
    if (emailTaken) {
      return NextResponse.json(
        { ok: false, error: "Cet email est déjà utilisé" },
        { status: 409 }
      );
    }

    const user = await User.create({
      username,
      email,
      passwordHash: await bcrypt.hash(password, 10),
      elo: 1000,
    });

    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (e) {
    console.error("[register]", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
