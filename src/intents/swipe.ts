/**
 * Intent handler stub: swipe
 * DERIVED / scaffold — no side effects.
 *
 * Behavior:
 * - Decision-only (ALLOW / BLOCK / ROUTE / NO_OP)
 * - References G2 (Buyer Qualified) and G3 (Pro Verified) where relevant
 * - Preserves invariants: "Browsing ≠ Commitment", "No Side Effects Before Eligibility"
 *
 * Usage: call handleSwipeIntent(...) from middleware that enforces gates.
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

export type SwipeContext = {
  userId: string;
  userState: UserState;
  targetProId?: string;
  // read-only metadata may be added later
};

/**
 * Handle a swipe intent. NO side effects.
 *
 * Key gate references:
 * - S2 (Buyer Unqualified) -> ROUTE -> G2
 * - S1 -> ROUTE -> G1
 * - S3 -> ALLOW
 * - Pros (S4/S5) -> BLOCK (pros do not initiate swipes in MVP)
 */
export async function handleSwipeIntent(ctx: SwipeContext): Promise<IntentDecision> {
  switch (ctx.userState) {
    case 'S0':
      return { outcome: 'BLOCK', reason: 'Unauthenticated: sign in required' };
    case 'S1':
      return { outcome: 'ROUTE', gate: 'G1', reason: 'Role selection required (G1)' };
    case 'S2':
      return { outcome: 'ROUTE', gate: 'G2', reason: 'Buyer qualification required (G2)' };
    case 'S3':
      return { outcome: 'ALLOW', reason: 'Buyer qualified; allow swipe' };
    case 'S4':
    case 'S5':
      return { outcome: 'BLOCK', reason: 'Pros do not initiate swipes in MVP' };
    default:
      return { outcome: 'BLOCK', reason: 'Unknown state' };
  }
}
