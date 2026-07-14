// Export only deliberate, versioned Published Language. Never expose Context internals.
export type GitHubAppRegistrationV1 = Readonly<{
  id: string;
  ownerAccountId: string;
  name: string;
  description?: string;
  homepageUrl: string;
  callbackUrl?: string;
  availability: "private";
  createdAt: string;
}>;

export interface AppManagementApiV1 {
  register(input: {
    principalId: string;
    name: string;
    description?: string;
    homepageUrl: string;
    callbackUrl?: string;
  }): Promise<GitHubAppRegistrationV1>;
  listOwned(principalId: string): Promise<readonly GitHubAppRegistrationV1[]>;
}
export {};
