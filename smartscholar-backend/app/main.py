import uvicorn
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship, Session, joinedload, declarative_base
from pydantic import BaseModel, ConfigDict
from typing import List, Optional

# ==============================
# Database Setup
# ==============================

DATABASE_URL = "sqlite:///./smartscholar.db"
Base = declarative_base()
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# ==============================
# MODELS (SQLAlchemy Tables)
# ==============================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    semester = Column(Integer, nullable=True)
    cgpa = Column(Float, nullable=True)
    area_of_interest = Column(String, nullable=True)
    desired_cgpa = Column(Float, nullable=True)
    phone_no = Column(String, nullable=True)
    company = Column(String, nullable=True)
    roadmap = Column(String, nullable=True)


class Roadmap(Base):
    __tablename__ = "roadmaps"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)
    
    steps = relationship("RoadmapStep", back_populates="roadmap", order_by="RoadmapStep.order", cascade="all, delete-orphan")


class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"
    
    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    roadmap = relationship("Roadmap", back_populates="steps")


# ==============================
# SCHEMAS (Pydantic)
# ==============================

# --- User Schemas ---
class UserBase(BaseModel):
    name: str
    email: str

class UserCreate(UserBase):
    password: str
    semester: Optional[int] = None
    cgpa: Optional[float] = None
    area_of_interest: Optional[str] = None
    desired_cgpa: Optional[float] = None
    phone_no: Optional[str] = None
    company: Optional[str] = None
    roadmap: Optional[str] = None

class UserOut(UserBase):
    id: int
    semester: Optional[int] = None
    cgpa: Optional[float] = None
    area_of_interest: Optional[str] = None
    desired_cgpa: Optional[float] = None
    phone_no: Optional[str] = None
    company: Optional[str] = None
    roadmap: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


# --- Roadmap Schemas ---
class RoadmapStepBase(BaseModel):
    title: str
    description: Optional[str] = None
    order: int

class RoadmapStepSchema(RoadmapStepBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None

class RoadmapSchema(RoadmapBase):
    id: int
    steps: List[RoadmapStepSchema] = []
    model_config = ConfigDict(from_attributes=True)

class RoadmapListSchema(RoadmapBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ==============================
# CRUD Operations
# ==============================

# --- USER CRUD ---
def create_user(db: Session, user: UserCreate):
    db_user = User(
        name=user.name,
        email=user.email,
        password=user.password,
        semester=user.semester,
        cgpa=user.cgpa,
        area_of_interest=user.area_of_interest,
        desired_cgpa=user.desired_cgpa,
        phone_no=user.phone_no,
        company=user.company,
        roadmap=user.roadmap
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        for key, value in user.dict().items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
        return db_user
    return None

def delete_user(db: Session, user_id: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
        return db_user
    return None


# ==============================
# FASTAPI APP
# ==============================

app = FastAPI(title="Smart Scholar API", description="Manages users and learning roadmaps.")

# ✅ Enable CORS
origins = [
    "*"  # allow all (optional for testing)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # list of allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ==============================
# USER ROUTES
# ==============================

@app.post("/users/register", response_model=UserOut)
def create_user_route(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db=db, user=user)

@app.get("/users/", response_model=List[UserOut])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_users(db, skip=skip, limit=limit)

@app.get("/users/{user_id}", response_model=UserOut)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=UserOut)
def update_user_route(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    updated_user = update_user(db, user_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@app.delete("/users/{user_id}")
def delete_user_route(user_id: int, db: Session = Depends(get_db)):
    deleted = delete_user(db, user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}


# ==============================
# ROADMAP ROUTES
# ==============================

@app.get("/roadmaps/", response_model=List[RoadmapListSchema])
def get_all_roadmaps(db: Session = Depends(get_db)):
    return db.query(Roadmap).all()

@app.get("/roadmaps/{roadmap_id}/", response_model=RoadmapSchema)
def get_single_roadmap(roadmap_id: int, db: Session = Depends(get_db)):
    roadmap = db.query(Roadmap).options(joinedload(Roadmap.steps)).filter(Roadmap.id == roadmap_id).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail="Roadmap not found")
    return roadmap


# ==============================
# INITIAL DATABASE SEEDING
# ==============================

def create_db_and_seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        if db.query(Roadmap).count() == 0:
            print("Seeding sample roadmaps...")

            web_dev = Roadmap(title="Web Developer", description="Become a full-stack web developer.")
            web_dev.steps = [
                RoadmapStep(order=1, title="HTML", description="Learn web structure."),
                RoadmapStep(order=2, title="CSS", description="Learn styling."),
                RoadmapStep(order=3, title="JavaScript", description="Add interactivity.")
            ]

            data_analyst = Roadmap(title="Data Analyst", description="Learn to analyze and visualize data.")
            data_analyst.steps = [
                RoadmapStep(order=1, title="SQL", description="Data retrieval and queries."),
                RoadmapStep(order=2, title="Python & Pandas", description="Data cleaning and analysis."),
                RoadmapStep(order=3, title="Visualization", description="Matplotlib, Seaborn, or Power BI.")
            ]

            db.add_all([web_dev, data_analyst])
            db.commit()
            print("Seeding complete.")
    finally:
        db.close()


# ==============================
# MAIN ENTRY POINT
# ==============================

if __name__ == "__main__":
    create_db_and_seed()
    print("Starting Smart Scholar API at http://127.0.0.1:8000")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
