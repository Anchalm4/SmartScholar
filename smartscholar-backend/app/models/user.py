from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.dialects.postgresql import JSONB
from app.db.session import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Profile fields
    semester = Column(Integer)
    cgpa = Column(Float)
    desired_cgpa = Column(Float)
    area_of_interest = Column(String)
    phone_no = Column(String)

    dream_company = Column(String)
    dream_role = Column(String)

    skills = Column(JSONB)
    projects = Column(JSONB)

    roadmap = Column(JSONB)   # JSON data for CGPA plan + company plan
