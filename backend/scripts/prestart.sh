#! /usr/bin/env bash

cd src
# Load environment variables
export $(grep -v '^#' .env | xargs)

# Let the DB start
python backend_pre_start.py

cd app
# Run migrations
alembic upgrade head

cd ..
# Create initial data in DB
python initial_data.py
