# Adapter ownership policy

狀態：Accepted / enforced baseline

An adapter belongs to the Context whose application port it implements or whose inbound use case it invokes. Adapters
translate protocol and external model only; they cannot own business rules, authorization policy or cross-context
orchestration. Provider-specific identity and storage schemas remain in Infrastructure behind the Context port.
