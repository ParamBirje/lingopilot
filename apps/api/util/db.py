"""
Description:
Supabase DB Client
"""

from supabase import Client, create_client

from .env_config import SUPABASE_KEY, SUPABASE_URL

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
