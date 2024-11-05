"""
Description:
Routes for the characters
"""

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse

from ..middleware.auth import authenticate_user
from ..util.db import supabase

router = APIRouter(prefix="/characters")


@router.get("/", dependencies=[Depends(authenticate_user)])
async def get_characters():
    """
    Get all character convo characters
    """
    response = supabase.table("characters").select("*").execute()
    return JSONResponse(content=response.model_dump_json())
