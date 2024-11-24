"""
Description:
Responsible for fetching images from Pexels API
"""

import random

import requests

from .env_config import PEXELS_API_KEY


def get_pexels_image(query: str, per_page: int = 10) -> str | None:
    """
    Gets the first image from Pexels API
    using search query.

    Returns the image URL if found, else None.
    """

    headers = {
        "Authorization": PEXELS_API_KEY,
    }
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={per_page}&size=large"
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

    return data["photos"][random_index]["src"]["large"]


def get_pexels_images(query: str, num_images: int = 5) -> list[str]:
    """
    Gets the first image from Pexels API
    using search query.

    Returns the image URL if found, else None.
    """

    headers = {
        "Authorization": PEXELS_API_KEY,
    }

    colors = [
        "red",
        "orange",
        "yellow",
        "green",
        "turquoise",
        "blue",
        "violet",
        "pink",
        "brown",
        "black",
        "gray",
        "white",
    ]

    another_random_no = random.randint(1, 10)
    random_no = random.randint(another_random_no, 15)
    random_color = colors[len(colors) - another_random_no]
    url = f"https://api.pexels.com/v1/search?query={query}&per_page={num_images}&size=large&page={random_no}&orientation=landscape"
    response = requests.get(url, headers=headers, timeout=20)

    if response.status_code != 200:
        print("Failed to fetch image")
        print(response.json())
        return []

    data = response.json()
    if not data.get("photos"):
        print("No photos found")
        return []

    return [photo["src"]["large"] for photo in data["photos"]]
