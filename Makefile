SHELL := /usr/bin/env bash
.DEFAULT_GOAL := help
.PHONY: help status doctor format-check check test e2e docs arch build semgrep verify verify-runtime verify-docs release ci dev
help: ## List repository automation commands.
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z0-9_.-]+:.*##/ {printf "%-18s %s\n", $$1, $$2}' $(MAKEFILE_LIST)
status: ## Show working-tree, branch, and recent commit status.
	@./scripts/validation/status.sh
doctor: ## Check local Node, pnpm, Codex and project MCP configuration.
	@./scripts/validation/doctor.sh
format-check: ## Verify formatting without rewriting files.
	pnpm format:check
check: ## Run formatting, unit tests, and workspace checks.
	pnpm check
test: ## Run unit tests.
	pnpm test
e2e: ## Run Playwright end-to-end tests.
	pnpm test:e2e
docs: ## Validate documentation and release metadata.
	pnpm docs:check
	pnpm release:check
arch: ## Validate DDD/workspace architecture boundaries.
	pnpm arch:check
build: ## Build all workspaces.
	pnpm build
semgrep: ## Run repository Semgrep rules.
	pnpm semgrep
verify: ## Verify a normal code change.
	@./scripts/validation/verify.sh changed
verify-runtime: ## Verify a runtime or boundary change.
	@./scripts/validation/verify.sh runtime
verify-docs: ## Verify a documentation change.
	@./scripts/validation/verify.sh docs
release: ## Run all local release-readiness gates.
	@./scripts/validation/verify.sh release
ci: ## Run the repository CI command.
	pnpm ci
dev: ## Start the web workspace development server.
	pnpm dev
