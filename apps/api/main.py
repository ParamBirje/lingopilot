from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes.ai import router as ai_router
from .routes.character_convo import router as character_convo_router
from .routes.characters import router as characters_router
from .routes.modes import router as modes_router
from .routes.picture_quest import router as picture_quest_router
from .routes.user import router as user_router
from .util.env_config import ENVIRONMENT

app = FastAPI(
    root_path="/api",
    title="LingoPilot API",
    redirect_slashes=False,
)

# CORS
prod_origins = [
    "https://*.parameater.co",
]
dev_origins = [
    "*",
]
origins = prod_origins if ENVIRONMENT == "PROD" else dev_origins
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
app.include_router(picture_quest_router)
app.include_router(character_convo_router)


@app.get("/healthz")
async def health():
    """
    Health check endpoint
    """
    return {"status": "ok"}
