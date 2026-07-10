from sklearn.ensemble import IsolationForest


def detect_suspicious_amounts(amounts):
    if len(amounts) < 5:
        return []

    data = [[amount] for amount in amounts]

    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    model.fit(data)

    predictions = model.predict(data)

    suspicious = []

    for amount, prediction in zip(amounts, predictions):
        if prediction == -1:
            suspicious.append(amount)

    return suspicious