"""
Description:
Handles the A.I agents
"""

import time

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from ..middleware.auth import authenticate_user
from ..util.ai import (LLAMA_2_1, LLAMA_2_3, LLAMA_8, LLAMA_70, llm_client,
                       polly_client)

router = APIRouter(
    prefix="/ai",
    # TODO: enable authentication in prod
    # dependencies=[Depends(authenticate_user)],
)


class VoiceBodyParams(BaseModel):
    text: str
    character: str
    language: str


@router.post("/voice")
async def get_voice_agent(body: VoiceBodyParams):
    """
    Takes in transcript from the user
    and returns a streaming response from the provided character
    """

    start_time = time.perf_counter()
    response = llm_client.chat.completions.create(
        model=LLAMA_2_1,
        messages=[
            {
                "role": "system",
                "content": "You will now roleplay as a friend of mine named Alice that I met right now at the bus stop. You will strictly return only a single string of plain text. You will always keep the conversation going by strictly ending with a question back to me. Sound natural by adding pauses.",
            },
            {"role": "user", "content": body.text},
        ],
        temperature=0.7,
        top_p=0.7,
    )

    ai_response = response.choices[0].message.content

    end_time = time.perf_counter() - start_time
    print(f"Time taken to generate LLM response: {end_time:.2f}s")

    polly_response = polly_client.synthesize_speech(
        Engine="generative",
        Text=ai_response,
        OutputFormat="mp3",
        VoiceId="Ruth",  # TODO: Change this to the character provided in the request
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
