# Lara College Chatbot (VLITS)

An AI-powered College Enquiry Chatbot designed for **Vignan's Lara Institute of Technology & Sciences (VLITS)**, Vadlamudi, Guntur.

The project is structured into a clean monorepo separating **Frontend** and **Backend**.

---

## 📁 Project Architecture

```
Lara-College-Chatbot/
├── frontend/                     # React + Vite client
│   ├── src/                      # React source code (pages, components, hooks, utils)
│   ├── public/                   # Public static assets
│   ├── index.html                # HTML entrypoint
│   ├── vite.config.js            # Vite configuration (port 8080)
│   ├── tailwind.config.js        # TailwindCSS design system
│   ├── package.json              # Frontend dependencies
│   ├── .env                      # Frontend environment variables
│   └── .env.example              # Frontend example environment configuration
│
├── backend/                      # Node.js + Express API server
│   ├── src/
│   │   ├── controllers/          # Request handlers (chat, info, suggestions)
│   │   ├── routes/               # API routes (/api/chat, /api/health)
│   │   ├── services/             # AI generation & fallback services
│   │   ├── data/                 # College Knowledge Base & facts
│   │   └── server.js             # Express server entrypoint (port 5000)
│   ├── supabase/                 # Database migrations and edge functions
│   ├── package.json              # Backend dependencies
│   ├── .env                      # Backend environment variables
│   └── .env.example              # Backend example environment configuration
│
├── package.json                  # Root monorepo orchestrator
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start

### 1. Install Dependencies
You can install dependencies across the entire monorepo with one command from the root:
```bash
npm run install:all
```
*(Or install individually: `cd frontend && npm install` and `cd backend && npm install`)*

---

### 2. Run in Development Mode

Run **both Frontend and Backend concurrently** from the root:
```bash
npm run dev
```

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

Alternatively, you can run them individually:
```bash
# Run only Frontend
npm run dev:frontend

# Run only Backend
npm run dev:backend
```

---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API status and overview |
| `GET` | `/api/health` | Service health check |
| `POST` | `/api/chat` | Chat query endpoint (body: `{ "message": "string" }`) |
| `GET` | `/api/chat/suggested` | Suggested college enquiry questions |
| `GET` | `/api/chat/info` | College profile information |

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)
- `VITE_BACKEND_URL`: URL of the backend API (Default: `http://localhost:5000`)
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase anon key

### Backend (`backend/.env`)
- `PORT`: Server port (Default: `5000`)
- `FRONTEND_URL`: Allowed frontend origin for CORS (Default: `http://localhost:8080`)
- `GEMINI_API_KEY`: *(Optional)* Google Gemini API Key for live AI responses
