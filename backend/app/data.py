"""
data.py - Mundial AI 2026 match and tournament data
"""

PARTIDOS = [
    {"equipo_a": "Argentina", "bandera_a": "ar", "equipo_b": "Alemania", "bandera_b": "de", "goles_a": 2, "goles_b": 1, "estado": "finished", "hora": "18 Jun", "grupo": "Grupo D"},
    {"equipo_a": "Francia", "bandera_a": "fr", "equipo_b": "Espana", "bandera_b": "es", "goles_a": 1, "goles_b": 1, "estado": "finished", "hora": "18 Jun", "grupo": "Grupo E"},
    {"equipo_a": "Brasil", "bandera_a": "br", "equipo_b": "Colombia", "bandera_b": "co", "goles_a": 2, "goles_b": 0, "estado": "live", "hora": "74", "grupo": "Grupo F"},
    {"equipo_a": "Portugal", "bandera_a": "pt", "equipo_b": "Inglaterra", "bandera_b": "gb", "goles_a": None, "goles_b": None, "estado": "upcoming", "hora": "19 Jun 18:00", "grupo": "Grupo G"},
]

GRUPOS = [
    {"nombre": "Grupo A", "equipos": [
        {"bandera": "br", "nombre": "Brasil", "jugados": 2, "ganados": 2, "empatados": 0, "perdidos": 0, "goles_favor": 5, "goles_contra": 1, "puntos": 6},
        {"bandera": "mx", "nombre": "Mexico", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 3, "goles_contra": 2, "puntos": 4},
        {"bandera": "za", "nombre": "Sudafrica", "jugados": 2, "ganados": 0, "empatados": 1, "perdidos": 1, "goles_favor": 1, "goles_contra": 3, "puntos": 1},
        {"bandera": "cr", "nombre": "Costa Rica", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 0, "goles_contra": 3, "puntos": 0},
    ]},
    {"nombre": "Grupo B", "equipos": [
        {"bandera": "fr", "nombre": "Francia", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 4, "goles_contra": 2, "puntos": 4},
        {"bandera": "ar", "nombre": "Argentina", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 3, "goles_contra": 2, "puntos": 4},
        {"bandera": "ng", "nombre": "Nigeria", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 2, "goles_contra": 3, "puntos": 3},
        {"bandera": "sa", "nombre": "Arabia Saudita", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 1, "goles_contra": 3, "puntos": 0},
    ]},
    {"nombre": "Grupo C", "equipos": [
        {"bandera": "es", "nombre": "Espana", "jugados": 2, "ganados": 2, "empatados": 0, "perdidos": 0, "goles_favor": 6, "goles_contra": 1, "puntos": 6},
        {"bandera": "de", "nombre": "Alemania", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 3, "goles_contra": 4, "puntos": 3},
        {"bandera": "jp", "nombre": "Japon", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 3, "goles_contra": 3, "puntos": 3},
        {"bandera": "sn", "nombre": "Senegal", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 1, "goles_contra": 5, "puntos": 0},
    ]},
    {"nombre": "Grupo D", "equipos": [
        {"bandera": "pt", "nombre": "Portugal", "jugados": 2, "ganados": 2, "empatados": 0, "perdidos": 0, "goles_favor": 5, "goles_contra": 2, "puntos": 6},
        {"bandera": "gb", "nombre": "Inglaterra", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 3, "goles_contra": 3, "puntos": 3},
        {"bandera": "co", "nombre": "Colombia", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 2, "goles_contra": 2, "puntos": 3},
        {"bandera": "ec", "nombre": "Ecuador", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 1, "goles_contra": 4, "puntos": 0},
    ]},
]

GOLEADORES = [
    {"nombre": "Kylian Mbappe", "equipo": "Francia", "bandera": "fr", "goles": 5},
    {"nombre": "Vinicius Jr.", "equipo": "Brasil", "bandera": "br", "goles": 4},
    {"nombre": "Harry Kane", "equipo": "Inglaterra", "bandera": "gb", "goles": 3},
    {"nombre": "Lamine Yamal", "equipo": "Espana", "bandera": "es", "goles": 3},
    {"nombre": "Luis Diaz", "equipo": "Colombia", "bandera": "co", "goles": 2},
]
