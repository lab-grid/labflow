from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi_cloudauth.auth0 import Auth0, Auth0Claims, Auth0CurrentUser
from fastapi_cloudauth.base import BaseTokenVerifier, JWKS

from typing import Optional, Type
from pydantic import BaseModel, Field
from pydantic.error_wrappers import ValidationError
from jose import jwk, jwt
from starlette import status

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from settings import settings


# Database --------------------------------------------------------------------

engine = create_engine(settings.sqlalchemy_database_uri)
db_session = scoped_session(
    sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine,
    ),
)

# Dependency
def get_db():
    db = db_session.session_factory()
    try:
        yield db
    finally:
        db.close()


# FastAPI Setup ---------------------------------------------------------------

app = FastAPI(
    title='Flow by LabGrid API',
    version='0.1.0',
    openapi_tags=[
        {
            'name': 'groups',
            'description': 'Operations on user groups.',
        },
        {
            'name': 'users',
            'description': 'Operations on users.',
        },
        {
            'name': 'system',
            'description': 'System operations.',
        },
        {
            'name': 'protocols',
            'description': 'Operations on protocols.',
        },
        {
            'name': 'runs',
            'description': 'Operations on runs.',
        },
        {
            'name': 'samples',
            'description': 'Operations on samples.'
        },
    ]
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Authentication --------------------------------------------------------------

auth = Auth0(domain=settings.auth0_domain)

class Auth0ClaimsPatched(BaseModel):
    username: str = Field(alias="sub")

class Auth0CurrentUserPatched(Auth0CurrentUser):
    """
    Verify `ID token` and extract user information
    """

    def __init__(self, domain: str, *args, **kwargs):
        self.user_info = Auth0ClaimsPatched
        super().__init__(domain, *args, **kwargs)

get_current_user = Auth0CurrentUserPatched(domain=settings.auth0_domain)
