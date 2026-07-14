import { InvalidAppRegistrationError } from "../errors/invalid-app-registration.error";

declare const appRegistrationName: unique symbol;
export type AppRegistrationName = string & {
  readonly [appRegistrationName]: true;
};

export function createAppRegistrationName(value: string): AppRegistrationName {
  const name = value.trim().replace(/\s+/g, " ");
  if (!name) throw new InvalidAppRegistrationError("App name is required.");
  if (name.length > 34)
    throw new InvalidAppRegistrationError(
      "App name must be 34 characters or fewer.",
    );
  return name as AppRegistrationName;
}

export function appRegistrationNameKey(value: string): string {
  return createAppRegistrationName(value).toLocaleLowerCase("en-US");
}
