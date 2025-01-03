"""add oauth provider to user table

Revision ID: 0bab391507d0
Revises: ae5a34f2895e
Create Date: 2024-10-21 18:13:27.236901

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '0bab391507d0'
down_revision: Union[str, None] = 'ae5a34f2895e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('provider', sqlmodel.sql.sqltypes.AutoString(), nullable=True))
    op.alter_column('user', 'hashed_password',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'hashed_password',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.drop_column('user', 'provider')
    # ### end Alembic commands ###
