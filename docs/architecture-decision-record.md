# ADR-001: Adopt React Native + NestJS + FastAPI AI Microservice + Firebase for the FitFlow Redesign

**Project:** FitFlow Redesign
**Related lab activity:** Activity 4 – Design a High-Level Architecture
**Status:** Accepted
**Date:** 2026-09-04

## Context

FitFlow needs a fast, cross-platform (iOS/Android/web) redesign that supports an AI workout
engine, camera-based nutrition logging, and real-time social features, to be delivered by a
mid-sized team under time-to-market pressure. See `frontend-comparison.md`,
`backend-database-auth-comparison.md`, and `technology-comparison-matrix.md` for the full
comparative analysis behind this decision.

## Decision

Use **React Native** for the client, a **Node.js/NestJS** API for core business logic and the
real-time gateway, a dedicated **Python/FastAPI** microservice for AI/ML workloads, **Firebase**
(Firestore/Realtime Database) as the primary datastore, and **Firebase Auth** for identity.

## System Components

| Layer | Component | Responsibility |
|---|---|---|
| Client | React Native App (iOS/Android) | Primary user-facing app: dashboard, AI plan, nutrition logging, community, progress |
| Client | React Web (marketing/admin) | Public marketing site and a lightweight internal admin/moderation panel |
| Identity | Firebase Auth | Sign-in, session/ID tokens, MFA, social login |
| Compute | Backend API – Node.js/NestJS | REST API, business logic, Socket.io real-time gateway for the social feed |
| Compute | AI Microservice – Python/FastAPI | Personalised workout generation; camera-based food-recognition (computer vision) |
| Compute | Redis Cache | Caches hot data (today's AI plan, leaderboard) and rate-limits API calls |
| Data | Firebase Firestore | Primary data store: profiles, workout plans, nutrition logs, posts |
| Data | Firestore Realtime Listeners | Live updates for the community feed and streak/progress counters |
| Data | Firebase Cloud Storage | Meal photos and profile images |
| Async | Firebase Cloud Messaging | Push notifications for reminders and challenge invites |
| Async | Cloud Functions | Content moderation triggers, scheduled cleanup, GDPR delete requests |
| Integration (optional) | Apple HealthKit / Google Fit | Optional two-way sync of steps/workouts with platform health apps |

See `architecture-diagram.png` for the full visual diagram.

## Key Data Flows

**Personalised AI workout plan:** The app requests today's plan; NestJS verifies the Firebase
Auth token, then forwards the request (with the user's profile/history pulled from Firestore) to
the FastAPI AI microservice. The microservice runs the recommendation model and returns a plan,
which NestJS caches in Redis and writes to Firestore before the app renders the "AI Daily Flow"
card.

**Social sharing / community feed:** A user's post is written directly to Firestore (secured by
Firestore rules tied to their Firebase Auth UID). Firestore's real-time listeners push the update
instantly to other members of the same private circle, while a Cloud Function asynchronously runs
lightweight moderation and analytics on the new post.

**Nutrition tracking (camera-based logging):** A captured meal photo is uploaded to Firebase
Cloud Storage, which triggers a call to the FastAPI computer-vision endpoint. The model returns
detected food items and macros, which are written to the user's nutrition log in Firestore; the
app's confirmation screen updates in real time via a Firestore listener.

## Security, Scalability and Integration Considerations

- All client-to-Firestore traffic is secured by Firestore Security Rules scoped to the
  authenticated user's UID; every REST call to NestJS is validated against a Firebase ID token.
- Data is encrypted at rest (Firebase default) and in transit (TLS everywhere); GDPR/CCPA
  alignment is supported via data-minimisation practices and a Cloud Function that fulfils
  right-to-delete requests.
- The AI microservice is containerised and horizontally scalable independently of the main API
  (e.g. Cloud Run/Kubernetes), so spikes in workout-plan or food-recognition requests do not
  affect core API latency.
- Redis reduces repeated Firestore reads for frequently accessed data (e.g. "today's plan"),
  improving perceived performance and controlling database read costs.
- A GitHub Actions CI/CD pipeline runs lint/tests on every pull request and can deploy the NestJS
  API and the FastAPI microservice independently, matching this modular architecture.

## Consequences

**Positive:** fastest realistic path to simultaneous iOS/Android delivery; strong ecosystem
support for AI and real-time features; lower operational overhead for a small team.

**Trade-offs:** running two backend languages (Node.js and Python) adds a small amount of
operational complexity; Firestore's query flexibility is more limited than a relational database,
which may require a secondary analytics store if complex reporting needs grow.
