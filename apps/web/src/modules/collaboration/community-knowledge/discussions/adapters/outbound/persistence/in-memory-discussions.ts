import type { DiscussionCategoryStore } from "../../../application/ports/outbound/discussion-category-store-port";
import type { DiscussionStore } from "../../../application/ports/outbound/discussion-store-port";
import {
  createDiscussionCategory,
  type DiscussionCategory,
} from "../../../domain/discussions/aggregates/discussion-category";
import {
  restoreDiscussion,
  type Discussion,
} from "../../../domain/discussions/aggregates/discussion";

type DiscussionRecord = Readonly<{
  id: string;
  repositoryId: string;
  categoryId: string;
  authorPrincipalId: string;
  title: string;
  body: string;
  state: "open" | "closed";
  comments: readonly Readonly<{
    id: string;
    authorPrincipalId: string;
    body: string;
    status: "active" | "minimized";
  }>[];
  acceptedAnswerCommentId?: string;
}>;

export class InMemoryDiscussionStore implements DiscussionStore {
  private readonly items = new Map<string, DiscussionRecord>();

  async list(repositoryId: string) {
    return Array.from(this.items.values())
      .filter((item) => item.repositoryId === repositoryId)
      .map(toDiscussion);
  }

  async find(discussionId: string) {
    const item = this.items.get(discussionId);
    return item ? toDiscussion(item) : undefined;
  }

  async save(discussion: Discussion) {
    this.items.set(discussion.id, toRecord(discussion));
  }
}

export class InMemoryDiscussionCategoryStore implements DiscussionCategoryStore {
  private readonly items: readonly DiscussionCategory[];

  constructor(
    seed: readonly {
      id: string;
      repositoryId: string;
      slug: string;
      name: string;
      acceptsAnswers: boolean;
    }[] = [],
  ) {
    this.items = seed.map(createDiscussionCategory);
  }

  async list(repositoryId: string) {
    return this.items.filter(
      (category) => category.repository.repositoryId === repositoryId,
    );
  }

  async find(categoryId: string) {
    return this.items.find((category) => category.id === categoryId);
  }
}

function toRecord(discussion: Discussion): DiscussionRecord {
  return {
    id: discussion.id,
    repositoryId: discussion.repository.repositoryId,
    categoryId: discussion.categoryId,
    authorPrincipalId: discussion.author.principalId,
    title: discussion.title,
    body: discussion.body,
    state: discussion.state,
    comments: discussion.comments.map((comment) => ({
      id: comment.id,
      authorPrincipalId: comment.author.principalId,
      body: comment.body,
      status: comment.status,
    })),
    acceptedAnswerCommentId: discussion.acceptedAnswer?.commentId,
  };
}

function toDiscussion(record: DiscussionRecord) {
  return restoreDiscussion(record);
}
