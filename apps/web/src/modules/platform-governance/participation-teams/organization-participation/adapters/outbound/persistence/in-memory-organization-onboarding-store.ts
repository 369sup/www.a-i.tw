import type {
  OrganizationOnboardingState,
  OrganizationOnboardingStore,
} from "../../../application/ports/outbound/organization-onboarding-store-port";

export class InMemoryOrganizationOnboardingStore implements OrganizationOnboardingStore {
  private readonly states = new Map<string, OrganizationOnboardingState>();

  async find(onboardingKey: string) {
    return this.states.get(onboardingKey);
  }

  async save(state: OrganizationOnboardingState) {
    this.states.set(state.onboardingKey, state);
  }
}
