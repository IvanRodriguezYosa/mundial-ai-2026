"""
football_service.py - Servicio para consumir la API de football-data.org
Este módulo centraliza todas las llamadas a la API externa de fútbol.
"""

import httpx
import os
from dotenv import load_dotenv

load_dotenv()

# Base URL and authentication header for football-data.org API
FOOTBALL_API_BASE = "https://api.football-data.org/v4"
HEADERS = {"X-Auth-Token": os.getenv("FOOTBALL_API_KEY")}

async def get_partidos():
    """Fetches all World Cup 2026 matches from the external API"""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{FOOTBALL_API_BASE}/competitions/WC/matches",
            headers=HEADERS
        )
        response.raise_for_status()
        data = response.json()
        return [transformar_partido(m) for m in data["matches"]]
    

def transformar_partido(match):
    """Transforms a match from football-data.org format to our app format"""
    return {
        "equipo_a": match["homeTeam"]["name"] or "Por definir",
        "equipo_b": match["awayTeam"]["name"] or "Por definir",
        "goles_a": match["score"]["fullTime"]["home"],
        "goles_b": match["score"]["fullTime"]["away"],
        "estado": match["status"],
        "fecha": match["utcDate"],
        "grupo": match.get("group", ""),
        "bandera_a": (match["homeTeam"].get("tla") or "").lower(),
        "bandera_b": (match["awayTeam"].get("tla") or "").lower(),
    }