# Web source routing

- `app/**`: read `app/AGENTS.md`; routing and transport only.
- `modules/**`: read `modules/AGENTS.md` and the nearest Domain Group/Context instructions.
- `composition/**`: concrete server-only wiring; no business decisions.
- Preserve `UI / Infrastructure -> Application -> Domain`; Client Components must not import server composition.
- `presentation/**` is forbidden. Framework UI belongs to an owning Context inbound adapter; App Router owns only named final composition.
