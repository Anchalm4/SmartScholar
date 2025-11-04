from sqlalchemy import Column, Integer, String, Float
from app.db.session import Base

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String)
    hashed_password = Column(String)

    semester = Column(Integer)
    cgpa = Column(Float)
    area_of_interest = Column(String)
    desired_cgpa = Column(Float)
    phone_no = Column(String)
    company = Column(String)
    roadmap = Column(String)

    