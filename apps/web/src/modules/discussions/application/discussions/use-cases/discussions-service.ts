import {
  createDiscussion,
  markAnswer,
  type Discussion,
} from "../../../domain/discussions/aggregates/discussion";
export interface DiscussionStore {
  list(repositoryId: string): Promise<Discussion[]>;
  find(id: string): Promise<Discussion | undefined>;
  save(value: Discussion): Promise<void>;
}
export function createDiscussionsService(
  store: DiscussionStore,
  nextId: () => string,
) {
  return {
    list: (id: string) => store.list(id),
    async create(input: {
      repositoryId: string;
      authorPrincipalId: string;
      title: string;
      body: string;
    }) {
      const value = createDiscussion({ id: nextId(), ...input });
      await store.save(value);
      return value;
    },
    async markAnswer(input: { discussionId: string; commentId: string }) {
      const value = await store.find(input.discussionId);
      if (!value) throw new Error("Discussion not found.");
      const updated = markAnswer(value, input.commentId);
      await store.save(updated);
      return updated;
    },
  };
}
