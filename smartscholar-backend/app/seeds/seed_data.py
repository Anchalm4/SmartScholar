from app.models.roadmap import Roadmap, RoadmapStep
from app.db.session import SessionLocal

def create_db_and_seed():
    db = SessionLocal()
    try:
        if db.query(Roadmap).count() == 0:
            print("Seeding sample roadmaps...")

            web_dev = Roadmap(title="Web Developer", description="Become a full-stack web developer.")
            web_dev.steps = [
                RoadmapStep(order=1, title="HTML", description="Learn web structure."),
                RoadmapStep(order=2, title="CSS", description="Learn styling."),
                RoadmapStep(order=3, title="JavaScript", description="Add interactivity.")
            ]

            data_analyst = Roadmap(title="Data Analyst", description="Learn to analyze and visualize data.")
            data_analyst.steps = [
                RoadmapStep(order=1, title="SQL", description="Data retrieval and queries."),
                RoadmapStep(order=2, title="Python & Pandas", description="Data cleaning and analysis."),
                RoadmapStep(order=3, title="Visualization", description="Matplotlib, Power BI, etc.")
            ]

            db.add_all([web_dev, data_analyst])
            db.commit()
            print("Seeding complete.")

    finally:
        db.close()
