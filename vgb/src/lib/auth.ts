import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "./mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV === "production"
      ? undefined
      : "vgb-dev-nextauth-secret-minimum-32-characters-long"),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Pseudo", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) return null;
          const username = String(credentials.username).trim();
          await connectDB();
          const user = await User.findOne({ username }).collation({
            locale: "en",
            strength: 2,
          });
          if (!user || !(await bcrypt.compare(String(credentials.password), user.passwordHash))) {
            return null;
          }
          return {
            id: String(user._id),
            name: user.username,
            elo: user.elo,
            wins: user.wins,
            losses: user.losses,
            draws: user.draws,
          };
        } catch (e) {
          console.error("[next-auth authorize]", e);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        if ("elo" in user) token.elo = user.elo as number;
        if ("wins" in user) token.wins = user.wins as number;
        if ("losses" in user) token.losses = user.losses as number;
        if ("draws" in user) token.draws = user.draws as number;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.sub || "");
        session.user.name = token.name || "";
        session.user.elo = Number(token.elo ?? 1000);
        session.user.wins = Number(token.wins ?? 0);
        session.user.losses = Number(token.losses ?? 0);
        session.user.draws = Number(token.draws ?? 0);
      }
      return session;
    },
  },
};
