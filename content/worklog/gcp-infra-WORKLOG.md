# Worklog

### 22/03/26
Working on improving the worklog action. Builds failed yesterday. I found out that my common-assets had a copy of the worklog action,
it was using a modified version. Testing if using the real one works. It did not work. I'm back to having it in assets.
Anyway, the build error is gone.

#### Next steps:
Verify with this worklogs are not appearing on the site. The project is appearing, but not the logs.


### 21/03/26
Lots of work in the last few days. My platform is getting into shape. I already ingested old repos, and gave them the new templates. 
I've to also ingest resources, and external clients repos and resources.
Once that's done, I can start creating new templates to scaffold different stacks.

#### Done
- Fixed Google OAuth auth on Cloud Run, guest sign was showing up after migration to 1.49.0.
- Fixed production catalog path resolution: `../../catalog/` → `./catalog/` 
- Switched templates in production to pointing to GitHub 
- Renamed catalog/user.yaml to catalog/org.yaml
- Organized Agent files and internal documentation a bit. Still needs more love.
- Configured Techdocs
- Add the workflow-action to the common assets repo
- Add give-template, an action that gives a template into an already existing repo via PR
- Auto discovery of github repos with catalog-info.yaml

#### Next steps
- new-client-project: collect billing account in template UI (currently set manually as `GCP_BILLING_ACCOUNT` GitHub Secret)
- sync-template Option 2 — Bulk sync via custom backend action + custom EntityVersionPicker field extension
- Ingest resources
- Ingest external clients
- Work on new templates to scaffold stacks: python, nodejs, go, etc.


### 20/03/26

#### Done
- Updated Backstage to version 1.49.0
- Updated Backstage to use Postgres instead of SQLite for local development. With this, no code changes are needed.
- Added docker compose to spin up postgres.
- Created the bare minimum scaffold template.
- Tested the scaffold and integration with github E2E, it worked.
- Added template versioning: `backstage.io/template-version` annotation on templates; `scaffolder.backstage.io/template: <name>@<version>` written into scaffolded `catalog-info.yaml`
- Created `sync-template`: syncs common-assets and template skeleton to existing components via PR
- Designed catalog entity model: Domain/System/Component hierarchy per client + internal + personal domains
- Built `new-client-project` template: creates client infra repo (Terraform + WIF GitHub Actions) and opens catalog PR on gcp-infra
- Extended `config:get` action with GCP infrastructure values (WIF provider, tf-admin-sa, state bucket, budget topic)
- Deployed to Cloud Run + terraform apply

#### Next steps
- Broken auth after migration to v1.49.0
- [x] Task 7.2 — Switch production catalog to GitHub provider (`@backstage/plugin-catalog-backend-module-github`) so new client YAML files merged to gcp-infra are auto-discovered without a Backstage redeploy. Register provider in `index.ts`, configure in `app-config.production.yaml` with 30min polling on `backstage/catalog/clients/*.yaml`
- [x] Task 7.1 — Configure TechDocs for production: switch to `builder: external`, provision GCS bucket for pre-built docs, configure `publisher.type: googleGcs` in `app-config.production.yaml`, add Cloud Build step to run `techdocs-cli generate` and publish to GCS on each deploy
- [ ] sync-template Option 2 — Bulk sync via custom backend action + custom EntityVersionPicker field extension (see `.FEATURES/backstage-idp-implementation.md` → "Bulk sync-template")
- [ ] new-client-project: collect billing account in the template UI and bake it into the workflow (currently set manually as `GCP_BILLING_ACCOUNT` GitHub Secret post-creation)


### 19/03/26

#### Done
- Updated bootstrap script references throughout the repo (`seed/bootstrap.sh` → `scripts/seed-bootstrap.sh`, `scripts/control-plane-bootstrap.sh`)
- Added Workload Identity Federation (WIF) to the control plane Terraform (`terraform/modules/control-plane/wif.tf`): pool, GitHub OIDC provider, and IAM binding for tf-admin-sa
- Added `iamcredentials.googleapis.com` and `sts.googleapis.com` to control plane API list
- Added `workload_identity_provider` and `tf_admin_sa_email` outputs to control plane module and environment
- Diagnosed and fixed Backstage production database auth error (Supabase pooler requires `postgres.<projectref>` username format; stale Cloud Run env vars from previous revision)
- Designed client project architecture: each client gets its own GitHub repo scaffolded by Backstage (no per-client directories in `gcp-org`)
- Read and planned implementation of Backstage IDP spec (`System Specification: Backstage.md`)
- Fixed Backstage local dev environment:
  - SQLite config: changed `connection: './local-dev.sqlite'` → `connection.directory: './local-dev-db'` (new backend system requirement)
  - Commented out `plugin-search-backend-module-pg` in `packages/backend/src/index.ts` (crashes backend without Postgres)
  - Fixed catalog path: `./catalog/user.yaml` → `../../catalog/user.yaml` (relative to `packages/backend/`)
  - Configured Google OAuth for local dev (`auth.environment: development`, separate OAuth client)
  - Confirmed full sign-in flow working end-to-end
- Created `.LEARNINGS/backstage-local-dev-setup.md` with all local dev gotchas documented
- Created `.FEATURES/backstage-idp-implementation.md` with remaining IDP roadmap
- Updated `backstage/README.md` with full local dev guide

#### Next steps
 [ ] Set up local Postgres (Docker) to match production — re-enable `plugin-search-backend-module-pg` and switch `app-config.local.yaml` database to Postgres. `packages/backend/src/index.ts` has a TODO marking the commented-out line.
- [ ] Task 2 — Update catalog ownership model (`group:internal`, rename from `admins`)
- [ ] Task 3 — Create MVP `common-assets/` skeleton (`.gitignore` only for now)
- [ ] Task 4 — Build bare-minimum scaffold template (prove pipeline end-to-end)
- [ ] Task 5 — End-to-end scaffold test (repo creation + catalog registration)
- [ ] Task 6 — Build new-client-project scaffold template (GCP platform bootstrap)
- [ ] Task 7 — Deploy to Cloud Run + update CLAUDE.md