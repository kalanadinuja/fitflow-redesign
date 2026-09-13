# Technology Comparison Matrix

**Project:** FitFlow Redesign
**Related lab activity:** Activity 3 – Prepare a Technology Comparison Matrix

## Candidate Technology Stacks

Three complete candidate stacks were compared, consolidating the frontend, backend, database and
authentication findings from `frontend-comparison.md` and `backend-database-auth-comparison.md`,
so that the recommendation reflects how the pieces work together rather than scoring components
in isolation.

| Stack | Frontend | Backend | Database | Auth |
|---|---|---|---|---|
| **Stack A (recommended)** | React Native | Node.js/NestJS + Python/FastAPI (AI microservice) | Firebase (Firestore + Realtime) | Firebase Auth |
| Stack B | Flutter | Node.js/NestJS (AI called via external API) | Firebase (Firestore + Realtime) | Firebase Auth |
| Stack C | React Native | Python/FastAPI (monolith incl. AI) | PostgreSQL | Auth0 |

## Weighted Decision Matrix

Criteria were weighted according to FitFlow's project priorities: AI/ML capability and
development speed carry the most weight given the case study's emphasis on the AI workout engine
and time-to-market pressure, followed by real-time capability (core to the social feature) and
performance. Each stack is scored 1 (poor) to 5 (excellent) per criterion.

| Criterion | Weight | Stack A | Stack B | Stack C |
|---|---|---|---|---|
| Development speed | 15% | 4 | 4 | 3 |
| Code reusability | 10% | 4 | 5 | 4 |
| Performance | 15% | 4 | 5 | 4 |
| AI / ML support | 15% | 5 | 3 | 5 |
| Real-time capability | 10% | 5 | 4 | 2 |
| Scalability | 10% | 4 | 4 | 4 |
| Security & compliance | 10% | 4 | 4 | 5 |
| Cost | 5% | 4 | 4 | 3 |
| Maintainability | 10% | 3 | 4 | 4 |
| **Weighted Total (/5)** | 100% | **4.15** | 4.10 | 3.85 |
| **Weighted Total (/100)** | — | **83** | 82 | 77 |

## Recommended Technology Stack

**Stack A** – React Native + Node.js/NestJS + a Python/FastAPI AI microservice + Firebase
(Firestore/Realtime) + Firebase Auth – scores highest overall (83/100), narrowly ahead of Stack B
(82/100) and clearly ahead of Stack C (77/100).

- Stack A wins primarily on AI/ML support and real-time capability – the two criteria most tied
  to FitFlow's differentiating features (the AI Daily Flow engine and the community/social feed) –
  without sacrificing much on development speed.
- Stack B (Flutter) is a very close second, and would be the stronger choice if raw
  cross-platform UI performance and code reuse were the single overriding priority; it loses
  ground because routing AI workloads through Node.js is less natural than a dedicated Python
  service.
- Stack C (Python/FastAPI monolith + PostgreSQL + Auth0) scores best on security/compliance but
  loses significantly on real-time capability, since Firebase's real-time sync has no equivalent,
  turnkey counterpart in this combination.

This result is consistent with – and independently justifies – the technology direction already
described in the FitFlow case study (React Native, Node.js/Firebase, TensorFlow-based AI), giving
confidence that the redesign's stack choice is well-founded rather than simply inherited.

See `architecture-diagram.png` and `architecture-decision-record.md` for how this stack is applied
to the system architecture.
