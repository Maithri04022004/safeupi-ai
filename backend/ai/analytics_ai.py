def generate_insights(
    total_transactions,
    total_amount,
    average_transaction,
    most_frequent_recipient,
    high_risk,
    medium_risk,
    low_risk
):
    insights = []

    insights.append(
        f"You have completed {total_transactions} transactions."
    )

    insights.append(
        f"Your average transaction amount is ₹{average_transaction}."
    )

    insights.append(
        f"Your most frequent recipient is {most_frequent_recipient}."
    )

    if high_risk > medium_risk and high_risk > low_risk:
        insights.append(
            "Most of your transactions are classified as High Risk."
        )

    elif medium_risk > low_risk:
        insights.append(
            "Most of your transactions are Medium Risk."
        )

    else:
        insights.append(
            "Most of your transactions are Low Risk."
        )
    
    return insights