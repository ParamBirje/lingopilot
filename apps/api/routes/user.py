from fastapi import APIRouter

router = APIRouter()


@router.get("/languages")
async def get_languages(is_to: bool = False):
    """
    Get all languages
    """

    if is_to:
        return {}

    return {}


@router.get("/difficulty")
async def get_difficulty():
    """
    Get all difficulty levels
    """
    return {}
