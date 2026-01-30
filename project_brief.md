# Project Brief
Overview

MVR(Most Valuble Raltionships) is a two-sided marketplace that connects home buyers with real estate professionals (realtors, lenders, and related pros) through a relationship-first, intent-gated experience. Unlike traditional listing-centric platforms, MVR prioritizes who the buyer works with before optimizing what they transact on.

The platform allows buyers to browse professionals and inventory freely, while enforcing qualification aka pre-approval and verification only at moments of intent. This preserves exploration, reduces wasted time for professionals, and improves signal quality across the marketplace.

⸻

Target Users

Buyers / Consumers
	•	Individuals exploring homeownership
	•	May be early-stage or undecided
	•	Often unqualified at first, but curious and browsing

Pros
	•	Realtors, lenders, and adjacent professionals
	•	Credentialed individuals seeking higher-quality, better-qualified leads
	•	Sensitive to time waste, compliance, and reputation

⸻

Core Problem

Existing platforms optimize for listings and clicks, not relationships or readiness to close. This leads to:
	•	Unqualified buyers committing intent too early
	•	Professionals wasting time on low-signal leads
	•	Friction applied too early or inconsistently
	•	Poor alignment between buyer readiness and pro engagement

⸻

Core Insight

Friction should not be removed — it should be timed correctly.

MVR applies friction only when a user attempts to commit intent (e.g., swipe, match, message), not during browsing or exploration. This creates a system where:
	•	Buyers can explore without pressure
	•	Pros receive higher-quality engagement
	•	The platform maintains trust and signal integrity

⸻

Product Philosophy
	•	State-driven, not screen-driven
User experience is governed by explicit system states and gates, not ad-hoc UI flows.
	•	Soft → hard gating
Exploration is permissive; commitment is protected.
	•	Separation of identity and capability
Authentication does not imply authorization.
	•	Marketplace trust over growth hacks
Quality, compliance, and clarity are prioritized over short-term volume.

⸻

MVP Definition (High Level)

For MVP, MVR must:
	•	Support a two-sided marketplace (Buyers and Pros)
	•	Allow unrestricted browsing post-authentication
	•	Enforce buyer qualification at intent
	•	Enforce pro verification at visibility and engagement
	•	Preserve user context across all gates
	•	Avoid forced pre-approval or premature friction

Detailed scope is defined in mvp_scope.md.

⸻

What Success Looks Like (MVP)
	•	Buyers can browse freely without being blocked
	•	Pros receive only qualified or qualifying intent
	•	No intent is created without passing required gates
	•	System behavior is predictable, auditable, and extensible
	•	UI, backend, and agent logic align on the same state model

  Non-Goals (At This Stage MVP)
	•	Full MLS ingestion or listing dominance
	•	Advanced recommendation or ranking algorithms
	•	End-to-end transaction handling
	•	Automation of underwriting or approvals
	•	Growth or monetization optimization beyond core flows
