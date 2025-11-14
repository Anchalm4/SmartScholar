from sqlalchemy.orm import Session
from app.models.user_roadmap import UserRoadmap, UserRoadmapStep


# 1️⃣ Create User Roadmap (Save generated roadmap)
def create_user_roadmap(db: Session, user_id: int, title: str, company: str, role: str, steps: list):
    roadmap = UserRoadmap(
        user_id=user_id,
        title=title,
        company=company,
        role=role
    )
    db.add(roadmap)
    db.commit()
    db.refresh(roadmap)

    # Add steps
    for index, step_text in enumerate(steps, start=1):
        step = UserRoadmapStep(
            roadmap_id=roadmap.id,
            order=index,
            text=step_text,
            completed=False
        )
        db.add(step)

    db.commit()
    return roadmap


# 2️⃣ Get User’s Roadmap with Steps
def get_user_roadmap(db: Session, user_id: int):
    return (
        db.query(UserRoadmap)
        .filter(UserRoadmap.user_id == user_id)
        .first()
    )


# 3️⃣ Toggle Step Completion
def toggle_step_completed(db: Session, step_id: int):
    step = db.query(UserRoadmapStep).filter(UserRoadmapStep.id == step_id).first()

    if not step:
        return None

    step.completed = not step.completed
    db.commit()
    db.refresh(step)

    return step


# 4️⃣ Delete roadmap (optional)
def delete_user_roadmap(db: Session, user_id: int):
    roadmap = get_user_roadmap(db, user_id)
    if not roadmap:
        return None

    db.delete(roadmap)
    db.commit()
    return True
