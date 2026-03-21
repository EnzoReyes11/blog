# GCP Org Management Platform

Self-hosted consulting platform for provisioning and managing isolated GCP client projects. A "control plane" architecture: Backstage acts as the service catalog and scaffolding engine; GitHub Actions handles all infrastructure execution. Budget enforcement is automatic — a Cloud Function disables billing on any client project that exceeds its threshold.

## What it does

- Spins up isolated GCP projects for clients via Backstage software templates
- Enforces per-client billing budgets through a Pub/Sub-triggered Cloud Function
- Provides a self-hosted Backstage IDP for cataloging all projects, APIs, and components
- Scaffolds new client repos with Terraform, CI/CD, and catalog registration pre-wired
- Authenticates GitHub Actions to GCP via Workload Identity Federation — no long-lived keys

## Tags

`gcp` `terraform` `backstage` `cloud-run` `cloud-functions` `pub-sub` `cloud-scheduler` `artifact-registry` `secret-manager` `workload-identity-federation` `supabase` `postgresql` `sqlite` `google-oauth` `github-actions` `gitops` `iac` `python` `typescript` `nodejs` `docker` `control-plane` `multi-tenant` `billing-automation` `no-organization`