from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.crud.user_roadmap import (
    create_user_roadmap, 
    get_user_roadmap, 
    toggle_step_completed
)
from app.models.user import User

router = APIRouter(prefix="/user-roadmap", tags=["User Roadmap"])


# 1️⃣ Save generated roadmap
@router.post("/save/{user_id}")
def save_user_roadmap(user_id: int, data: dict, db: Session = Depends(get_db)):
    # Validate user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    title = data.get("title", "Career Roadmap")
    company = data.get("company")
    role = data.get("role")
    steps = data.get("steps", [])

    return create_user_roadmap(db, user_id, title, company, role, steps)


# 2️⃣ Get roadmap of user
@router.get("/{user_id}")
def get_user_roadmap_route(user_id: int, db: Session = Depends(get_db)):
    roadmap = get_user_roadmap(db, user_id)
    if not roadmap:
        raise HTTPException(status_code=404, detail="No roadmap found")
    return roadmap


# 3️⃣ Toggle step completion
@router.put("/toggle/{step_id}")
def toggle_step(step_id: int, db: Session = Depends(get_db)):
    step = toggle_step_completed(db, step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    return step
