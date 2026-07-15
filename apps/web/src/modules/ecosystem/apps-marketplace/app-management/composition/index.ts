// Export Context-owned factories and adapters for apps/web/src/composition only.
import { createInMemoryAppRegistrationStore } from "../adapters/outbound/persistence/in-memory-app-registration-store";
import type { PersonalAppOwnerDirectory } from "../application/ports/outbound/personal-app-owner-directory-port";
import { createAppManagementService } from "../application/use-cases/app-management-service";

export { createPersonalAppOwnerDirectoryAdapter } from "../adapters/outbound/integrations/personal-app-owner-directory-adapter";

export function createAppManagementComposition(
  owners: PersonalAppOwnerDirectory,
  nextId: () => string,
  now: () => Date = () => new Date(),
) {
  return createAppManagementService(
    createInMemoryAppRegistrationStore(),
    owners,
    nextId,
    now,
  );
}
export {};
