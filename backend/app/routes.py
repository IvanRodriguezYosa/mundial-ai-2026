"""
routes.py - World Cup AI 2026 API Endpoints
Defines all the routes that the frontend can consume.
Each function is an endpoint that responds to an HTTP request.
"""

from fastapi import APIRouter
from app.data import PARTIDOS, GRUPOS, GOLEADORES
from app.models import Partido, Grupo, Goleador

#APIRouter organizes all application routes.
router = APIRouter()

@router.get("/partidos", response_model=list[Partido])
def obtener_partidos():
    """
    Returns the complete list of World Cup matches.
    Includes finished, live, and upcoming matches.
    """
    return PARTIDOS

@router.get("/grupos", response_model=list[Grupo])
def obtener_grupos():
    """
    Returns the standings table for all groups.
    Teams are sorted by points in descending order.
    """
    return GRUPOS

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
    