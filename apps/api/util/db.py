"""
Description:
Supabase DB Client
"""

import os

from supabase import Client, create_client

SUPABASE_URL = str(os.environ.get("SUPABASE_URL"))
SUPABASE_KEY = str(os.environ.get("SUPABASE_KEY"))
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
