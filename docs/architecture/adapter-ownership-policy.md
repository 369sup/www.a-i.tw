# Adapter ownership policy

狀態：Accepted / enforced baseline

An adapter belongs to the Context whose Application Port it implements or whose inbound use case it invokes. Adapters
translate protocol and external model only; they cannot own business rules, authorization policy or cross-context
orchestration. Provider-specific identity and storage schemas remain in Infrastructure behind the Context Port.

For cross-context calls, the Port belongs to the consumer Application. Its ACL adapter belongs under
`consumer/infrastructure/<subdomain>/integrations/{inbound,outbound,adapters,mappers}` and alone may know provider
Published Language. Provider DTO, status and error vocabulary must be mapped to consumer-local decisions.
