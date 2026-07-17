import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User, { publicUser } from "@/models/User";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const username = String(body.username || "").trim();
    const password = String(body.password || "");

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
    if (password.length < 4) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe trop court (min. 4)" },
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

    const user = await User.create({
      username,
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
