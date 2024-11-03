from fastapi import APIRouter
from fastapi.responses import JSONResponse

from ..util.db import supabase

router = APIRouter()


@router.get("/languages")
async def get_languages(is_to: bool = False):
    """
    Get all languages
    """

    if is_to:
        response = supabase.table("languages").select("*").eq("type", "TO").execute()
    else:
        response = supabase.table("languages").select("*").eq("type", "FROM").execute()

    return JSONResponse(content=response.model_dump_json())


@router.get("/difficulty")
async def get_difficulty():
    """
    Get all difficulty levels
    """

    response = supabase.table("difficulty").select("*").execute()
    return JSONResponse(content=response.model_dump_json())
