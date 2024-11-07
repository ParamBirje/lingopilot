"""
Description:
Responsible for fetching images from Pexels API
"""

import random

import requests

from .env_config import PEXELS_API_KEY


def get_pexels_image(query: str, per_page: int = 1) -> str | None:
    """
    Gets the first image from Pexels API
    using search query.

    Returns the image URL if found, else None.
    """

    headers = {
        "Authorization": PEXELS_API_KEY,
    }
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={per_page}"
    response = requests.get(url, headers=headers, timeout=20)

    if response.status_code != 200:
        print("Failed to fetch image")
        print(response.json())
        return None

    data = response.json()
    if not data.get("photos"):
        print("No photos found")
        return None

    total_results = len(data["photos"])
    random_index = random.randint(0, total_results - 1)

    return data["photos"][random_index]["src"]["original"]
