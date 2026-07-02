"""
routes.py - World Cup AI 2026 API Endpoints
Defines all the routes that the frontend can consume.
Each function is an endpoint that responds to an HTTP request.
"""

from fastapi import APIRouter
from app.data import PARTIDOS, GRUPOS, GOLEADORES
from app.models import Partido, Grupo, Goleador
from app.football_service import get_partidos
from app.football_service import get_partidos, get_grupos

#APIRouter organizes all application routes.
router = APIRouter()

@router.get("/partidos")
async def obtener_partidos():
    """
    Returns the complete list of World Cup matches from football-data.org
    """
    matches = await get_partidos()
    return matches


@router.get("/grupos")
async def obtener_grupos():
    """
    Returns World Cup 2026 group standings from football-data.org
    """
    grupos = await get_grupos()
    return grupos

@router.get("/goleadores", response_model=list[Goleador])
def obtener_goleadores():
    """
    Returns the tournament top scorers ranking.
    Sorted by goals scored in descending order.
    """
    return sorted(GOLEADORES, key=lambda x: x["goles"], reverse=True)

@router.get("/estadisticas")
def obtener_estadisticas():
    """
    Returns overall tournament statistics.
    Calculates totals from match and top scorer data.
    """
    #Filter completed matches only
    jugados = [p for p in PARTIDOS if p["estado"] == "finished"]
    #Calculate total goals by summing the goals from each match
    total_goles = sum(
        (p["goles_a"] or 0) + (p["goles_b"] or 0)
        for p in jugados
    )

    return {
        "total_partidos_jugados": len(jugados),
        "total_goles": total_goles,
        "promedio_goles": round(total_goles / len(jugados), 2) if jugados else 0,
        "goleador_lider": GOLEADORES[0]["nombre"] if GOLEADORES else None,
    }

from app.ia_service import pronosticar_partido

@router.get("/pronostico/{equipo_a}/{equipo_b}")
def obtener_pronostico(equipo_a: str, equipo_b: str):
    """
    Generates an AI-powered match prediction between two teams.
    Uses Claude API to analyze and predict match outcome.
    
    Args:
        equipo_a: Home team name
        equipo_b: Away team name
    
    Returns:
        dict with predicted score, scorer, corners, cards and analysis
    """
    resultado = pronosticar_partido(equipo_a, equipo_b)
    return resultado
    