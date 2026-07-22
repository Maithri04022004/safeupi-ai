import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GOOGLE_API_KEY")
)


def explain_risk(risk_level, warnings):
    prompt = f"""
You are an AI assistant inside the SafeUPI fraud detection system.

Risk Level: {risk_level}

Warnings:
{warnings}

Explain in simple English:
1. Why this transaction is considered {risk_level.lower()} risk.
2. Mention the warnings naturally.
3. Give 2-3 safety precautions.
4. Do NOT mention any bank, customer care, hotline, or phone number.
5. Keep the response under 80 words.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text