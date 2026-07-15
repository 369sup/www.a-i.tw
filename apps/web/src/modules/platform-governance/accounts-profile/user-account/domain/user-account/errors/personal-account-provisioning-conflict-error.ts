export class PersonalAccountProvisioningConflictError extends Error {
  constructor() {
    super("Personal Account provisioning input does not match.");
    this.name = "PersonalAccountProvisioningConflictError";
  }
}
