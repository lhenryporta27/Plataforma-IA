from openai import OpenAI

# ⚠️ REEMPLAZA CON TU API KEY
client = OpenAI(api_key="")


def analizar_pregunta(pregunta):
    prompt = f"""
Eres un experto en educación.

Analiza la siguiente pregunta:

"{pregunta}"

Devuelve en formato claro:

1. Nivel cognitivo (bajo, medio, alto)
2. Feedback sobre la calidad
3. Versión mejorada de la pregunta
"""

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    return response.output[0].content[0].text


# 🔥 EJEMPLO
pregunta_usuario = input("Escribe una pregunta: ")

resultado = analizar_pregunta(pregunta_usuario)

print("\n=== RESULTADO IA ===\n")
print(resultado)
