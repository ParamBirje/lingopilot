"""
Description:
Responsible for AI related operations
"""

import boto3
from openai import OpenAI

from .env_config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SAMBANOVA_API_KEY

# LLM Client

llm_client = OpenAI(
    api_key=SAMBANOVA_API_KEY,
    base_url="https://api.sambanova.ai/v1",
)

LLAMA_8 = "Meta-Llama-3.1-8B-Instruct"
LLAMA_70 = "Meta-Llama-3.1-70B-Instruct"
LLAMA_405 = "Meta-Llama-3.1-405B-Instruct"

LLAMA_VISION_11 = "Llama-3.2-11B-Vision-Instruct"
LLAMA_VISION_90 = "Llama-3.2-90B-Vision-Instruct"

# Polly Client (TTS)

polly_client = boto3.client(
    "polly",
    region_name="us-east-1",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
)
