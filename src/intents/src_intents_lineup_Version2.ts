/**
 * Intent handler stub: add-to-lineup
 * DERIVED / scaffold — no side effects.
 *
 * Notes:
 * - Adding to lineup can be treated as browsing (ALLOW) or as intent (ROUTE->G2).
 * - This stub supports an `intentful` flag to differentiate.
 * - No state mutations occur here.
 */

export type IntentOutcome = 'ALLOW' | 'BLOCK' | 'ROUTE' | 'NO_OP';
export type Gate = 'G1' | 'G2' | 'G3' | 'G4' | undefined;

export type IntentDecision = {
  outcome: IntentOutcome;
  gate?: Gate;
  reason?: string;
};

export type UserState =
  | 'S0' | 'S1' | 'S2' | 'S3' | 'S4' | 'S5';

export type LineupContext = {
  userId: string;
  userState: UserState;
  targetProId?: string;
  intentful?: boolean; // false = soft bookmark (browsing), true = intentful action
};

/**
 * Handle add-to-lineup intent. NO side effects.
 *
 * Policy (scaffold):
 * - S0 -> BLOCK
 * - S1 -> ROUTE -> G1
 * - S2 -> if intentful -> ROUTE -> G2; else -> ALLOW (browsing)
 * - S3 -> ALLOW
 * - S4 -> BLOCK (pros should not add other pros in MVP)
 * - S5 -> ALLOW
 */
export async function handleLineupIntent(ctx: LineupContext): Promise<IntentDecision> {
  if (ctx.userState === 'S0') {
    return { outcome: 'BLOCK', reason: 'Unauthenticated' };
  }
  if (ctx.userState === 'S1') {
    return { outcome: 'ROUTE', gate: 'G1', reason: 'Role selection required' };
  }
  if (ctx.userState === 'S2') {
    if (ctx.intentful) {
      return { outcome: 'ROUTE', gate: 'G2', reason: 'Buyer qualification required for intentful actions' };
    }
    return { outcome: 'ALLOW', reason: 'Soft bookmark allowed (browsing ≠ commitment)' };
  }
  if (ctx.userState === 'S3') {
    return { outcome: 'ALLOW', reason: 'Buyer qualified' };
  }
  if (ctx.userState === 'S4') {
    return { outcome: 'BLOCK', reason: 'Pro unverified: adding others to lineup is blocked in MVP' };
  }
  if (ctx.userState === 'S5') {
    return { outcome: 'ALLOW', reason: 'Pro verified' };
  }
  return { outcome: 'BLOCK', reason: 'Unhandled state' };
}