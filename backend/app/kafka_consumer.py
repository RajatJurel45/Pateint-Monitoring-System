import json
import os
from datetime import datetime
from kafka import KafkaConsumer

from app.db import get_db_connection
from app.ws_manager import ConnectionManager


KAFKA_BROKER = os.getenv("KAFKA_BROKER", "kafka:9092")
TOPIC = os.getenv("KAFKA_VITALS_TOPIC", "vitals-stream")

manager = ConnectionManager()


def start_consumer():
    consumer = KafkaConsumer(
        TOPIC,
        bootstrap_servers=KAFKA_BROKER,
        value_deserializer=lambda m: json.loads(m.decode("utf-8")),
        auto_offset_reset="latest",
        enable_auto_commit=True,
        group_id="icu-backend-consumer",
    )

    for msg in consumer:
        data = msg.value

        try:
            conn = get_db_connection()
            cur = conn.cursor()

            # Resolve vital_type_id and unit
            cur.execute(
                "SELECT vital_type_id, unit FROM vital_types WHERE code = %s;",
                (data["vital_code"],)
            )
            result = cur.fetchone()

            if not result:
                cur.close()
                conn.close()
                continue

            vital_type_id, unit = result

            # Insert into TimescaleDB
            cur.execute(
                """
                INSERT INTO vital_measurements
                (time, patient_id, device_id, vital_type_id, value, unit, quality, source)
                VALUES (%s, %s::uuid, %s::uuid, %s, %s, %s, %s, %s);
                """,
                (
                    datetime.fromisoformat(data["timestamp"]),
                    data["patient_id"],
                    data["device_id"],
                    vital_type_id,
                    data["value"],
                    unit,
                    data["quality"],
                    data["source"],
                )
            )

            conn.commit()
            cur.close()
            conn.close()

            # Broadcast to WebSocket clients
            import asyncio
            asyncio.run(
                manager.broadcast(
                    {
                        **data,
                        "unit": unit,
                    }
                )
            )

        except Exception as e:
            print(f"[Kafka Consumer Error] {e}")
