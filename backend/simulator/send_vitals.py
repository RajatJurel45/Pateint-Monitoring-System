import requests
import time
from datetime import datetime, timezone
from uuid import UUID

API_URL = "http://localhost:8000/ingest/vital"

PATIENT_ID = "11111111-1111-1111-1111-111111111111"
DEVICE_ID = "33333333-3333-3333-3333-333333333333"

while True:
    payload = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "patient_id": PATIENT_ID,
        "device_id": DEVICE_ID,
        "vital_code": "HR",
        "value": 90 + (time.time() % 5),  # small variation
        "quality": 100,
        "source": "simulator"
    }

    response = requests.post(API_URL, json=payload)
    print(response.json())

    time.sleep(1)
