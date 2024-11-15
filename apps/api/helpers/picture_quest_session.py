"""
Helper to create picture quest session
"""

import json

from ..helpers.base64 import image_url_to_base64
from ..util.ai import LLAMA_VISION_11, LLAMA_VISION_90, llm_client
from ..util.pexels import get_pexels_images


async def retrieve_image_questions(keywords: str, num_questions: int = 5):
    """
    Retrieve image and questions from AI
    """

    image_urls: list[str] = get_pexels_images(keywords, num_images=num_questions)
    images = []
    for image_url in image_urls:
        base64_image = await image_url_to_base64(image_url)
        images.append(
            {
                "type": "image_url",
                "image_url": {
                    "url": base64_image,
                },
            }
        )

    questions = []
    for idx, image_content in enumerate(images):
        content = [
            {
                "type": "text",
                "text": """
                    For each image below, generate a question that can be asked about the image.
                    It has to be a question that can be answered by looking at the image.
                    No questions that require additional context or general knowledge.

                    Ask questions related to objects, behavior, environment, weather, actions, people, animals, emotions, etc.
                    Whichever is relevant to the image. Don't ask color.
                """,
            },
            image_content,
            {
                "type": "text",
                "text": """
                    You will generate only one question.
                    Your output should just be the question.
                    No need to include any other information.
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

        ai_response = llm_response.choices[0].message.content
        questions.append(
            {
                "title": ai_response,
                "image": image_urls[idx],
            }
        )
        print("Question generated successfully! for image: ", image_urls[idx])

    return questions
