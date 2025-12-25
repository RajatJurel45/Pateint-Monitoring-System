from pydantic import BaseModel
from datetime import datetime
from uuid import UUID


class VitalIngest(BaseModel):
    timestamp: datetime
    patient_id: UUID
    device_id: UUID
    vital_code: str
    value: float
    quality: int = 100
    source: str = "device"
