import type { OrganizationAccountDirectory } from "./organization-account-directory-port";
import type { OrganizationAccountProvisioner } from "./organization-account-provisioner-port";

export interface OrganizationAccountOnboardingGateway
  extends OrganizationAccountDirectory, OrganizationAccountProvisioner {}
