# Social graph and interest

狀態：Accepted research baseline / no runtime

| Relationship | Subject → Object | Meaning |
| --- | --- | --- |
| Follow | User → User/Organization | Public activity interest |
| Star | User → Repository/Topic | Bookmark, appreciation and recommendation signal |
| Watch | User → Repository | Repository notification subscription |
| Subscribe | User → Issue/Discussion | Thread notification subscription |
| Mention | User/Team → Conversation target | Attention request |

Follow, Star and Watch are not interchangeable. Each future owner publishes its own relationship fact;
there is no global mutable social graph table.
