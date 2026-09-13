\# FitFlow Redesign



A cross-platform fitness app redesign for FitFlow, using React Native, Node.js/NestJS, a Python/FastAPI AI microservice, and Firebase.



\## Overview



FitFlow is facing declining retention and ratings. The redesign aims to improve user engagement through personalised AI workout plans, camera-based nutrition logging, real-time social features, and a consistent iOS/Android/web experience.



\## Tech Stack



\- Frontend: React Native

\- Backend API: Node.js / NestJS + Socket.io

\- AI Microservice: Python / FastAPI

\- Database: Firebase Firestore + Realtime Database

\- Authentication: Firebase Auth

\- Cache: Redis



See docs/tech-stack-summary.md for full justification.



\## Architecture



!\[FitFlow Architecture](docs/architecture-diagram.png)



The system uses React Native for the client, NestJS for core API and real-time gateway duties, FastAPI for AI workloads, Firebase for data and auth, and Redis for caching.



\## Folder Structure



&#x20;   frontend/      # React Native app

&#x20;   backend/       # NestJS API + Socket.io gateway

&#x20;   ai-service/    # FastAPI AI microservice

&#x20;   docs/          # Reports, matrix, diagram, ADRs



\## Setup Instructions



\### Prerequisites



\- Node.js and npm

\- Python 3.11+

\- Firebase CLI



\### Frontend



&#x20;   cd frontend

&#x20;   npm install

&#x20;   npm start



\### Backend



&#x20;   cd backend

&#x20;   npm install

&#x20;   npm run start:dev



\### AI Service



&#x20;   cd ai-service

&#x20;   python -m venv .venv

&#x20;   .venv\\Scripts\\activate

&#x20;   pip install -r requirements.txt

&#x20;   uvicorn main:app --reload



\## Contribution Guidelines



\- Branch naming: feature/<name>, bugfix/<name>

\- All changes must go through a pull request.

\- At least one review is required before merging into main.



\## License



For academic use only - IT3060 HCI Lab 05, FitFlow redesign.

