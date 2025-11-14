from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(Text, nullable=True)

    # Relationship
    steps = relationship(
        "RoadmapStep",
        back_populates="roadmap",
        order_by="RoadmapStep.order",
        cascade="all, delete-orphan"
    )


class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"

    id = Column(Integer, primary_key=True, index=True)
    order = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)

    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"))
    roadmap = relationship("Roadmap", back_populates="steps")
