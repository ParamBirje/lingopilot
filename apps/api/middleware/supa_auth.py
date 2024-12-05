"""
Description:
Handles the authentication of the user
from Supabase Auth
"""

import os

import requests
from fastapi import HTTPException, Request

from ..util.db import supabase


async def authenticate_supa_user(request: Request):
    """
    Authenticate the user
    """

    try:
        access_token = request.headers.get("x-supa-access-token")
        response = supabase.auth.get_user(str(access_token))
        if response is None:
            print("User is not authenticated")
            raise HTTPException(
                status_code=401,
                detail="User is not authenticated",
            )

        return response.user

    except Exception as e:
        print("User is not authenticated", e)
        raise HTTPException(
            status_code=401,
            detail="User is not authenticated",
        )
