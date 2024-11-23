"""
Description:
Responsible for loading environment variables from .env file
"""

import os

from dotenv import load_dotenv

load_dotenv()


PEXELS_API_KEY = str(os.environ.get("PEXELS_API_KEY"))

SUPABASE_URL = str(os.environ.get("SUPABASE_URL"))
SUPABASE_KEY = str(os.environ.get("SUPABASE_KEY"))

SAMBANOVA_API_KEY = str(os.environ.get("SAMBANOVA_API_KEY"))

AWS_ACCESS_KEY_ID = str(os.environ.get("AWS_ACCESS_KEY_ID"))
AWS_SECRET_ACCESS_KEY = str(os.environ.get("AWS_SECRET_ACCESS_KEY"))
ENVIRONMENT = str(os.environ.get("ENVIRONMENT"))
