"""
This file contains the API routes for the character-convo mode.
"""

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..middleware.auth import authenticate_user
from ..util.db import supabase

router = APIRouter(prefix="/modes/character-convo")


@router.get("/message", dependencies=[Depends(authenticate_user)])
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
