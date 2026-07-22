SCAM_KEYWORDS = [
    "lottery",
    "prize",
    "reward",
    "gift",
    "kyc",
    "verification",
    "otp",
    "refund",
    "investment",
    "crypto",
    "bonus",
    "offer",
    "claim"
]


def detect_scam_purpose(purpose):
    purpose = purpose.lower()

    found_keywords = []

    for word in SCAM_KEYWORDS:
        if word in purpose:
            found_keywords.append(word)

    if found_keywords:
        return True, found_keywords

    return False, []