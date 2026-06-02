"""
models.py - Data models for the Mundial AI 2026 application
Defines the data structure using Pydantic.
Pydantic automatically validates that the data has the correct format
"""

from pydantic import BaseModel
from typing import Optional

class  Equipo(BaseModel):
    """ Represents a team in the league stadingns"""
    bandera: str
    nombre: str
    jugados: int
    ganados: int
    empatados: int
    perdidos: int
    goles_favor: int
    goles_contra: int
    puntos: int

class Partido(BaseModel):
    """Represents a mach in the Word cup."""
    equipo_a: str
    bandera_a: str
    equipo_b: str
    bandera_b: str
    goles_a: Optional[int] = None #None if the match has not been played yet.
    goles_b: Optional[int] = None
    estado: str  #"live", "finished", "upcoming"
    hora: str
    grupo: str

class Grupo(BaseModel):
    """Represent a World cup group along with its teams."""
    nombre: str
    equipos: list[Equipo]

class Goleador(BaseModel):
    """Represent a tournament top scorer"""
    nombre: str
    equipo: str
    bandera: str
    goles: int

