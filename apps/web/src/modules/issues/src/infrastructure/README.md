# Infrastructure

Concrete persistence and external-service adapters belong here. Wire them from
the deployable app's composition root rather than from Domain or Application.

Current process-local adapters implement Issue, Label and per-Repository number sequence Ports. They own no work rules.
