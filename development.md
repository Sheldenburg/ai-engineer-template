# How to develop locally 
The following guide will show you how to spin up this repo and develop locally.
## Nextjs frontend
```bash
cd frontend
npm install
npm run dev
```
This will open a nextjs app at localhost:3000
## Supabase local containers
Make sure you have already installed Supabase Cli, if not
```bash
brew install supabase/tap/supabase
```
for windows, refer this link https://supabase.com/docs/guides/cli/getting-started?queryGroups=platform&platform=windows

```
supabase init
```
```
supabase start
```
You can use the `supabase stop` command at any time to stop all services (without resetting your local database). Use `supabase stop --no-backup` to stop all services and reset your local database.

## DB Migration 
alembic will pick up all the new changes from sqlmodel. To push migration to the local Supabase docker container
```bash
cd backend
poetry shell
```
If this is the first time, run the prestart.sh to load the initial data 
```
source prestart.sh
```
For ongoing alembic update, use
```
alembic revision --autogenerate -m "the scope for the migration"
alembic upgrade head
```

## FastAPI backend
Make sure you have poetry installed before you start, if not
```bash
brew install poetry
```
Start a new poetry environment (python 3.10)
```bash
poetry use env 3.10
```
Activate the environment
```bash
poetry shell
```
```bash
source prestart.sh
```
Start the unicorn server
```bash
uvicorn main:app --reload
```
## Type generate
Grab the openapi.json file from the backend Swagger UI. Then replace in frontend/lib/api/openapi.json. 
Run `npm run types:generate`, it will generate a type file called v1.d.ts in the same folder. 
TO DO: automate this in a MAKE file. 

