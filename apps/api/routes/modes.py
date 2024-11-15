"""
Description:
Routes for modes
"""

import json
import random

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.requests import Request

from ..helpers.picture_quest_session import retrieve_image_questions
from ..middleware.auth import authenticate_user, get_user_id
from ..util.ai import (
    LLAMA_2_1,
    LLAMA_2_3,
    LLAMA_8,
    LLAMA_70,
    LLAMA_VISION_11,
    llm_client,
)
from ..util.db import supabase
from ..util.pexels import get_pexels_image

router = APIRouter(prefix="/modes")


@router.get("/")
async def get_modes():
    """
    Get all modes
    """
    return {}


@router.get("/sessions")
async def get_sessions(request: Request, mode: str):
    """
    Get all sessions for a mode
    """
    user_id = get_user_id(request)
    response = (
        supabase.table("sessions")
        .select("*, picture-quest-questions(*)")
        .eq("user_id", user_id)
        .eq("mode", mode)
        .execute()
    )
    return JSONResponse(content=response.data, status_code=200)


class CharacterConvoCreateBody(BaseModel):
    difficulty: str
    language: str


@router.post("/character-convo")
async def character_convo(request: Request, body: CharacterConvoCreateBody):
    """
    Creates a new session for character convo
    also picks a random character
    """
    user_id = get_user_id(request)  # also raises if not authenticated
    response = supabase.table("characters").select("*").execute()
    characters = response.data

    random_character = characters[random.randint(0, len(characters) - 1)]
    image = get_pexels_image(random_character["description"])

    insert_response = (
        supabase.table("sessions")
        .insert(
            {
                "user_id": user_id,
                "mode": "CHARACTER_CONVO",
            }
        )
        .execute()
    )
    session_id = insert_response.data[0]["id"]

    return JSONResponse(
        content={
            "character": random_character,
            "session_id": session_id,
            "difficulty": body.difficulty,
            "language": body.language,
            "image": image,
        },
        status_code=200,
    )


class PictureQuestCreateBody(BaseModel):
    topic: str


@router.post("/picture-quest")
async def picture_quest(request: Request, body: PictureQuestCreateBody):
    """
    Creates a new session for picture quest
    """
    user_id = get_user_id(request)  # also raises if not authenticated

    llm_response = llm_client.chat.completions.create(
        model=LLAMA_8,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": f"""
                    I want you to generate 2-3 keywords (to search images on pexels) about this topic: {body.topic} 
                    You will also generate a suitable concise, short title relevant to the topic. The title should be about the topic,
                    don't include Images in the title.

                    I want you to strictly return only json as follows:
                    {{
                        "title": "Title of the session",
                        "keywords": "Keywords for searching images",
                    }}
                """,
            },
        ],
    )

    keywords_title_response = llm_response.choices[0].message.content
    keywords_title_json = json.loads(str(keywords_title_response))

    keywords = keywords_title_json["keywords"]
    title = keywords_title_json["title"]

    num_questions = 1
    questions = await retrieve_image_questions(keywords, num_questions)

    session_response = (
        supabase.table("sessions")
        .insert(
            {
                "user_id": user_id,
                "mode": "PICTURE_QUEST",
                "title": title,
                "keywords": keywords,
                "image": questions[0]["image"],
            }
        )
        .execute()
    )
    session = session_response.data[0]

    questions_response = (
        supabase.table("picture-quest-questions")
        .insert(
            [
                {
                    "session_id": session["id"],
                    "title": question["title"],
                    "image": question["image"],
                }
                for question in questions
            ]
        )
        .execute()
    )
    questions = questions_response.data

    return JSONResponse(
        content={
            **session,
            "questions": questions,
        },
        status_code=200,
    )
