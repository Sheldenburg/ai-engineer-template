# How to Deploy the stack

This repository is structured to fully utilise serverless hosting on the cloud. **There is no need to manage a VM or Kubernetes. This enables a fast go-to-market speed and allows AI developers to focus more on shipping user features**.

## Generate requirements.txt from poetry

```
cd backend
poetry export --without-hashes --format=requirements.txt > requirements.txt
```

This step is required to generate the `requirements.txt` file, so relevant packages can be installed by the deployment agent on GitHub Actions. You will only need to run this the first time. 📝

## Deployment to Vercel 🚀

The CD pipeline to Vercel is managed through GitHub Actions and is automatically triggered by any pull request merge. There are two workflow files for the frontend: `nextjs-preview.yml` and `nextjs-production.yml`. The preview workflow gets triggered whenever there is a commit to ensure it does not affect the frontend code. The production workflow only gets triggered when there is a merge to the main branch. Refer to `nextjs-production.yml`; there are several variables/secrets you need to add on GitHub, e.g., `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Deployment to Cloud Run ☁️

There are some processes involved in setting up Cloud Run, but you only need to do this once! 🛠️

1. Get a GCP account, set up a billing account, and create a new project. 🌐
2. Install the gcloud CLI on your local machine. Refer to Google's guide [here](https://cloud.google.com/sdk/docs/install). 💻
3. Run `gcloud init` to authenticate with your GCP login. 🔑
4. Enable Artifact Registry on GCP. 📦
5. `gcloud artifacts repositories create [your-repository-name] --repository-format docker --project [your-project-name] --location [your-gcp-region]`
6. Ensure you have a Dockerfile in `backend/src`. Create `cloudbuild.yml`, which has all the necessary settings and commands to build a Docker image from the Dockerfile. 🐳<br>`gcloud builds submit --config=cloudbuild.yml --project [your-project-name]`
7. Create `service.yml` and update the environment variables, then enable Cloud Run on GCP. 🌐<br>`gcloud run services replace service.yml --region [your-gcp-region]`
8. Update the service policy by creating `gcr-service-policy.yml` to allow GCR to be invoked via the public internet. 🌍<br>`gcloud run services set-iam-policy [your-gcr-service-name] --region [your-gcp-region]`
   This will have your Cloud Run service spun up for the first time. For CD, we do it through GitHub Actions. Refer to `fastapi-to-gcr.yml` in the GitHub workflow.
9. Provision a service account (SA) on GCP and add relevant permissions to manage Cloud Run. The SA will need role permissions for Artifact Registry Reader, Artifact Registry Writer, Cloud Run Admin, Service Account User, and Storage Admin. 🔐
10. Create an SA key on GCP and add it to GitHub. All the required secrets/variables can be checked in `fastapi-to-gcr.yml`. 🔑
11. GitHub Actions will take care of any future CDs once this is set up. 🔄
12. `gcloud run services update SERVICE --max-instances MAX-VALUE` to set the maximum number of instances to save on cost (Optional). 💰

## Deployment to Supabase 🗄️

This step is very simple. All you need is a Supabase account and to set up a project on Supabase. Supabase provides two free projects. The connection between FastAPI and Supabase is through normal Postgres DB credentials. You just need to ensure the required secrets/variables are set in your GitHub repository settings.
DB migration and initial data load (for the admin user) are taken care of by the GitHub workflow `db-migration.yml` under `.github/workflows`. 📂

## Benefits

This deployment option offers you a huge cost saving. You can probably find a cheap/free VM to run the whole stack but it's not scalable at all. This serverless stack makes the most use of those great serverless platforms and makes your app scalable on every individual component.

## Cons

This stack is not for a project that requires all services to be run inside a VPC. For those projects, you would rather have a self-host stack run on VM or Kubernetes through Docker Compose.

That being said, we can also add an API gateway to Cloud Run to make it more secure. Cloud Run comes with a TLS certificate already.
