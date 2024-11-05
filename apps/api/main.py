from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.ai import router as ai_router
from .routes.characters import router as characters_router
from .routes.modes import router as modes_router
from .routes.user import router as user_router

app = FastAPI(
    root_path="/api",
    title="LingoPilot API",
)

# CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(user_router)
app.include_router(modes_router)
app.include_router(ai_router)
app.include_router(characters_router)


@app.get("/healthz")
async def health():
    """
    Health check endpoint
    """
    return {"status": "ok"}
