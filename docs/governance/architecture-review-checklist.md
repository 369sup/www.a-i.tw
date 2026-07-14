# Architecture review checklist

狀態：Current

- Is the Domain, subdomain, owner and ubiquitous language explicit?
- Does the proposed boundary state what it does not own?
- Is a Context Map relationship, contract owner and ACL defined?
- Are data, transaction, read-model, error and consistency semantics explicit?
- Do imports obey `UI / Infrastructure → Application → Domain`?
- Is an ADR required for the decision?
- Are verification evidence and status wording accurate?
