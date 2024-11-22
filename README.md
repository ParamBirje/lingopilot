<!-- PROJECT LOGO -->
<p align="center">
   <img src="https://github.com/ParamBirje/lingopilot/assets/87022870/bbf5a268-e7a5-43ea-bfce-0b1564cfb22c.png" alt="Logo">

  <h2 align="center">LingoPilot</h2>

  <p align="center">
    Supercharge your language learning journey!
  </p>
</p>

## About the Project

An A.I voice first language learning app that gamifies your journey by honing your speaking, listening, reading and writing skills through comprehensible input at its core!

## Tech Stack

Built using,

- Next.js
- React.js
- Typescript
- Tailwind CSS
- Jotai
- Python
- FastAPI
- StackAuth
- Postgres (Supabase)

<!-- Setting up the project -->

## Running locally

### 🐳 Docker
#### Pre-requisites

- Ensure you have [Docker Engine and Docker Compose v2](https://docs.docker.com/compose/install/) installed and the engine is running.

#### App Setup

Let's start with the steps for setting up the project.

- Clone the repo to your local system

```
git clone https://github.com/ParamBirje/lingopilot.git
```

- Change working directory to the project's root `cd lingopilot`

- Locate the `.env.example` in both the `apps/web` and `apps/api` directories and rename it as `.env`. Get API keys and assign it to the environment variables in both the `.env` files in their respective directories.

For `apps/web/.env`:
```
# Stack Auth keys
NEXT_PUBLIC_STACK_PROJECT_ID=
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=
STACK_SECRET_SERVER_KEY=
```

For `apps/api/.env`:
```
# Stack Auth
STACK_PROJECT_ID=
STACK_SECRET_SERVER_KEY=

SAMBANOVA_API_KEY=
PEXELS_API_KEY=

SUPABASE_URL=
SUPABASE_KEY=

# For Polly TTS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

- Inside the project root directory, run this command:

```
docker compose up --build
```

- That's it! Great job!
  You can now access the app in your browser on [http://localhost:3000](http://localhost:3000/)
