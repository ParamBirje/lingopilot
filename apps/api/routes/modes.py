"""
Description:
Routes for the FastAPI app
"""

from fastapi import APIRouter, Depends

from ..middleware.auth import authenticate_user

router = APIRouter(prefix="/modes")


@router.get("/")
async def get_modes():
    """
    Get all modes
    """
    return {}


@router.post("/character-convo", dependencies=[Depends(authenticate_user)])
async def character_convo():
    """
    Creates a new session for character convo
    also picks a random character
    """
    return {}


@router.get("/character-convo/characters")
async def get_character_convo_modes():
    """
    Get all character convo characters
    """
    return {}
