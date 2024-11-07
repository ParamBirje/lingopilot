"""
Description:
Handles the A.I agents
"""

import asyncio
import time

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from ..middleware.auth import authenticate_user
from ..util.ai import LLAMA_2_1, LLAMA_2_3, LLAMA_8, LLAMA_70, llm_client, polly_client
from ..util.db import supabase

router = APIRouter(
    prefix="/ai",
    # TODO: enable authentication in prod
    # dependencies=[Depends(authenticate_user)],
)


class VoiceBodyParams(BaseModel):
    text: str
    voice_name: str
    voice_engine: str
    language: str
    session_id: str


@router.post("/voice")
async def get_voice_agent(body: VoiceBodyParams):
    """
    Takes in transcript from the user
    and returns a streaming response from the provided character
    """

    # getting history
    # TODO: can be optimized
    response = (
        supabase.table("conversations")
        .select("role, content")
        .eq("session_id", body.session_id)
        .execute()
    )

    start_time = time.perf_counter()
    llm_response = llm_client.chat.completions.create(
        model=LLAMA_2_1,
        messages=[
            {
                "role": "system",
                "content": "You will now roleplay as a friend of mine named Alice that I met right now at the bus stop. You will strictly keep the conversation going by strictly ending with a question back to me.",
            },
            *response.data,
            {"role": "user", "content": body.text},
        ],
    )

    ai_response = llm_response.choices[0].message.content

    end_time = time.perf_counter() - start_time
    print(f"Time taken to generate LLM response: {end_time:.2f}s")

    asyncio.create_task(write_to_db(body, ai_response))

    polly_response = polly_client.synthesize_speech(
        Engine=body.voice_engine,
        Text=ai_response,
        OutputFormat="mp3",
        VoiceId=body.voice_name,
    )

    audio_stream = polly_response["AudioStream"]

    # Create a BytesIO stream to send back as a response
    def audio_streaming():
        data = audio_stream.read(1024)
        while data:
            yield data
            data = audio_stream.read(1024)
        audio_stream.close()

    return StreamingResponse(audio_streaming(), media_type="audio/mpeg")


# Helper functions


def write_to_database_sync(body, ai_response):
    try:
        supabase.table("conversations").insert(
            [
                {
                    "role": "user",
                    "content": body.text,
                    "session_id": body.session_id,
                },
                {
                    "role": "assistant",
                    "content": ai_response,
                    "session_id": body.session_id,
                },
            ]
        ).execute()
    except Exception as e:
        print(e)


async def write_to_db(body, ai_response):
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, write_to_database_sync, body, ai_response)
