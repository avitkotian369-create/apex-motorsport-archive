from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.database import engine, Base
from app.api.routes import router as tasks_router
from app.api.automotive_routes import router as automotive_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize SQLite/Postgres tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Cleanup on shutdown
    await engine.dispose()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    description="Blueprint FastAPI service supporting SQLite and PostgreSQL with async SQLAlchemy",
    lifespan=lifespan,
)

# CORS configuration supporting localhost and Vercel production & preview deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT,
        "database": "connected",
    }


# Include API routers
app.include_router(tasks_router)
app.include_router(automotive_router)
