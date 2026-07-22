import cv2
import re


def extract_upi_id(qr_text: str):
    """
    Extract UPI ID from a decoded QR string.
    Example:
    upi://pay?pa=rahul@oksbi&pn=Rahul...
    """

    if not qr_text:
        return None

    match = re.search(r"[?&]pa=([^&]+)", qr_text)

    if match:
        return match.group(1)

    return None


def analyze_qr(decoded_text: str):
    """
    Basic AI-style heuristic analysis.
    This can later be replaced with an LLM or ML model.
    """

    if not decoded_text:
        return {
            "risk_level": "High",
            "reason": "Unable to decode QR.",
            "recommendation": "Use only trusted merchant QR codes."
        }

    upi_id = extract_upi_id(decoded_text)

    risk = "Low"
    reasons = []
    recommendations = []

    suspicious_keywords = [
        "gift",
        "reward",
        "lottery",
        "prize",
        "refund",
        "cashback",
        "offer",
        "winner"
    ]

    text_lower = decoded_text.lower()

    for word in suspicious_keywords:
        if word in text_lower:
            risk = "Medium"
            reasons.append(
                f"Contains suspicious keyword '{word}'."
            )

    if upi_id is None:
        risk = "High"
        reasons.append("UPI ID not found.")

    if "upi://" not in decoded_text.lower():
        risk = "High"
        reasons.append("Invalid UPI QR format.")

    if risk == "Low":
        recommendations.append(
            "QR appears structurally valid. Always verify recipient before payment."
        )

    elif risk == "Medium":
        recommendations.append(
            "Verify merchant identity before proceeding."
        )

    else:
        recommendations.append(
            "Avoid making payment unless you trust the source."
        )

    return {
        "risk_level": risk,
        "reason": " ".join(reasons) if reasons else "No obvious issues detected.",
        "recommendation": " ".join(recommendations),
        "upi_id": upi_id
    }


def decode_qr(image_path: str):
    """
    Decode QR image using OpenCV.
    """

    image = cv2.imread(image_path)

    if image is None:
        return {
            "success": False,
            "message": "Unable to read image."
        }

    detector = cv2.QRCodeDetector()

    data, points, _ = detector.detectAndDecode(image)

    if not data:
        return {
            "success": False,
            "message": "No QR code detected."
        }

    analysis = analyze_qr(data)

    return {
        "success": True,
        "decoded_text": data,
        **analysis
    }