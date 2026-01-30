# State action matrix

This document defines which user actions are allowed, blocked, or intercepted by system gates based on the user’s current authoritative state. It is the operational bridge between the conceptual flowchart and future UI/backend enforcement.

Definitions
States are authoritative system states, not screen states.
Actions are user-initiated intents (explicit or implicit).
Outcomes are one of:
	•	ALLOW: Action proceeds immediately.
	•	BLOCK: Action is denied with explanation.
	•	ROUTE → Gx: Action is intercepted and routed to a system gate.

Legend
G1 — Role Selected
G2 — Buyer Qualified
G3 — Pro Verified
G4 — Intent Detected (implicit, not user-visible)

⸻

AUTHORITATIVE STATES

S0 — Unauthenticated
S1 — Authenticated (No Role Selected)
S2 — Buyer — Unqualified
S3 — Buyer — Qualified
S4 — Pro — Unverified
S5 — Pro — Verified

⸻

CORE ACTION SET (MVP)

A1 — Browse marketplace feed
A2 — View profile (buyer or pro)
A3 — Swipe right / express interest
A4 — Send message
A5 — Accept match
A6 — Book call / off-platform contact
A7 — Edit own profile
A8 — Change role
A9 — Submit verification (buyer or pro)

⸻

STATE × ACTION MATRIX

S0 — Unauthenticated
	•	A1 Browse feed → BLOCK (must authenticate)
	•	A2 View profile → BLOCK
	•	A3 Swipe right → BLOCK
	•	A4 Send message → BLOCK
	•	A5 Accept match → BLOCK
	•	A6 Book call → BLOCK
	•	A7 Edit profile → BLOCK
	•	A8 Change role → BLOCK
	•	A9 Submit verification → BLOCK

S1 — Authenticated (No Role Selected)
	•	A1 Browse feed → ALLOW (neutral, read-only)
	•	A2 View profile → ALLOW (read-only)
	•	A3 Swipe right → ROUTE → G1
	•	A4 Send message → ROUTE → G1
	•	A5 Accept match → ROUTE → G1
	•	A6 Book call → ROUTE → G1
	•	A7 Edit profile → ROUTE → G1
	•	A8 Change role → ROUTE → G1
	•	A9 Submit verification → ROUTE → G1

S2 — Buyer — Unqualified
	•	A1 Browse feed → ALLOW
	•	A2 View pro profile → ALLOW
	•	A3 Swipe right → ROUTE → G2
	•	A4 Send message → ROUTE → G2
	•	A5 Accept match → ROUTE → G2
	•	A6 Book call → ROUTE → G2
	•	A7 Edit profile → ALLOW
	•	A8 Change role → ROUTE → G1
	•	A9 Submit verification (buyer qualification) → ALLOW

S3 — Buyer — Qualified
	•	A1 Browse feed → ALLOW
	•	A2 View pro profile → ALLOW
	•	A3 Swipe right → ALLOW
	•	A4 Send message → ALLOW
	•	A5 Accept match → ALLOW
	•	A6 Book call → ALLOW
	•	A7 Edit profile → ALLOW
	•	A8 Change role → ROUTE → G1
	•	A9 Submit verification → NO-OP (already qualified)

S4 — Pro — Unverified
	•	A1 Browse feed → ALLOW (limited visibility rules apply elsewhere)
	•	A2 View buyer profile → ALLOW (limited)
	•	A3 Swipe right → BLOCK (pros do not initiate swipes in MVP)
	•	A4 Send message → ROUTE → G3
	•	A5 Accept match → ROUTE → G3
	•	A6 Book call → ROUTE → G3
	•	A7 Edit profile → ALLOW
	•	A8 Change role → ROUTE → G1
	•	A9 Submit verification (pro verification) → ALLOW

S5 — Pro — Verified
	•	A1 Browse feed → ALLOW
	•	A2 View buyer profile → ALLOW
	•	A3 Swipe right → BLOCK
	•	A4 Send message → ALLOW
	•	A5 Accept match → ALLOW
	•	A6 Book call → ALLOW
	•	A7 Edit profile → ALLOW
	•	A8 Change role → ROUTE → G1
	•	A9 Submit verification → NO-OP (already verified)
	
	[MVR.Flo.Chart.pdf](https://github.com/user-attachments/files/24950795/MVR.Flo.Chart.pdf)

