import { AuditComplianceView } from "@/src/modules/business-operations/assurance-support/audit-compliance/public-api";
import { currentAuditEvidence } from "./audit-settings-composition";

export default async function AuditSettingsPage() {
  const model = await currentAuditEvidence();
  return (
    <AuditComplianceView
      actorHandle={model.actorHandle}
      entries={model.entries}
    />
  );
}
