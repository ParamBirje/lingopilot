"""
Helps convert image urls to base64
"""

import base64

import requests


async def image_url_to_base64(url, format="png"):
    """
    Convert image url to base64
    """
    response = requests.get(url, timeout=100)
    if response.status_code == 200:
        base64_image = base64.b64encode(response.content).decode("utf-8")
        return f"data:image/{format};base64,{base64_image}"

    raise Exception(f"Failed to retrieve image. Status code: {response.status_code}")
