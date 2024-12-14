"""
This file contains the API routes for the character-convo mode.
"""

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..middleware.supa_auth import authenticate_supa_user
from ..util.db import supabase

router = APIRouter(prefix="/modes/character-convo")


@router.get("", dependencies=[Depends(authenticate_supa_user)])
async def get_character_convo_session(session_id: int):
    """
    Get a character-convo session
    """
    response = (
        supabase.table("sessions")
        .select("*, characters(*)")
        .eq("id", session_id)
        .eq("mode", "CHARACTER_CONVO")
        .execute()
    )

    if not response.data:
        return JSONResponse(content={"error": "Session not found"}, status_code=404)

    session = response.data[0]
    # Rename the key to character
    session["character"] = session.pop("characters")

    return JSONResponse(content=session, status_code=200)


@router.get("/message", dependencies=[Depends(authenticate_supa_user)])
async def get_latest_message(session_id: int):
    """
    Get the latest message from the character-convo mode
    """
    response = (
        supabase.table("conversations")
        .select("role, content")
        .eq("session_id", session_id)
        .eq("role", "assistant")
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    return JSONResponse(content=response.data[0], status_code=200)
