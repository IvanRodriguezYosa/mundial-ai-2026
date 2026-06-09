/**
 * api.js - Backend communication service
 * Centralizes all API calls to FastAPI.
 * If the backend URL changes, only this file needs to be updated.
 */

// Base URL for the backend - in development points to local FastAPI
const BASE_URL = "https://mundial-ai-2026.onrender.com/api";
/**
 * Fetches all World Cup matches
 * @returns {Promise<Array>} List of matches
 */
export const getPartidos = async () => {
    const response = await fetch(`${BASE_URL}/partidos`);
    if (!response.ok) throw new Error("Error al ontener partidos");
    return response.json();
};

/**
 * Fetches the standings table for all groups
 * @returns {Promise<Array>} List of groups with their teams
 */
export const getGrupos = async () => {
  const response = await fetch(`${BASE_URL}/grupos`);
  if (!response.ok) throw new Error("Failed to fetch groups");
  return response.json();
};

/**
 * Fetches the tournament top scorers ranking
 * @returns {Promise<Array>} List of scorers ordered by goals
 */
export const getGoleadores = async () => {
    const response = await fetch(`${BASE_URL}/goleadores`);
    if (!response.ok) throw new Error("Error al obtener goleadores");
    return response.json();
};

/**
 * Fetches general tournament statistics
 * @returns {Promise<Object>} Object with World Cup statistics
 */
export const getEstadisticas = async () => {
    const response = await fetch(`${BASE_URL}/estadisticas`);
    if (!response.ok) throw new Error("Error al obtener estadisticas");
    return response.json();
};