"""
data.py - World Cup AI Data
Contains match, group, and statistics data.
In a future version, this data will come from a database or external API.
"""

#World Cup match list
PARTIDOS = [
        {
        "equipo_a": "Argentina",
        "bandera_a": "🇦🇷",
        "equipo_b": "Alemania",
        "bandera_b": "🇩🇪",
        "goles_a": 2,
        "goles_b": 1,
        "estado": "finished",
        "hora": "18 Jun · Grupo D",
        "grupo": "Grupo D"
    },
    {
        "equipo_a": "Francia",
        "bandera_a": "🇫🇷",
        "equipo_b": "España",
        "bandera_b": "🇪🇸",
        "goles_a": 1,
        "goles_b": 1,
        "estado": "finished",
        "hora": "18 Jun · Grupo E",
        "grupo": "Grupo E"
    },
    {
        "equipo_a": "Brasil",
        "bandera_a": "🇧🇷",
        "equipo_b": "Colombia",
        "bandera_b": "🇨🇴",
        "goles_a": 2,
        "goles_b": 0,
        "estado": "live",
        "hora": "74' · Grupo F",
        "grupo": "Grupo F"
    },
    {
        "equipo_a": "Portugal",
        "bandera_a": "🇵🇹",
        "equipo_b": "Inglaterra",
        "bandera_b": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        "goles_a": None,
        "goles_b": None,
        "estado": "upcoming",
        "hora": "19 Jun · 18:00",
        "grupo": "Grupo G"
    },
]

#World cup group standings table
GRUPOS = [
    {
        "nombre": "Grupo A",
        "equipos": [
            {"bandera": "🇧🇷", "nombre": "Brasil", "jugados": 2, "ganados": 2, "empatados": 0, "perdidos": 0, "goles_favor": 5, "goles_contra": 1, "puntos": 6},
            {"bandera": "🇲🇽", "nombre": "México", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 3, "goles_contra": 2, "puntos": 4},
            {"bandera": "🇿🇦", "nombre": "Sudáfrica", "jugados": 2, "ganados": 0, "empatados": 1, "perdidos": 1, "goles_favor": 1, "goles_contra": 3, "puntos": 1},
            {"bandera": "🇨🇷", "nombre": "Costa Rica", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 0, "goles_contra": 3, "puntos": 0},
        ]
    },
    {
        "nombre": "Grupo B",
        "equipos": [
            {"bandera": "🇫🇷", "nombre": "Francia", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 4, "goles_contra": 2, "puntos": 4},
            {"bandera": "🇦🇷", "nombre": "Argentina", "jugados": 2, "ganados": 1, "empatados": 1, "perdidos": 0, "goles_favor": 3, "goles_contra": 2, "puntos": 4},
            {"bandera": "🇳🇬", "nombre": "Nigeria", "jugados": 2, "ganados": 1, "empatados": 0, "perdidos": 1, "goles_favor": 2, "goles_contra": 3, "puntos": 3},
            {"bandera": "🇸🇦", "nombre": "Arabia Saudita", "jugados": 2, "ganados": 0, "empatados": 0, "perdidos": 2, "goles_favor": 1, "goles_contra": 3, "puntos": 0},
        ]
    },
]

#List of World Cup top scorers
GOLEADORES = [
    {"nombre": "Kylian Mbappé", "equipo": "Francia", "bandera": "🇫🇷", "goles": 5},
    {"nombre": "Vinicius Jr.", "equipo": "Brasil", "bandera": "🇧🇷", "goles": 4},
    {"nombre": "Harry Kane", "equipo": "Inglaterra", "bandera": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "goles": 3},
    {"nombre": "Lamine Yamal", "equipo": "España", "bandera": "🇪🇸", "goles": 3},
    {"nombre": "Luis Díaz", "equipo": "Colombia", "bandera": "🇨🇴", "goles": 2},
]