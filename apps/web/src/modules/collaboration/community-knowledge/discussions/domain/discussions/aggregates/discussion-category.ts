import { InvalidDiscussionValueError } from "../errors/invalid-discussion-value-error";
import {
  createDiscussionCategoryId,
  type DiscussionCategoryId,
} from "../value-objects/discussion-category-id";
import {
  createDiscussionCategorySlug,
  type DiscussionCategorySlug,
} from "../value-objects/discussion-category-slug";
import {
  createDiscussionRepositoryRef,
  type DiscussionRepositoryRef,
} from "../value-objects/discussion-references";

export type DiscussionCategory = Readonly<{
  id: DiscussionCategoryId;
  repository: DiscussionRepositoryRef;
  slug: DiscussionCategorySlug;
  name: string;
  acceptsAnswers: boolean;
}>;

export function createDiscussionCategory(input: {
  id: string;
  repositoryId: string;
  slug: string;
  name: string;
  acceptsAnswers: boolean;
}): DiscussionCategory {
  const name = input.name.trim();
  if (!name) throw new InvalidDiscussionValueError("category name");
  return {
    id: createDiscussionCategoryId(input.id),
    repository: createDiscussionRepositoryRef(input.repositoryId),
    slug: createDiscussionCategorySlug(input.slug),
    name,
    acceptsAnswers: input.acceptsAnswers,
  };
}
