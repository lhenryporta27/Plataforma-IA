import openai from "../../config/openai.js";

const extractJson = (text) => {
  if (!text) {
    throw new Error("La IA no devolvió contenido");
  }

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

export const analyzeQuestionWithAI = async (questionText) => {
  if (!questionText || !questionText.trim()) {
    const error = new Error("El texto de la pregunta es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  const response = await openai.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5.2",
    instructions: `
Eres un evaluador pedagógico experto.
Analiza preguntas académicas creadas por estudiantes.

Debes evaluar la pregunta y devolver SOLO un JSON válido con esta estructura exacta:
{
  "aiLevel": "bajo | medio | alto",
  "aiFeedback": "texto breve y claro",
  "aiImproved": "versión mejorada de la pregunta"
}

Reglas:
- "bajo" = memorística, definición simple, reconocimiento básico
- "medio" = comprensión, relación entre conceptos, explicación
- "alto" = análisis, evaluación, aplicación compleja, pensamiento crítico
- aiFeedback debe ser claro y útil
- aiImproved debe reescribir la pregunta para que sea más académica, clara y retadora
- No devuelvas texto fuera del JSON
    `,
    input: `Pregunta del estudiante: "${questionText}"`,
  });

  const data = extractJson(response.output_text);

  if (!data.aiLevel || !data.aiFeedback || !data.aiImproved) {
    throw new Error("La respuesta de IA no tiene el formato esperado");
  }

  return {
    aiLevel: String(data.aiLevel).toLowerCase(),
    aiFeedback: String(data.aiFeedback).trim(),
    aiImproved: String(data.aiImproved).trim(),
  };
};