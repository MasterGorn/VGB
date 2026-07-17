import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import connectDB from "./mongodb";
import User, { type UserDoc } from "@/models/User";

export async function requireUser(): Promise<UserDoc> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw Object.assign(new Error("Non authentifié"), { status: 401 });
  }
  await connectDB();
  const user = await User.findById(session.user.id);
  if (!user) {
    throw Object.assign(new Error("Session invalide"), { status: 401 });
  }
  return user;
}

export function eloUpdate(ratingA: number, ratingB: number, scoreA: number, k = 32) {
  const expectedA = 1 / (1 + 10 ** ((ratingB - ratingA) / 400));
  const expectedB = 1 - expectedA;
  const newA = Math.round(ratingA + k * (scoreA - expectedA));
  const newB = Math.round(ratingB + k * (1 - scoreA - expectedB));
  return [newA, newB] as const;
}
