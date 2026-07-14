import { InvalidAppRegistrationError } from "../errors/invalid-app-registration.error";

declare const appRegistrationUrl: unique symbol;
export type AppRegistrationUrl = string & {
  readonly [appRegistrationUrl]: true;
};

export function createAppRegistrationUrl(
  value: string,
  label: string,
): AppRegistrationUrl {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "http:" && url.protocol !== "https:")
      throw new Error();
    return url.toString() as AppRegistrationUrl;
  } catch {
    throw new InvalidAppRegistrationError(
      `${label} must be a full HTTP(S) URL.`,
    );
  }
}
