import speech_recognition as sr


SCAM_KEYWORDS = {
    "otp": "OTP Scam",
    "one time password": "OTP Scam",
    "cvv": "Card Fraud",
    "bank account": "Bank Impersonation",
    "bank verification": "Bank Impersonation",
    "verify your account": "KYC Scam",
    "kyc": "KYC Scam",
    "reward": "Reward Scam",
    "cashback": "Cashback Scam",
    "lottery": "Lottery Scam",
    "prize": "Lottery Scam",
    "gift": "Gift Scam",
    "refund": "Refund Scam",
    "remote access": "Remote Access Scam",
    "screen share": "Remote Access Scam",
    "anydesk": "Remote Access Scam",
    "teamviewer": "Remote Access Scam",
    "google pay": "UPI Scam",
    "phonepe": "UPI Scam",
    "paytm": "UPI Scam",
    "upi": "UPI Scam",
}


def speech_to_text(audio_path):
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(audio_path) as source:
            audio = recognizer.record(source)

        text = recognizer.recognize_google(audio)

        return {
            "success": True,
            "text": text
        }

    except Exception as e:
        return {
            "success": False,
            "text": "",
            "error": str(e)
        }


def analyze_voice_scam(transcript):
    transcript = transcript.lower()

    detected = []

    for keyword, scam in SCAM_KEYWORDS.items():
        if keyword in transcript:
            detected.append(scam)

    detected = list(set(detected))

    if len(detected) == 0:
        return {
            "risk_level": "Low",
            "confidence": 20,
            "scam_types": [],
            "recommendation": "Conversation appears safe."
        }

    if len(detected) <= 2:
        risk = "Medium"
        confidence = 70
    else:
        risk = "High"
        confidence = 95

    return {
        "risk_level": risk,
        "confidence": confidence,
        "scam_types": detected,
        "recommendation": "Do not share OTP, PIN, passwords or approve unknown UPI requests."
    }


def detect_voice_scam(audio_path):
    speech = speech_to_text(audio_path)

    if not speech["success"]:
        return {
            "success": False,
            "message": speech.get("error", "Unable to process audio.")
        }

    analysis = analyze_voice_scam(speech["text"])

    return {
        "success": True,
        "transcript": speech["text"],
        **analysis
    }