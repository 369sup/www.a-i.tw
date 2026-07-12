# Infrastructure

Concrete persistence and external-service adapters belong here. Wire them from
the deployable app's composition root rather than from Domain or Application.

Current adapters are process-local Account, Membership Invitation, Membership and Team stores. They do not own
normalization, invitation, eligibility or Team roster rules.
