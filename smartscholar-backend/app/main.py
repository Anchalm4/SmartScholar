import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.ats_routes import router as ats_router
from app.routes.user_routes import router as user_router
from app.routes.roadmap_routes import router as roadmap_router
from app.db.session import engine, Base
from app.seeds.seed_data import create_db_and_seed
from app.routes.auth_routes import router as auth_router
from app.routes.profile_routes import router as profile_router
from app.routes.user_roadmap_routes import router as user_roadmap_router

# Import models so they register with SQLAlchemy
import app.models.user
import app.models.roadmap

# Create all models
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart Scholar API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(user_router)
app.include_router(roadmap_router)
app.include_router(auth_router) 
app.include_router(profile_router)
app.include_router(user_roadmap_router)
app.include_router(ats_router)

if __name__ == "__main__":
    create_db_and_seed()
    print("Starting Smart Scholar API at http://127.0.0.1:8000")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
