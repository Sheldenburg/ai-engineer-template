#! /usr/bin/env bash

# Load environment variables
export $(grep -v '^#' ./app/.env | xargs)

# Let the DB start
# python /app/app/backend_pre_start.py
python ./app/backend_pre_start.py

# Run migrations
alembic upgrade head

# Create initial data in DB
# python /app/app/initial_data.py
python ./app/initial_data.py
