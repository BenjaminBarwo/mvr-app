# system_flow
This document defines the authoritative runtime flow of the MVR system.

It describes:
	•	how users move between states,
	•	how gates are evaluated,
	•	how intent is intercepted,
	•	and how matches are created or blocked.

This file is the textual source of truth for system behavior.
Visual diagrams (FigJam / PDF) are supporting references, not replacements.

⸻

Core Principle

Browsing is permissive. Commitment is gated.

No user is prevented from exploring the marketplace once authenticated.
All friction is applied only at intent execution time.

⸻

High-Level Lifecycle
	1.	User enters system
	2.	System establishes authentication state
	3.	System establishes role context
	4.	User browses freely
	5.	User expresses intent
	6.	System evaluates gates
	7.	System either:
	•	allows intent and creates side effects, or
	•	blocks intent and routes to qualification/verification
	8.	System resumes original context

⸻

Authentication Layer

Unauthenticated State
	•	No session
	•	No identity
	•	Public-only access (marketing, splash, etc.)
	•	No browsing of marketplace content

Transition
	•	Event: Sign In
	•	Result: Authenticated (role not yet selected)

⸻

Authenticated (No Role Selected)
	•	Identity verified
	•	Session active
	•	Role = null
	•	No permission to render role-scoped UI

System Behavior
	•	Any attempt to access:
	•	feeds
	•	swiping
	•	messaging
	•	publishing
triggers G1 — Role Selected

⸻

G1 — Role Selected Gate

Purpose
Prevent undefined UX and mixed permissions.

Trigger
	•	Post-authentication
	•	Any role-scoped action when role == null

Behavior
	•	Block downstream actions
	•	Allow only role selection UI
	•	Persist selected role to session (reversible)

Outcome
	•	Buyer role → Buyer (Unqualified)
	•	Pro role → Pro (Unverified)

⸻

Buyer Path

Buyer — Unqualified
	•	Can browse Pros and Properties
	•	Can view profiles
	•	Cannot commit intent

Allowed
	•	Scroll feeds
	•	Preview cards
	•	Open profiles

Blocked at Intent (via G4)
	•	Swipe right
	•	Message
	•	Match / add to lineup
	•	Book call

All blocked intent routes to G2 — Buyer Qualified.

⸻

G2 — Buyer Qualified Gate

Purpose
Prevent unqualified buyers from committing intent while preserving exploration.

Trigger
	•	Intent detected:
	•	Swipe right
	•	Message attempt
	•	Match attempt
	•	Add to lineup

Critical Rule
	•	This gate must never trigger during passive browsing.

Evaluation
	•	Plaid / lender signal present?
	•	Manual override present?
	•	Active qualification session already completed?

PASS
	•	Allow intent to proceed
	•	Create match / conversation / lineup entry
	•	Persist Buyer → Qualified

FAIL
	•	Block intent
	•	Preserve browsing context
	•	Intercept with qualification flow
	•	No side effects created

⸻

Buyer — Qualified
	•	Full browsing
	•	Full intent capability

Allowed
	•	Swipe right
	•	Message
	•	Match
	•	Book calls

All intent actions now bypass G2.

⸻

Pro Path

Pro — Unverified
	•	Authenticated
	•	Profile may be partially complete
	•	Not discoverable by Buyers

Allowed
	•	Edit own profile
	•	Browse (self-facing or limited internal surfaces)

Blocked
	•	Receiving messages
	•	Receiving matches
	•	Appearing in Buyer feeds

All publish or engagement attempts route to G3 — Pro Verified.

⸻

G3 — Pro Verified Gate

Purpose
Ensure only legitimate, compliant Pros can receive demand.

Trigger
	•	Profile publish / activation
	•	Visibility evaluation
	•	Message or match routing
	•	Asynchronous re-checks (e.g., license expiry)

Evaluation
	•	Identity verified
	•	Credentials validated
	•	Compliance satisfied
	•	Subscription / eligibility valid (if applicable)

PASS
	•	Pro becomes discoverable
	•	Can receive and respond to intent
	•	State persists as Verified

FAIL
	•	Pro remains undiscoverable
	•	No Buyer-side exposure
	•	No intent routed
	•	Verification checklist shown

⸻

Pro — Verified
	•	Eligible for discovery
	•	Eligible for matching
	•	Eligible for messaging

Downgrade Path
	•	Event: Credential lapse / subscription lapse
	•	Result: Pro → Unverified
	•	Immediate removal from Buyer feeds
	•	No retroactive matches created

⸻

G4 — Intent Detected (Implicit Rule)

Definition
G4 is not a UI surface and not a state.
It is a system rule applied to specific actions.

Intent Signals
	•	Swipe right
	•	Message attempt
	•	Match attempt
	•	Add to lineup

Behavior
On intent signal:
	1.	Evaluate Buyer qualification (G2)
	2.	Evaluate Pro verification (G3)
	3.	Apply friction only if required
	4.	Never mutate state unless intent succeeds

⸻

Match Creation

A match is created only when:
	•	Buyer is Qualified
	•	Pro is Verified
	•	Intent passes all gates

Guarantees
	•	No Pro is notified before eligibility
	•	No partial matches exist
	•	No side effects occur pre-gate

⸻

System Invariants
	•	State changes require explicit events
	•	Gates do not mutate state directly
	•	Approval systems never auto-advance state
	•	Browsing ≠ commitment
	•	Intent without eligibility creates zero side effects
	•	All intent is reversible until match creation

⸻

Relationship to Other Docs
	•	state_action_matrix.md
→ Operational permission table
	•	verification_contracts.md
→ External system requirements (Plaid, credentials)
	•	PDF Flowchart
→ Visual representation of the same logic

If a discrepancy exists, this file and the s[MVR Flo Chart.pdf](https://github.com/user-attachments/files/24950540/MVR.Flo.Chart.pdf)
tate-action matrix take precedence.
