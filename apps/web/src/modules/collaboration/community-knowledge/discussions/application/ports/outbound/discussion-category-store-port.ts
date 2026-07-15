import type { DiscussionCategory } from "../../../domain/discussions/aggregates/discussion-category";

export interface DiscussionCategoryStore {
  list(repositoryId: string): Promise<DiscussionCategory[]>;
  find(categoryId: string): Promise<DiscussionCategory | undefined>;
}
