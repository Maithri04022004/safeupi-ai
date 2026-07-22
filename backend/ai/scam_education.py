SCAM_INFO = {
    "lottery": {
        "type": "Lottery Scam",
        "education": (
            "Lottery scams trick people into believing they have won a prize. "
            "Scammers usually ask for taxes or processing fees before releasing the prize. "
            "Legitimate lotteries never ask winners to pay money upfront."
        )
    },

    "prize": {
        "type": "Prize Scam",
        "education": (
            "Prize scams claim you have won a reward and ask for payment to receive it. "
            "Never send money to claim a prize."
        )
    },

    "kyc": {
        "type": "KYC Scam",
        "education": (
            "Scammers pretend to update your bank KYC and ask for personal details or payments. "
            "Banks never ask for KYC updates through random links or UPI payments."
        )
    },

    "otp": {
        "type": "OTP Scam",
        "education": (
            "Never share your OTP with anyone. Banks and payment apps never ask for your OTP over calls or messages."
        )
    },

    "refund": {
        "type": "Refund Scam",
        "education": (
            "Fake refund scams convince users to approve payment requests instead of receiving money. "
            "Always verify refund requests before accepting."
        )
    },

    "investment": {
        "type": "Investment Scam",
        "education": (
            "Fraudsters promise unrealistic profits from investments or crypto schemes. "
            "Always verify investment platforms before sending money."
        )
    },

    "crypto": {
        "type": "Crypto Scam",
        "education": (
            "Be cautious of unknown cryptocurrency investment offers. "
            "Scammers often promise guaranteed returns."
        )
    }
}


def get_scam_education(keywords):
    for keyword in keywords:
        if keyword in SCAM_INFO:
            return (
                SCAM_INFO[keyword]["type"],
                SCAM_INFO[keyword]["education"]
            )

    return None, None