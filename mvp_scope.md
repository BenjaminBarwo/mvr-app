# Mvp scope

This document defines the explicit boundaries of the MVR MVP.
Anything not listed here is out of scope by default, even if it appears obvious, useful, or easy to add.

Agents and contributors must treat this file as a hard constraint.

⸻

MVP Objectives

The MVP exists to validate:
	1.	Intent-gated interaction between buyers and pros
	2.	State-based user flow correctness
	3.	Marketplace signal quality (not volume)
	4.	Feasibility of relationship-first discovery

The MVP does not exist to maximize engagement, revenue, or automation.

⸻

In-Scope: Buyer Side

Authentication
	•	Email / basic account creation
	•	Session persistence
	•	No social login required for MVP

Browsing
	•	Browse pros (profiles, media, basic metadata)
	•	Browse property inventory (limited dataset or mock data acceptable)
	•	Passive consumption only (no intent creation)

Intent Actions (Gated)

The following actions are blocked until qualification:
	•	Swiping right / matching
	•	Messaging a pro
	•	Saving or shortlisting with intent
	•	Requesting contact

Buyer Qualification
	•	Plaid-based financial verification (stub or sandbox acceptable)
	•	Qualification is:
	•	Triggered only on intent
	•	Non-destructive to browsing state
	•	Qualification status is persisted

⸻

In-Scope: Pro Side

Pro Authentication
	•	Account creation
	•	Role selection (realtor, lender, etc.)

Pro Verification
	•	Manual or semi-manual verification (documents, credentials)
	•	Verification required before:
	•	Appearing in discovery
	•	Receiving buyer intent
	•	Verification logic may be mocked but must be state-represented

Pro Presence
	•	Profile creation/editing
	•	Media upload (images/videos, minimal constraints)
	•	Visibility governed by verification state

⸻

In-Scope: System Behavior

State Model

The system must explicitly track:
	•	Authenticated vs unauthenticated
	•	Qualified vs unqualified buyer
	•	Verified vs unverified pro
	•	Browsing vs intent state

States must be:
	•	Deterministic
	•	Inspectable
	•	Enforced consistently across UI and backend

Gating Logic
	•	Gates must:
	•	Intercept actions, not navigation
	•	Preserve user context after completion
	•	Be reversible only by state change (not UI hacks)

Auditability
	•	Every intent creation attempt must be traceable to:
	•	User ID
	•	State at time of attempt
	•	Gate outcome

⸻

Out of Scope (Explicit)

The following are not allowed in MVP:
	•	MLS-wide ingestion
	•	Automated deal matching or ranking
	•	Pricing optimization
	•	Referral payouts
	•	Reviews, ratings, or social proof systems
	•	In-app payments
	•	Notifications beyond basic transactional messages
	•	AI-driven recommendations or personalization
	•	Admin dashboards beyond minimal moderation tools

If it’s not listed in “In Scope,” assume it’s out.

⸻

Acceptable Shortcuts (MVP Only)
	•	Mock data for properties
	•	Manual pro verification
	•	Hardcoded gate logic
	•	Flat UI (no animation polish)
	•	Limited geographic scope
	•	Limited user roles

These shortcuts are allowed only if they preserve state correctness.

⸻

Definition of “Done” (MVP)

The MVP is considered complete when:
	•	A buyer can browse freely, then be gated at intent
	•	A pro can exist, be verified, and receive qualified intent
	•	No intent bypasses required gates
	•	All flows match the documented state model
	•	Agents cannot add features without violating this file
