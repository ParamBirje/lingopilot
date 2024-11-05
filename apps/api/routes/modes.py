"""
Description:
Routes for modes
"""

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..middleware.auth import authenticate_user
from ..util.db import supabase

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
