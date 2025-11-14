from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any


# ---------------------------
# 1. Registration Schema
# ---------------------------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirm_password: str


# ---------------------------
# 2. Profile Update Schema
# ---------------------------
class UserUpdate(BaseModel):
    semester: Optional[int] = None
    cgpa: Optional[float] = None
    desired_cgpa: Optional[float] = None
    area_of_interest: Optional[str] = None
    phone_no: Optional[str] = None

    dream_company: Optional[str] = None
    dream_role: Optional[str] = None

    skills: Optional[List[str]] = None
    projects: Optional[List[Dict[str, Any]]] = None

    roadmap: Optional[List[Dict[str, Any]]] = None

    class Config:
        from_attributes = True


# ---------------------------
# 3. User Output Schema
# ---------------------------
class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    
    semester: Optional[int]
    cgpa: Optional[float]
    desired_cgpa: Optional[float]
    area_of_interest: Optional[str]
    phone_no: Optional[str]

    dream_company: Optional[str]
    dream_role: Optional[str]
    
    skills: Optional[List[str]]
    projects: Optional[List[Dict[str, Any]]]
    roadmap: Optional[List[Dict[str, Any]]]

    class Config:
        from_attributes = True
