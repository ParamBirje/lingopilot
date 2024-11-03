import os

from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("SAMBANOVA_API_KEY"),
    base_url="https://api.sambanova.ai/v1",
)

LLAMA_8 = "Meta-Llama-3.1-8B-Instruct"
LLAMA_70 = "Meta-Llama-3.1-70B-Instruct"
LLAMA_405 = "Meta-Llama-3.1-405B-Instruct"

LLAMA_VISION_11 = "Llama-3.2-11B-Vision-Instruct"
LLAMA_VISION_90 = "Llama-3.2-90B-Vision-Instruct"
