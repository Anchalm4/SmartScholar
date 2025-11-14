from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserUpdate, UserOut
from app.crud.user import update_user, get_user

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.put("/{user_id}", response_model=UserOut)
def update_user_profile(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    user_exists = get_user(db, user_id)
    if not user_exists:
        raise HTTPException(status_code=404, detail="User not found")

    updated_user = update_user(db, user_id, data)
    return updated_user
