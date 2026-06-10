""""
main.py - Entrada a la app mundial ia 2026
este archivo inicia FastApi y registra las rutas.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="Mundial AI 2026 API" ,
    description="API para seguimiento y pronosticos del mundial 2026",
    version="1.0.0"
)

#CORS: Allows react (running on another port) to consume this API.
#Without this, the browser would block the requests.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:5173",
    "https://mundial-ai-2026.vercel.app"
    ], 
    allow_methods=["*"],
    allow_headers=["*"],
)

#Register the routes defined in the reutes.py file
app.include_router(router, prefix="/api")

#Root route to verify that the server is alive
@app.get("/")
def root():
    """Health check endpoint to verify that the API is working"""
    return {"mwnsaje": "⚽ Mundial AI 2026 API funcionando correctamente"}
