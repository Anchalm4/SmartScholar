from pydantic import BaseModel
from typing import List, Optional

class UserRoadmapStepCreate(BaseModel):
    order: int
    text: str

class UserRoadmapStepOut(UserRoadmapStepCreate):
    id: int
    completed: bool
    class Config:
        from_attributes = True

class UserRoadmapCreate(BaseModel):
    title: Optional[str]
    company: Optional[str]
    role: Optional[str]
    steps: List[UserRoadmapStepCreate]

class UserRoadmapOut(BaseModel):
    id: int
    user_id: int
    title: Optional[str]
    company: Optional[str]
    role: Optional[str]
    steps: List[UserRoadmapStepOut]
    class Config:
        from_attributes = True
