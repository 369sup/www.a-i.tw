import type { Discussion } from "../../../domain/discussions/aggregates/discussion";

export interface DiscussionStore {
  list(repositoryId: string): Promise<Discussion[]>;
  find(discussionId: string): Promise<Discussion | undefined>;
  save(discussion: Discussion): Promise<void>;
}
