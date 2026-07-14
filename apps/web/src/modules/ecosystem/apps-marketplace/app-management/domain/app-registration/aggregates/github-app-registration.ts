import { InvalidAppRegistrationError } from "../errors/invalid-app-registration.error";
import {
  createAppRegistrationName,
  type AppRegistrationName,
} from "../value-objects/app-registration-name";
import {
  createAppRegistrationUrl,
  type AppRegistrationUrl,
} from "../value-objects/app-registration-url";

export type GitHubAppRegistration = Readonly<{
  id: string;
  ownerAccountId: string;
  name: AppRegistrationName;
  description?: string;
  homepageUrl: AppRegistrationUrl;
  callbackUrl?: AppRegistrationUrl;
  availability: "private";
  createdAt: string;
}>;

export function createGitHubAppRegistration(input: {
  id: string;
  ownerAccountId: string;
  name: string;
  description?: string;
  homepageUrl: string;
  callbackUrl?: string;
  createdAt: Date;
}): GitHubAppRegistration {
  const id = input.id.trim();
  const ownerAccountId = input.ownerAccountId.trim();
  if (!id) throw new InvalidAppRegistrationError("App id is required.");
  if (!ownerAccountId)
    throw new InvalidAppRegistrationError("App owner is required.");
  if (Number.isNaN(input.createdAt.getTime()))
    throw new InvalidAppRegistrationError("App creation time is invalid.");
  const description = input.description?.trim();
  const callbackUrl = input.callbackUrl?.trim();
  return {
    id,
    ownerAccountId,
    name: createAppRegistrationName(input.name),
    ...(description ? { description } : {}),
    homepageUrl: createAppRegistrationUrl(input.homepageUrl, "Homepage URL"),
    ...(callbackUrl
      ? {
          callbackUrl: createAppRegistrationUrl(callbackUrl, "Callback URL"),
        }
      : {}),
    availability: "private",
    createdAt: input.createdAt.toISOString(),
  };
}
