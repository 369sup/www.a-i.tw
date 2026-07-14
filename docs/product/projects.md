# Projects

狀態：Current in-memory vertical slice

Project is a Personal Account- or Organization-owned planning boundary. The current slice stores typed
Issue references and Draft Items. It validates Account ownership and Issue existence through
consumer-owned Application Ports and Projects Infrastructure ACL adapters. It never owns or copies
Issue lifecycle, title, assignment, labels, or Repository authorization.

| Language     | Meaning                                                 |
| ------------ | ------------------------------------------------------- |
| Project      | Planning resource with independent visibility and roles |
| Project item | Issue or draft item represented inside a Project        |
| Field        | Structured metadata owned by Project                    |
| Iteration    | Repeating planning timebox                              |
| View         | Table, Board or Roadmap arrangement                     |
| Workflow     | Project-owned automation                                |
| Insight      | Chart or aggregate over Project data                    |

Pull Request item semantics are excluded. Fields, Views, Iterations, Workflows, Insights, templates and
delivery UI remain planned; they are not implied by the approved first vertical slice.
