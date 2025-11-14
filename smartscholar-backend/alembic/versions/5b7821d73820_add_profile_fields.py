"""add profile fields

Revision ID: 5b7821d73820
Revises: 
Create Date: 2025-11-13 23:17:29.332218

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '5b7821d73820'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Add new columns
    op.add_column('users', sa.Column('dream_company', sa.String(), nullable=True))
    op.add_column('users', sa.Column('dream_role', sa.String(), nullable=True))
    op.add_column('users', sa.Column('skills', postgresql.JSONB(astext_type=sa.Text()), nullable=True))
    op.add_column('users', sa.Column('projects', postgresql.JSONB(astext_type=sa.Text()), nullable=True))

    # Fix: Convert roadmap VARCHAR → JSONB with explicit cast
    op.execute("""
        ALTER TABLE users 
        ALTER COLUMN roadmap TYPE JSONB 
        USING to_jsonb(roadmap)
    """)

    # Remove old column
    op.drop_column('users', 'company')


def downgrade() -> None:
    # Reverse type conversion JSONB → TEXT
    op.execute("""
        ALTER TABLE users 
        ALTER COLUMN roadmap TYPE VARCHAR 
        USING roadmap::text
    """)

    op.add_column('users', sa.Column('company', sa.VARCHAR(), nullable=True))
    op.drop_column('users', 'projects')
    op.drop_column('users', 'skills')
    op.drop_column('users', 'dream_role')
    op.drop_column('users', 'dream_company')
