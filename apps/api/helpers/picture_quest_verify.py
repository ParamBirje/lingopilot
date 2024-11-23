"""
Helper to verify picture quest questions
"""

import json

from ..helpers.base64 import image_url_to_base64
from ..util.ai import LLAMA_8, LLAMA_70, LLAMA_VISION_11, LLAMA_VISION_90, llm_client


async def verify_image_questions(questions: list[dict]):
    """
    Verify image questions
    """
    verified_questions = []

    for question in questions:
        content = [
            {
                "type": "text",
                "text": """
                    For the image below, check whether the provided answer has correct grammar, spelling according
                    to the question about the image. You are only checking the grammar and spelling of the answer.

                    Let the user write and describe in their own way.
                    Don't be strict. You are the most lenient teacher ever. Allow users to write their own descriptions and opinions.
                    You will allow all types of answers, you will strictly just check the grammar and spelling.
                """,
            },
            {
                "type": "image_url",
                "image_url": {
                    "url": await image_url_to_base64(question["image"]),
                },
            },
            {
                "type": "text",
                "text": f"""
                    Strictly only return json with two keys: expected_answer and reason.
                    {{
                        "expected_answer": "Answer here",
                        "reason": "Reason here"
                    }}

                    If the Answer has wrong grammar or is totally irrelevant to the image
                    then you will provide expected_answer where you will rewrite the correct answer and
                    also provide the reason why it is correct.

                    If the answer is already correct, then you will strictly return null for both.
                    
                    I only want the json, no other information. Just the json object.

                    Question: {question["title"]}
                    Answer: {question["answer"]}
                    JSON:
                """,
            },
        ]

        llm_response = llm_client.chat.completions.create(
            model=LLAMA_VISION_11,
            messages=[
                {
                    "role": "user",
                    "content": content,
                },
            ],
        )

        if llm_response.choices is None:
            print(llm_response)

        ai_response = llm_response.choices[0].message.content
        verified_questions.append(
            {
                "id": question["id"],
                "title": question["title"],
                "answer": question["answer"],
                "verification_description": ai_response,
            }
        )

    json_llm_response = llm_client.chat.completions.create(
        model=LLAMA_70,
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "user",
                "content": f"""
                    I want you to go through the verification_description of each question and extract the information
                    for expected_answer and reason. Don't write me any function, YOU will do it yourself.

                    Please: if the "answer" already has correct grammar and is a sentence, strictly ignore the verification_description and strictly return null 
                    for both expected_answer and reason.

                    If the "answer" does not have correct grammar, then the expected_answer should not be one word, it should be a sentence.
                    It should feel like it is a rewrite of the "answer" but with correct grammar and spelling.
                    The reason should be a concise explanation of why the expected_answer is correct.

                    Questions: {verified_questions}

                    Don't include verification_description in the response.

                    Return the extracted information in strictly json like so:
                    {{
                        "verified_questions": [
                            {{
                                "id": int,
                                "title": "Title of the question",
                                "answer": "Answer of the question",
                                "expected_answer": "Expected answer" | null,
                                "reason": "Reason for the answer" | null
                            }}
                        ]
                    }}

                    I only want the json, no other information. No explanation.
                    Just the json.
                """,
            },
        ],
    )

    if json_llm_response.choices is None:
        print(json_llm_response)

    json_response = json.loads(str(json_llm_response.choices[0].message.content))
    verified_questions = json_response["verified_questions"]
    verified_questions = [
        {
            "id": question["id"],
            "expected_answer": question["expected_answer"],
            "reason": question["reason"],
            "verified": True,
        }
        for question in verified_questions
    ]

    return verified_questions
