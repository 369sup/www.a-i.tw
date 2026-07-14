# Web source routing

- `app/**`: read `app/AGENTS.md`; routing and transport only.
- `modules/**`: read `modules/AGENTS.md` and the nearest Domain Group/Context instructions.
- `presentation/**`: read `presentation/AGENTS.md`; cross-Context inbound UI only.
- `server/composition/**`: concrete server-only wiring; no business decisions.
- Preserve `UI / Infrastructure -> Application -> Domain`; Client Components must not import server composition.
