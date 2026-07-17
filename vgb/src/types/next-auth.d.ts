import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      elo: number;
      wins: number;
      losses: number;
      draws: number;
    } & DefaultSession["user"];
  }

  interface User {
    elo?: number;
    wins?: number;
    losses?: number;
    draws?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    elo?: number;
    wins?: number;
    losses?: number;
    draws?: number;
  }
}
