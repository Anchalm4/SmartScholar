from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.db.session import get_db
from app.models.roadmap import Roadmap
from app.models.user import User
from app.schemas.roadmap import RoadmapSchema, RoadmapListSchema

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


# --------------------------------------------------
# 1️⃣ Get all static roadmaps (your existing DB ones)
# --------------------------------------------------
@router.get("/", response_model=List[RoadmapListSchema])
def get_all_roadmaps(db: Session = Depends(get_db)):
    return db.query(Roadmap).all()


# --------------------------------------------------
# 2️⃣ Get single static roadmap with steps
# --------------------------------------------------
@router.get("/{roadmap_id}/", response_model=RoadmapSchema)
def get_single_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    roadmap = (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps))
        .filter(Roadmap.id == roadmap_id)
        .first()
    )
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return roadmap


# --------------------------------------------------
# 3️⃣ **Dynamic Roadmap Generator for User**
# --------------------------------------------------
@router.get("/generate/{user_id}")
def generate_dynamic_roadmap(user_id: int, db: Session = Depends(get_db)):
    """Generate roadmap based on user's profile automatically"""

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    company = (user.dream_company or "").lower()
    role = (user.dream_role or "").lower()

    steps = []

    # --------------------------------------------------
    # CGPA IMPROVEMENT
    # --------------------------------------------------
    if user.cgpa and user.desired_cgpa:
        curr = float(user.cgpa)
        target = float(user.desired_cgpa)

        if target > curr:
            steps.append(
                f"Improve your CGPA from {curr} to {target} by scoring higher in each upcoming semester."
            )
            steps.append("Create a study timetable for weak subjects.")
            steps.append("Use PYQ + topper strategy for next semester.")

    # --------------------------------------------------
    # COMPANY-SPECIFIC ROADMAPS
    # --------------------------------------------------

    if "tcs" in company:
        steps += [
            "Prepare for TCS NQT foundation aptitude + reasoning.",
            "Solve previous NQT papers for time management.",
            "Practice Python/Java coding round questions.",
            "Create one good academic project with DBMS.",
            "Prepare strong HR round answers."
        ]

    if "infosys" in company:
        steps += [
            "Study Infosys aptitude: puzzles, quant, verbal.",
            "Practice coding round questions (medium level).",
            "Build one unique project for interview.",
            "Revise OOP, OS, DBMS core subjects."
        ]

    if "wipro" in company:
        steps += [
            "Prepare for Wipro aptitude & essay writing.",
            "Practice pattern-based coding questions.",
            "Create a resume tailored for Wipro Elite NTH.",
        ]

    # --------------------------------------------------
    # ROLE-BASED ROADMAPS
    # --------------------------------------------------

    if "web3" in role or "blockchain" in role:
        steps += [
            "Learn Blockchain fundamentals (Ethereum, Polkadot, Layer 2).",
            "Master Solidity + Hardhat/Foundry.",
            "Build 3 Web3 projects: NFT Marketplace, Token, Staking App.",
            "Deploy smart contracts on Polygon testnet.",
            "Learn security basics: re-entrancy, overflow, access control.",
            "Contribute to GitHub open-source Web3 repos."
        ]

    if "software" in role or "developer" in role:
        steps += [
            "Learn DSA patterns (Two pointers, DP, Trees, Graphs).",
            "Solve 200+ LeetCode problems.",
            "Build 3 full-stack projects.",
            "Learn System Design basics.",
            "Give 5 mock interviews (technical + HR)."
        ]

    # --------------------------------------------------
    # IF NO DATA FOUND → DEFAULT ROADMAP
    # --------------------------------------------------
    if not steps:
        steps = [
            "Start with strong Data Structures & Algorithms.",
            "Build 2–3 real-world projects.",
            "Create an ATS-optimized resume.",
            "Apply for internships to gain experience.",
            "Prepare for technical + HR interview rounds."
        ]

    return {
        "user_id": user.id,
        "name": user.name,
        "dream_company": user.dream_company,
        "dream_role": user.dream_role,
        "steps": steps
    }
