/**
 * Coins VGB : victoire / défaite / bonus de connexion quotidienne (série 7 jours).
 * Série : 5, 10, 15, 20, 25, 30, 35 puis repart à 5.
 */

export const COINS_WIN = 10;
export const COINS_LOSS = 5;
export const COINS_DRAW = 5;
export const DAILY_STREAK_MAX = 7;
export const DAILY_STREAK_BASE = 5;

export function dailyBonusForStreakDay(day: number): number {
  const d = Math.max(1, Math.min(DAILY_STREAK_MAX, Math.floor(day) || 1));
  return DAILY_STREAK_BASE * d;
}

/** Clé calendaire locale YYYY-MM-DD (fuseau du serveur / process). */
export function calendarDayKey(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseDayKey(key: string): Date | null {
  if (!key || !/^\d{4}-\d{2}-\d{2}$/.test(key)) return null;
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
}

function daysBetween(aKey: string, bKey: string): number | null {
  const a = parseDayKey(aKey);
  const b = parseDayKey(bKey);
  if (!a || !b) return null;
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86400000);
}

export type CoinsUserLike = {
  coins?: number | null;
  loginStreak?: number | null;
  lastDailyBonusDay?: string | null;
};

export type DailyClaimResult = {
  awarded: number;
  alreadyClaimed: boolean;
  loginStreak: number;
  coins: number;
  dayKey: string;
};

/**
 * Applique le bonus quotidien si pas encore réclamé aujourd'hui.
 * Mutate user fields ; caller doit save.
 */
export function claimDailyLoginBonus(user: CoinsUserLike, now: Date = new Date()): DailyClaimResult {
  const dayKey = calendarDayKey(now);
  const coins = Math.max(0, Number(user.coins) || 0);
  const last = typeof user.lastDailyBonusDay === "string" ? user.lastDailyBonusDay : "";
  let streak = Math.max(0, Number(user.loginStreak) || 0);

  if (last === dayKey) {
    return {
      awarded: 0,
      alreadyClaimed: true,
      loginStreak: streak || 1,
      coins,
      dayKey,
    };
  }

  const gap = last ? daysBetween(last, dayKey) : null;
  if (gap === 1) {
    streak = streak >= DAILY_STREAK_MAX ? 1 : streak + 1;
  } else {
    streak = 1;
  }
  if (streak < 1) streak = 1;
  if (streak > DAILY_STREAK_MAX) streak = 1;

  const awarded = dailyBonusForStreakDay(streak);
  user.loginStreak = streak;
  user.lastDailyBonusDay = dayKey;
  user.coins = coins + awarded;

  return {
    awarded,
    alreadyClaimed: false,
    loginStreak: streak,
    coins: user.coins,
    dayKey,
  };
}

export function awardGameCoins(
  user: CoinsUserLike,
  result: "W" | "L" | "D"
): { awarded: number; coins: number } {
  const amount =
    result === "W" ? COINS_WIN : result === "L" ? COINS_LOSS : COINS_DRAW;
  const coins = Math.max(0, Number(user.coins) || 0) + amount;
  user.coins = coins;
  return { awarded: amount, coins };
}
