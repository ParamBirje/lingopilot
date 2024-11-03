"""
Description:
Handles the authentication of the user
from Stack Auth
"""

import os

import requests
from fastapi import HTTPException, Request

AUTH_URL = "https://api.stack-auth.com/api/v1/users/me"
AUTH_PROJECT_ID = str(os.environ.get("STACK_PROJECT_ID"))
AUTH_SECRET = str(os.environ.get("STACK_SECRET_SERVER_KEY"))


async def authenticate_user(request: Request):
    """
    Authenticate the user
    """

    headers = {
        "x-stack-access-type": "server",
        "x-stack-project-id": AUTH_PROJECT_ID,
        "x-stack-secret-server-key": AUTH_SECRET,
        "x-stack-access-token": request.headers.get("x-stack-access-token"),
    }

    response = requests.get(AUTH_URL, headers=headers, timeout=10)
    user_id = response.json().get("id")
    if user_id is None:
        print("User is not authenticated")
        raise HTTPException(
            status_code=401,
            detail="User is not authenticated",
        )

    print(f"User is authenticated: {user_id}")
