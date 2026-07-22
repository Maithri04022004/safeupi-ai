from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import uuid
import os

from ai.qr_detector import decode_qr

router = APIRouter()

UPLOAD_DIR = Path("temp_qr")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/scan-qr")
async def scan_qr(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="Only image files are allowed."
        )

    extension = os.path.splitext(file.filename)[1]
    filename = f"{uuid.uuid4()}{extension}"
    filepath = UPLOAD_DIR / filename

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        result = decode_qr(str(filepath))
    finally:
        if filepath.exists():
            filepath.unlink()

    return result