# Account ownership strategy

狀態：Accepted split Account and participation baseline

GitHub 非 Code 語意中的 User、Organization 與 Enterprise Account 具有不同 actor、ownership 與 lifecycle
invariants，不建立 universal `Account` Aggregate，也不以單一 Account Context 擁有所有關係。

## Canonical owners

| Context                      | Owns                                                                                        | Does not own                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `user-account`               | Personal／Managed User Account identity、handle、lifecycle、Principal attribution reference | Profile、Credential／Session、Organization participation                 |
| `organization-account`       | Organization Account identity、handle、lifecycle、resource-owner eligibility                | Profile、Membership、Invitation、Team、policy、grant                     |
| `enterprise-account`         | Enterprise Account identity、lifecycle、Organization affiliation                            | Organization resources、administrative role、policy、billing transaction |
| `profile-presence`           | Account presentation and presence, including display name、bio、location and website        | Account identity、authentication、Membership、authority                  |
| `organization-participation` | Organization Membership、Invitation and Organization Team                                   | Organization Account lifecycle、Enterprise Team、Repository Role         |

Only a User Account can be the authenticated Actor. Organization and Enterprise Accounts are ownership or governance
boundaries and never replace the acting Principal. Profile availability never determines whether Account identity exists.

## Published Language

- Account directory contracts publish only stable Account-owned identity, handle, kind, lifecycle status and eligibility.
- Profile presentation is published separately by `profile-presence`; an app-facing view may compose Account and Profile
  results without changing either source of truth.
- Membership and Team facts are published by `organization-participation`, never by an Account contract.
- Enterprise affiliation is published by `enterprise-account`; administrative roles and enforceable constraints remain
  in their own Contexts.

Cross-Context consumers own Ports and ACL adapters and import only provider `contracts/vN/public.ts`. No Context shares
Domain objects, persistence records, transactions or mutable entities.

## Current implementation boundary

The current Personal and Organization first slices create a provisioning Account, synchronously initialize Profile
through an idempotent Published Language operation, then activate the local Account. A failed Profile call leaves a
hidden provisioning Account that can retry with the same identity. Organization creation does not write Membership;
founding-owner provisioning is owned by `organization-participation` as a separate coordinated slice.

Managed User provisioning, full Organization onboarding, Enterprise identity federation and commercial capabilities
remain separately gated. Physical Context placement or official GitHub capability evidence does not make them Current.

Official product-language evidence is indexed in
[`../product/github-non-code-semantic-model.md`](../product/github-non-code-semantic-model.md).
