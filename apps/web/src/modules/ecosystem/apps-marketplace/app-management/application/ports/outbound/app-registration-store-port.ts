import type { GitHubAppRegistration } from "../../../domain/app-registration/aggregates/github-app-registration";

export interface AppRegistrationStore {
  findByName(name: string): Promise<GitHubAppRegistration | undefined>;
  listByOwner(
    ownerAccountId: string,
  ): Promise<readonly GitHubAppRegistration[]>;
  save(registration: GitHubAppRegistration): Promise<void>;
}
