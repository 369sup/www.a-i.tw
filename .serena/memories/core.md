# Core Memory Entry Point

## Purpose

Provide a backwards-compatible entry point for Serena memory discovery.

## Summary

Read `mem:00-core/project-identity` first, then follow scoped references.

## Rules

- Do not add durable facts here; use the numbered hierarchy.

## Source Locations

- `.serena/memories/`

## Related Documents

- `docs/ai-index.md`

## Related Memories

- `mem:00-core/project-identity`

## Last Verified

- Date: 2026-07-11
- Evidence: memory hierarchy bootstrap.
