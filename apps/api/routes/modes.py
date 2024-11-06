"""
Description:
Routes for modes
"""

import random
import uuid

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..middleware.auth import authenticate_user
from ..util.db import supabase

router = APIRouter(prefix="/modes")


@router.get("/")
async def get_modes():
    """
    Get all modes
    """
    return {}


class CharacterConvoCreateBody(BaseModel):
    difficulty: str
    language: str


@router.post("/character-convo", dependencies=[Depends(authenticate_user)])
async def character_convo(body: CharacterConvoCreateBody):
    """
    Creates a new session for character convo
    also picks a random character
    """
    response = supabase.table("characters").select("*").execute()
    characters = response.data

    random_character = characters[random.randint(0, len(characters) - 1)]
    session_id = str(uuid.uuid4())

    # TODO: create session in db

    return JSONResponse(
        content={
            "character": random_character,
            "session_id": session_id,
            "difficulty": body.difficulty,
            "language": body.language,
        },
        status_code=200,
    )
