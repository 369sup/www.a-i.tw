# Infrastructure

Concrete persistence and external-service adapters belong here. Wire them from
the deployable app's composition root rather than from Domain or Application.

Current adapters are process-local Repository and Access Grant stores. Grant keys distinguish Principal and Team
subjects; adapter storage does not decide effective access.
