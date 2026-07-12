// Export only the app-facing Application facade. Peer Contexts use contracts/<subdomain>/public.ts.
export {
  createEnterpriseGovernanceService,
  type EnterpriseGovernanceService,
} from "./application/enterprise-governance/use-cases/enterprise-governance-service";
export type {
  EnterpriseRepositoryGovernanceApiV1,
  EnterpriseSummaryV1,
  RepositoryGovernanceConstraintV1,
} from "./contracts/enterprise-governance/public";
