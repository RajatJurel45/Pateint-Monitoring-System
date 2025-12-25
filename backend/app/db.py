import psycopg2
import os


def get_db_connection():
    """
    Creates and returns a new database connection.
    This function is intentionally simple for Phase 1.3.
    """
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        connect_timeout=5,
    )
