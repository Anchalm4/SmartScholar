from sqlalchemy.orm import Session, joinedload
from app.models.roadmap import Roadmap


# Get all roadmaps (list)
def get_all_roadmaps(db: Session):
    return db.query(Roadmap).all()


# Get single roadmap with steps
def get_single_roadmap(db: Session, roadmap_id: int):
    return (
        db.query(Roadmap)
        .options(joinedload(Roadmap.steps))
        .filter(Roadmap.id == roadmap_id)
        .first()
    )
