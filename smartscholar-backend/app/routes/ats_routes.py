from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import docx2txt
import re

router = APIRouter(prefix="/ats", tags=["ATS Checker"])


# ------------------------
# Extract text from files
# ------------------------
def extract_text(file: UploadFile):
    if file.filename.endswith(".pdf"):
        with pdfplumber.open(file.file) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)

    elif file.filename.endswith(".docx"):
        return docx2txt.process(file.file)

    else:
        raise HTTPException(status_code=400, detail="Only PDF and DOCX allowed")


# ------------------------
# Simple ATS Scoring Model
# ------------------------
def calculate_ats_score(text: str, job_role: str):
    text = text.lower()

    # Keywords per role
    JOB_KEYWORDS = {
        "software developer": ["javascript", "react", "node", "api", "python", "git"],
        "web developer": ["html", "css", "javascript", "react", "next", "frontend"],
        "data analyst": ["python", "sql", "excel", "power bi", "tableau"],
        "web3 developer": ["solidity", "smart contract", "blockchain", "ethers.js"]
    }

    keywords = JOB_KEYWORDS.get(job_role.lower(), [])

    matches = sum(1 for k in keywords if k in text)
    total = len(keywords) or 1

    score = int((matches / total) * 100)

    return {
        "score": score,
        "matched": matches,
        "total_keywords": total,
        "missing_keywords": [k for k in keywords if k not in text],
    }


# ------------------------
# Main ATS API
# ------------------------
@router.post("/score")
async def ats_score(job_role: str, file: UploadFile = File(...)):
    text = extract_text(file)
    result = calculate_ats_score(text, job_role)

    return {
        "job_role": job_role,
        "ats_score": result["score"],
        "matched_keywords": result["matched"],
        "total_keywords": result["total_keywords"],
        "missing_keywords": result["missing_keywords"],
        "resume_text_preview": text[:500]
    }
