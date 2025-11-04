from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    semester: Optional[int] = None
    cgpa: Optional[float] = None
    area_of_interest: Optional[str] = None
    desired_cgpa: Optional[float] = None
    phone_no: Optional[str] = None
    company: Optional[str] = None
    roadmap: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True