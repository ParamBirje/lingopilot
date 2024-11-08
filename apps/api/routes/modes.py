"""
Description:
Routes for modes
"""

import random

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.requests import Request

from ..middleware.auth import authenticate_user, get_user_id
from ..util.db import supabase
from ..util.pexels import get_pexels_image

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


@router.post("/character-convo")
async def character_convo(request: Request, body: CharacterConvoCreateBody):
    """
    Creates a new session for character convo
    also picks a random character
    """
    user_id = get_user_id(request)  # also raises if not authenticated
    response = supabase.table("characters").select("*").execute()
    characters = response.data

    random_character = characters[random.randint(0, len(characters) - 1)]
    image = get_pexels_image(random_character["description"])

    insert_response = supabase.table("sessions").insert({"user_id": user_id}).execute()
    session_id = insert_response.data[0]["id"]

    return JSONResponse(
        content={
            "character": random_character,
            "session_id": session_id,
            "difficulty": body.difficulty,
            "language": body.language,
            "image": image,
        },
        status_code=200,
    )
