// App-local composition roots import this only after adapter wiring is approved.
export {};
export * from "../infrastructure/projects/repositories/in-memory-projects";
export * from "../infrastructure/projects/integrations/outbound/account-owner-directory.adapter";
export * from "../infrastructure/projects/integrations/outbound/issue-directory.adapter";
