/**
 * Intent handler stub: message
 * DERIVED / scaffold — no side effects.
 *
 * Decision-only. References:
 * - G1 (Role Selected)
 * - G2 (Buyer Qualified)
 * - G3 (Pro Verified)
 *
 * This function does NOT send messages or create side effects.
 */

export type IntentOutcome = 'ALLOW' | 'BLOCK' | 'ROUTE' | 'NO_OP';
export type Gate = 'G1' | 'G2' | 'G3' | 'G4' | undefined;

export type IntentDecision = {
  outcome: IntentOutcome;
  gate?: Gate;
  reason?: string;
};

export type UserState =
  | 'S0' // Unauthenticated
  | 'S1' // Authenticated (No Role Selected)
  | 'S2' // Buyer — Unqualified
  | 'S3' // Buyer — Qualified
  | 'S4' // Pro — Unverified
  | 'S5'; // Pro — Verified

export type MessageContext = {
  userId: string;
  userState: UserState;
  targetUserId: string;
  targetIsPro: boolean;
  // read-only metadata may be added later
};

/**
 * Handle a message intent. NO side effects.
 *
 * Rules (scaffolded):
 * - S0 -> BLOCK
 * - S1 -> ROUTE -> G1
 * - S2 (Buyer unqualified) -> ROUTE -> G2
 * - S3 (Buyer qualified) -> ALLOW
 * - S4 (Pro unverified) -> ROUTE -> G3
 * - S5 (Pro verified) -> ALLOW
 *
 * Note: This function does NOT send messages or mutate state; it only returns gate decisions.
 */
export async function handleMessageIntent(ctx: MessageContext): Promise<IntentDecision> {
  if (ctx.userState === 'S0') {
    return { outcome: 'BLOCK', reason: 'Unauthenticated: sign in required to message' };
  }
  if (ctx.userState === 'S1') {
    return { outcome: 'ROUTE', gate: 'G1', reason: 'Role not selected; route to G1' };
  }
  if (ctx.userState === 'S2') {
    return { outcome: 'ROUTE', gate: 'G2', reason: 'Buyer qualification required' };
  }
  if (ctx.userState === 'S3') {
    return { outcome: 'ALLOW', reason: 'Buyer qualified' };
  }
  if (ctx.userState === 'S4') {
    return { outcome: 'ROUTE', gate: 'G3', reason: 'Pro verification required' };
  }
  if (ctx.userState === 'S5') {
    return { outcome: 'ALLOW', reason: 'Pro verified' };
  }
  return { outcome: 'BLOCK', reason: 'Unhandled state' };
}