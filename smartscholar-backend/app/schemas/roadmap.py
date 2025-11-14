from pydantic import BaseModel
from typing import Optional, List


# Base schema (input)
class RoadmapBase(BaseModel):
    title: str
    description: Optional[str] = None


# Step base schema
class RoadmapStepBase(BaseModel):
    order: int
    title: str
    description: Optional[str] = None


# Step schema (output)
class RoadmapStepSchema(RoadmapStepBase):
    id: int

    class Config:
        from_attributes = True


# Single Roadmap with steps (output)
class RoadmapSchema(RoadmapBase):
    id: int
    steps: List[RoadmapStepSchema] = []

    class Config:
        from_attributes = True


# Roadmap list item (no steps)
class RoadmapListSchema(RoadmapBase):
    id: int

    class Config:
        from_attributes = True
