import { InvalidProfileWebsiteError } from "../errors/invalid-profile-website.error";

declare const profileWebsiteBrand: unique symbol;

export type ProfileWebsite = string & {
  readonly [profileWebsiteBrand]: "ProfileWebsite";
};

export function createProfileWebsite(
  input: string | undefined,
): ProfileWebsite | undefined {
  const value = input?.trim();
  if (!value) return undefined;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new InvalidProfileWebsiteError(
      "Profile website must be an absolute URL.",
    );
  }

  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new InvalidProfileWebsiteError(
      "Profile website must use HTTP or HTTPS.",
    );

  return url.toString() as ProfileWebsite;
}
