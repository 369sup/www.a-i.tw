import { InvalidRepositoryUrlError } from "../errors/invalid-repository-url-error";

declare const repositoryHomepageUrlBrand: unique symbol;

export type RepositoryHomepageUrl = string & {
  readonly [repositoryHomepageUrlBrand]: "RepositoryHomepageUrl";
};

export function createRepositoryHomepageUrl(
  input: string,
): RepositoryHomepageUrl {
  const value = input.trim();
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new InvalidRepositoryUrlError();
  }
  if (url.protocol !== "http:" && url.protocol !== "https:")
    throw new InvalidRepositoryUrlError();
  return url.toString() as RepositoryHomepageUrl;
}
