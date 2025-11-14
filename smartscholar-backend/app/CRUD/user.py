from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import hash_password
from fastapi import HTTPException

# -------------------------------------------------------------------
# Create a new user (Registration only) — SECURE
# -------------------------------------------------------------------
def create_user(db: Session, user: UserCreate):

    # 1️⃣ Password match check
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # 2️⃣ Email exists check
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # 3️⃣ Create user
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hash_password(user.password),
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
# -------------------------------------------------------------------
# Get all users
# -------------------------------------------------------------------
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()


# -------------------------------------------------------------------
# Get user by ID
# -------------------------------------------------------------------
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


# -------------------------------------------------------------------
# Update user (Profile Filling)
# -------------------------------------------------------------------
def update_user(db: Session, user_id: int, user: UserUpdate):

    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None

    update_data = user.dict(exclude_unset=True)

    # never update password here
    update_data.pop("password", None)

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user



# -------------------------------------------------------------------
# Delete user
# -------------------------------------------------------------------
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None

    db.delete(db_user)
    db.commit()
    return db_user
