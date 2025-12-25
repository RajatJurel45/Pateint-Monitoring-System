from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from datetime import datetime

from app.schemas import VitalIngest
from app.ws_manager import ConnectionManager
from app.kafka_producer import publish_vital
from threading import Thread
from app.kafka_consumer import start_consumer



# -------------------------------------------------
# FASTAPI APP
# -------------------------------------------------
app = FastAPI(
    title="ICU Patient Monitoring Backend",
    version="0.5.0",
    description="Backend service for ICU monitoring system (Kafka Producer Mode)"
)

manager = ConnectionManager()


# -------------------------------------------------
# BASIC HEALTH CHECK
# -------------------------------------------------
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "backend",
        "timestamp": datetime.utcnow().isoformat()
    }


# -------------------------------------------------
# WEBSOCKET ENDPOINT (LIVE STREAM PLACEHOLDER)
# (Actual broadcast will move to Kafka consumer)
# -------------------------------------------------
@app.websocket("/ws/vitals")
async def websocket_vitals(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket)


# -------------------------------------------------
# VITAL INGESTION ENDPOINT (KAFKA PRODUCER)
# -------------------------------------------------
@app.post("/ingest/vital")
def ingest_vital(vital: VitalIngest):
    """
    Validates incoming vital payload and publishes it to Kafka.
    NO database writes happen here.
    """

    try:
        message = {
            "timestamp": vital.timestamp.isoformat(),
            "patient_id": str(vital.patient_id),
            "device_id": str(vital.device_id),
            "vital_code": vital.vital_code,
            "value": vital.value,
            "quality": vital.quality,
            "source": vital.source,
        }

        publish_vital(message)

        return {"status": "published"}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.on_event("startup")
def startup_event():
    Thread(target=start_consumer, daemon=True).start()
