"""
This file contains the API routes for the picture-quest mode.
"""

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from ..helpers.picture_quest_session import retrieve_image_questions
from ..helpers.picture_quest_verify import verify_image_questions
from ..middleware.auth import authenticate_user
from ..util.ai import (
    LLAMA_2_1,
    LLAMA_2_3,
    LLAMA_8,
    LLAMA_70,
    LLAMA_VISION_11,
    llm_client,
)
from ..util.db import supabase

router = APIRouter(prefix="/modes/picture-quest")


@router.get("/questions", dependencies=[Depends(authenticate_user)])
async def get_questions(session_id: int):
    """
    Get questions for the picture quest mode
    """

    response = (
        supabase.table("picture-quest-questions")
        .select("*")
        .eq("session_id", session_id)
        .execute()
    )
    return JSONResponse(content=response.data, status_code=200)


class CreateQuestionsBodyParams(BaseModel):
    session_id: int
    num_questions: int = 1


@router.post("/questions", dependencies=[Depends(authenticate_user)])
async def create_questions(body: CreateQuestionsBodyParams):
    """
    Create questions for the picture quest mode
    """

    session_response = (
        supabase.table("sessions").select("*").eq("id", body.session_id).execute()
    )

    session = session_response.data[0]
    keywords = session["keywords"]

    questions = await retrieve_image_questions(keywords, body.num_questions)

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
        content=questions,
        status_code=200,
    )


class QuestionAnswerBodyParams(BaseModel):
    question_id: int
    answer: str


@router.patch("/questions", dependencies=[Depends(authenticate_user)])
async def update_question_answer(body: QuestionAnswerBodyParams):
    """
    Update the answer for a question
    """

    response = (
        supabase.table("picture-quest-questions")
        .update({"answer": body.answer})
        .eq("id", body.question_id)
        .execute()
    )

    return JSONResponse(
        content=response.data[0],
        status_code=200,
    )


class VerifyQuestionsBodyParams(BaseModel):
    session_id: int


@router.patch("/verify", dependencies=[Depends(authenticate_user)])
async def verify_questions(body: VerifyQuestionsBodyParams):
    """
    Checks the answers and updates expected_answer and reason
    """

    questions_response = (
        supabase.table("picture-quest-questions")
        .select("*")
        .eq("session_id", body.session_id)
        .neq("answer", None)
        .eq("verified", False)
        .execute()
    )

    questions = questions_response.data
    verified_questions = await verify_image_questions(questions)

    verification_update = []
    for question in verified_questions:
        update_response = (
            supabase.table("picture-quest-questions")
            .update(question)
            .eq("id", question["id"])
            .execute()
        )
        verification_update.append(update_response.data[0])

    return JSONResponse(
        content=verification_update,
        status_code=200,
    )
