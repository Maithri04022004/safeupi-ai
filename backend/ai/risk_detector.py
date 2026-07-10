from datetime import datetime, timedelta
def check_average_amount(current_amount, history):
    if len(history) == 0:
        return False

    total = 0

    for transaction in history:
        total += transaction.amount

    average = total / len(history)

    print("Average Amount:", average)

    if current_amount > average * 3:
        return True

    return False



def check_risk(transaction, history):
    warnings = []

    # Exclude the current transaction from history
    previous_transactions = [
        t for t in history if t.id != transaction.id
    ]
    similar_person = check_similar_recipient(
    transaction.recipient,
    previous_transactions
    )

    recipients = [t.recipient.lower().strip() for t in previous_transactions]
    amounts = [t.amount for t in previous_transactions]

    # New recipient check
    if transaction.recipient.lower().strip() not in recipients:
        warnings.append(
            "You have never sent money to this recipient before."
        )
    if similar_person:
        warnings.append(
            f"A similar recipient '{similar_person}' already exists. Please verify before sending money."
        )

    # High amount check
    if amounts:
        avg_amount = sum(amounts) / len(amounts)

        if transaction.amount > avg_amount * 3:
            warnings.append(
                "This amount is unusually high."
            )

    # Average amount comparison
    if check_average_amount(transaction.amount, previous_transactions):
        warnings.append(
            "This amount is much higher than your usual transaction amount."
        )

    # Frequent transaction check
    if check_frequent_transactions(previous_transactions):
        warnings.append(
            "Multiple transactions detected in a short time."
        )

    # Unusual time check
    if check_unusual_time():
        warnings.append(
            "This transaction is happening at an unusual time."
        )

    return warnings

def check_frequent_transactions(history):
    if len(history) < 2:
        return False

    recent_transactions = sorted(
        history,
        key=lambda x: x.created_at
    )[-2:]

    first_time = recent_transactions[0].created_at
    last_time = recent_transactions[1].created_at

    if last_time - first_time <= timedelta(minutes=5):
        return True

    return False

def check_unusual_time():
    current_hour = datetime.now().hour

    if current_hour >= 0 and current_hour < 5:
        return True

    return False

def calculate_risk_level(warnings):
    count = len(warnings)

    if count == 0:
        return "Low"

    elif count == 1:
        return "Medium"

    else:
        return "High"
    
def check_similar_recipient(current_recipient, history):
    current = current_recipient.lower().strip()

    for transaction in history:
        existing = transaction.recipient.lower().strip()

        # Skip exact match
        if current == existing:
            continue

        # Check if one name starts with the other
        if current.startswith(existing) or existing.startswith(current):
            return transaction.recipient

    return None

def calculate_risk_score(warnings):
    score = 0

    for warning in warnings:

        if "never sent money" in warning:
            score += 20

        elif "similar recipient" in warning:
            score += 25

        elif "unusually high" in warning:
            score += 30

        elif "usual transaction amount" in warning:
            score += 15

        elif "short time" in warning:
            score += 20

        elif "unusual time" in warning:
            score += 10

    return min(score, 100)

def generate_fraud_summary(risk_level, warnings):

    if not warnings:
        return "No suspicious activity detected."

    summary = f"{risk_level} risk because "

    reasons = []

    for warning in warnings:

        if "never sent money" in warning:
            reasons.append("this is a new recipient")

        elif "similar recipient" in warning:
            reasons.append("a similar recipient already exists")

        elif "unusually high" in warning:
            reasons.append("the transaction amount is unusually high")

        elif "usual transaction amount" in warning:
            reasons.append("the amount is much higher than your normal spending")

        elif "short time" in warning:
            reasons.append("multiple transactions happened within a short time")

        elif "unusual time" in warning:
            reasons.append("the transaction happened at an unusual time")

    summary += ", ".join(reasons) + "."

    return summary

def get_recommendations(warnings):
    recommendations = []

    for warning in warnings:

        if "never sent money" in warning:
            recommendations.append(
                "Verify the recipient before sending money."
            )

        elif "similar recipient" in warning:
            recommendations.append(
                "Double-check that you selected the correct recipient."
            )

        elif "unusually high" in warning:
            recommendations.append(
                "Confirm the transaction amount before proceeding."
            )

        elif "usual transaction amount" in warning:
            recommendations.append(
                "Review whether this payment is necessary."
            )

        elif "short time" in warning:
            recommendations.append(
                "Wait a few minutes before making another transaction."
            )

        elif "unusual time" in warning:
            recommendations.append(
                "Make sure this transaction was initiated by you."
            )

    return recommendations