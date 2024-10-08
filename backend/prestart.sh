#! /usr/bin/env bash

cd lambda/app
# Load environment variables
export $(grep -v '^#' .env | xargs)


# Let the DB start
# python /app/app/backend_pre_start.py
# python backend_pre_start.py

# Run migrations
alembic upgrade head

cd ..

# Create initial data in DB
# python /app/app/initial_data.py
python initial_data.py

cd ..
