\# ADR-001: Adopt React Native + NestJS + FastAPI AI Microservice + Firebase



\## Status



Accepted



\## Context



FitFlow needs a fast, cross-platform redesign for iOS, Android, and web. It must support an AI workout engine, camera-based nutrition logging, and real-time social features, delivered by a mid-sized team under time-to-market pressure.



\## Decision



Use:



\- React Native for the client

\- Node.js/NestJS for core API and real-time gateway

\- Python/FastAPI for AI/ML workloads

\- Firebase Firestore/Realtime Database for data

\- Firebase Auth for identity

\- Redis for caching



\## Consequences



Positive:



\- Fast path to simultaneous iOS/Android delivery

\- Strong ecosystem for AI, camera, and real-time features

\- Lower operational overhead for a small team



Trade-offs:



\- Two backend languages add some operational complexity

\- Firestore query flexibility is more limited than PostgreSQL

\- A secondary analytics store may be needed later for complex reporting

