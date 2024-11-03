"""
Description:
Handles the A.I agents
"""

from fastapi import APIRouter, Depends

from ..middleware.auth import authenticate_user

router = APIRouter(
    prefix="/ai",
    dependencies=[Depends(authenticate_user)],
)


@router.post("/voice")
async def get_voice_agent():
    """
    Takes in transcript from the user
    and returns a streaming response from the provided character
    """
    print("Voice agent")
    return {}
