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