from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base

class UserRoadmap(Base):
    __tablename__ = "user_roadmaps"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False, index=True)
    title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    role = Column(String, nullable=True)
    # Optional summary or meta
    notes = Column(Text, nullable=True)

    steps = relationship("UserRoadmapStep", back_populates="roadmap", cascade="all, delete-orphan", order_by="UserRoadmapStep.order")


class UserRoadmapStep(Base):
    __tablename__ = "user_roadmap_steps"
    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey("user_roadmaps.id"))
    order = Column(Integer, nullable=False)
    text = Column(Text, nullable=False)
    completed = Column(Boolean, default=False)

    roadmap = relationship("UserRoadmap", back_populates="steps")
