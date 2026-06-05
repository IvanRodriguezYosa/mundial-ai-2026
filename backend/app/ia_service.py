"""
ia_service.py - AI prediction service using Anthropic Claude
Handles all communication with the Claude API to generate
match predictions, top scorer forecasts and tournament analysis.
"""

import os
import anthropic
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Anthropic client with API key from .env
client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

def pronosticar_partido(equipo_a: str, equipo_b: str) -> dict:
    """
    Generates an AI-powered match prediction between two teams.
    
    Args:
        equipo_a: Home team name
        equipo_b: Away team name
    
    Returns:
        dict with predicted score, scorer, corners, cards and analysis
    """
    
    # Prompt engineered to return structured predictions
    prompt = f"""
    Eres un experto analista de fútbol del Mundial 2026. 
    Analiza el partido entre {equipo_a} vs {equipo_b} y proporciona:
    
    1. Resultado más probable (ejemplo: 2-1)
    2. Goleador más probable y su porcentaje de probabilidad
    3. Total de tiros de esquina estimados
    4. Total de tarjetas amarillas esperadas
    5. Análisis breve del partido (máximo 2 oraciones)
    
    Responde SOLO en formato JSON con esta estructura exacta:
    {{
        "goles_a": número,
        "goles_b": número,
        "goleador": "nombre del jugador",
        "prob_goleador": número entre 0 y 100,
        "corners": "rango ejemplo 8-10",
        "tarjetas": "rango ejemplo 3-5",
        "analisis": "texto del análisis"
    }}
    """
    
    message = client.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=1000,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    # Extract text response from Claude
    respuesta = message.content[0].text
    
    # Parse JSON response
    import json
    # Remove markdown code blocks if present
    respuesta_limpia = respuesta.replace("```json", "").replace("```", "").strip()
    return json.loads(respuesta_limpia) 

