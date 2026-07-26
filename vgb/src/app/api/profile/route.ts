import { NextResponse } from "next/server";
import { requireUser } from "@/lib/session";
import User, {
  publicUser,
  isAllowedAvatar,
  isValidCountryCode,
  ALLOWED_AVATARS,
} from "@/models/User";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await requireUser();
    return NextResponse.json({
      ok: true,
      user: publicUser(user),
      avatars: ALLOWED_AVATARS,
    });
  } catch (e) {
    const status =
      typeof e === "object" && e && "status" in e
        ? Number((e as { status: number }).status)
        : 500;
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => ({}));

    if (typeof body.avatarUrl === "string") {
      const url = body.avatarUrl.trim();
      if (url === "") {
        user.avatarUrl = "";
      } else if (!isAllowedAvatar(url)) {
        return NextResponse.json(
          { ok: false, error: "Avatar non autorisé" },
          { status: 400 }
        );
      } else {
        user.avatarUrl = url;
      }
    }

    if (typeof body.countryCode === "string") {
      const code = body.countryCode.trim().toUpperCase();
      if (code === "") {
        user.countryCode = "";
      } else if (!isValidCountryCode(code)) {
        return NextResponse.json(
          { ok: false, error: "Code pays invalide (ex. FR, JP, US)" },
          { status: 400 }
        );
      } else {
        user.countryCode = code;
      }
    }

    user.lastPlayedAt = new Date();
    user.markModified("avatarUrl");
    user.markModified("countryCode");
    await user.save();

    return NextResponse.json({ ok: true, user: publicUser(user) });
  } catch (e) {
    const status =
      typeof e === "object" && e && "status" in e
        ? Number((e as { status: number }).status)
        : 500;
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Erreur" },
      { status }
    );
  }
}
