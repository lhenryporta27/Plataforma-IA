import openai from "./openai.js"; // ✅ CORRECTO en hexagonal

const extractJson = (text) => {
  if (!text) {
    throw new Error("La IA no devolvió contenido");
  }

  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("Error parseando JSON de IA:", text);

    throw new Error("La IA devolvió un formato inválido");
  }
};

export const analyzeQuestionWithAI = async (questionText) => {
  if (!questionText || !questionText.trim()) {
    const error = new Error("El texto de la pregunta es obligatorio");
    error.statusCode = 400;
    throw error;
  }

  try {
    const response = await openai.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      instructions: `
Eres un evaluador pedagógico experto.
Analiza preguntas académicas creadas por estudiantes.

Devuelve SOLO JSON válido:

{
  "aiLevel": "bajo | medio | alto",
  "aiFeedback": "texto breve",
  "aiImproved": "pregunta mejorada"
}

Reglas:
- bajo: memorística
- medio: comprensión
- alto: análisis profundo
- NO agregues texto fuera del JSON
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

  } catch (error) {
    console.error("Error IA:", error.message);

    // 🔥 fallback (MUY IMPORTANTE)
    return {
      aiLevel: "pendiente",
      aiFeedback: "No se pudo generar el análisis automático en este momento.",
      aiImproved: questionText,
    };
  }
};