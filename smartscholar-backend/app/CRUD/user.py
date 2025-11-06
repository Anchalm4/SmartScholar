from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate

# Create a new user
def create_user(db: Session, user: UserCreate):
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=user.password,  # in real apps, hash this
        semester=user.semester,
        cgpa=user.cgpa,
        area_of_interest=user.area_of_interest,
        desired_cgpa=user.desired_cgpa,
        phone_no=user.phone_no,
        company=user.company,
        roadmap=user.roadmap,
    )
    print(db_user)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Get all users
def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

# Get user by ID
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Update user
# def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    for key, value in user.dict(exclude_unset=True).items():
        setattr(db_user, key, value)
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete user
def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        return None
    db.delete(db_user)
    db.commit()
    return db_user
