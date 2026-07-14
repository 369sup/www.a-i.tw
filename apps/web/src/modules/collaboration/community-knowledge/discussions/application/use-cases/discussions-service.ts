import {
  addDiscussionComment,
  createDiscussion,
  markDiscussionAnswer,
  type Discussion,
} from "../../domain/discussions/aggregates/discussion";
import type { DiscussionCategory } from "../../domain/discussions/aggregates/discussion-category";
import type { DiscussionPrincipal } from "../ports/inbound/discussion-principal";
import type { DiscussionCategoryStore } from "../ports/outbound/discussion-category-store.port";
import type { DiscussionStore } from "../ports/outbound/discussion-store.port";
import type { CommunityInteractionSafety } from "../ports/outbound/community-interaction-safety.port";
import type {
  DiscussionParticipationAction,
  RepositoryDiscussionParticipation,
} from "../ports/outbound/repository-discussion-participation.port";

export type DiscussionSummary = Readonly<{
  discussionId: string;
  repositoryId: string;
  categoryId: string;
  authorPrincipalId: string;
  title: string;
  body: string;
  state: "open" | "closed";
  canMarkAnswer: boolean;
  acceptedAnswerCommentId?: string;
  comments: readonly Readonly<{
    commentId: string;
    authorPrincipalId: string;
    body: string;
    status: "active" | "minimized";
  }>[];
}>;

export type DiscussionCategorySummary = Readonly<{
  categoryId: string;
  slug: string;
  name: string;
  acceptsAnswers: boolean;
}>;

export interface DiscussionsService {
  list(
    repositoryId: string,
    actor: DiscussionPrincipal,
  ): Promise<{
    categories: readonly DiscussionCategorySummary[];
    discussions: readonly DiscussionSummary[];
  }>;
  create(input: {
    repositoryId: string;
    categoryId: string;
    title: string;
    body: string;
    actor: DiscussionPrincipal;
  }): Promise<DiscussionSummary>;
  comment(input: {
    discussionId: string;
    body: string;
    actor: DiscussionPrincipal;
  }): Promise<DiscussionSummary>;
  markAnswer(input: {
    discussionId: string;
    commentId: string;
    actor: DiscussionPrincipal;
  }): Promise<DiscussionSummary>;
}

export function createDiscussionsService(
  discussions: DiscussionStore,
  categories: DiscussionCategoryStore,
  repositories: RepositoryDiscussionParticipation,
  safety: CommunityInteractionSafety,
  nextDiscussionId: () => string,
  nextCommentId: () => string,
): DiscussionsService {
  async function requireAllowed(
    repositoryId: string,
    principal: DiscussionPrincipal,
    action: DiscussionParticipationAction,
  ) {
    if (!(await repositories.exists(repositoryId)))
      throw new Error("Repository discussion scope not found.");
    if (!(await repositories.allowed({ repositoryId, principal, action })))
      throw new Error("Repository discussion participation denied.");
  }
  async function requiredDiscussion(id: string) {
    const discussion = await discussions.find(id);
    if (!discussion) throw new Error("Discussion not found.");
    return discussion;
  }
  async function requiredCategory(id: string, repositoryId: string) {
    const category = await categories.find(id);
    if (!category || category.repository.repositoryId !== repositoryId)
      throw new Error("Discussion Category is outside the Repository scope.");
    return category;
  }
  async function canMarkAnswer(
    discussion: Discussion,
    actor: DiscussionPrincipal,
  ) {
    return (
      discussion.author.principalId === actor.principalId ||
      (await repositories.allowed({
        repositoryId: discussion.repository.repositoryId,
        principal: actor,
        action: "discussion:triage",
      }))
    );
  }
  return {
    async list(repositoryId, actor) {
      await requireAllowed(repositoryId, actor, "discussion:read");
      const repositoryCategories = await categories.list(repositoryId);
      const categoryById = new Map(
        repositoryCategories.map((category) => [category.id, category]),
      );
      return {
        categories: repositoryCategories.map(categorySummary),
        discussions: await Promise.all(
          (await discussions.list(repositoryId)).map(async (discussion) =>
            summary(
              discussion,
              Boolean(
                categoryById.get(discussion.categoryId)?.acceptsAnswers,
              ) && (await canMarkAnswer(discussion, actor)),
            ),
          ),
        ),
      };
    },
    async create(input) {
      await requireAllowed(
        input.repositoryId,
        input.actor,
        "discussion:create",
      );
      const category = await requiredCategory(
        input.categoryId,
        input.repositoryId,
      );
      const discussion = createDiscussion({
        id: nextDiscussionId(),
        repositoryId: input.repositoryId,
        categoryId: input.categoryId,
        authorPrincipalId: input.actor.principalId,
        title: input.title,
        body: input.body,
      });
      await discussions.save(discussion);
      return summary(discussion, category.acceptsAnswers);
    },
    async comment(input) {
      const discussion = await requiredDiscussion(input.discussionId);
      await requireAllowed(
        discussion.repository.repositoryId,
        input.actor,
        "discussion:comment",
      );
      if (
        !(await safety.allowed({
          repositoryId: discussion.repository.repositoryId,
          principal: input.actor,
          action: "discussion_comment",
        }))
      )
        throw new Error(
          "Repository interaction limit denied Discussion comment.",
        );
      const updated = addDiscussionComment(discussion, {
        id: nextCommentId(),
        authorPrincipalId: input.actor.principalId,
        body: input.body,
      });
      await discussions.save(updated);
      return summary(updated, await canMarkAnswer(updated, input.actor));
    },
    async markAnswer(input) {
      const discussion = await requiredDiscussion(input.discussionId);
      await requireAllowed(
        discussion.repository.repositoryId,
        input.actor,
        "discussion:read",
      );
      if (discussion.author.principalId !== input.actor.principalId)
        await requireAllowed(
          discussion.repository.repositoryId,
          input.actor,
          "discussion:triage",
        );
      const category = await requiredCategory(
        discussion.categoryId,
        discussion.repository.repositoryId,
      );
      const updated = markDiscussionAnswer(discussion, {
        commentId: input.commentId,
        categoryAcceptsAnswers: category.acceptsAnswers,
      });
      await discussions.save(updated);
      return summary(updated, true);
    },
  };
}

function summary(
  discussion: Discussion,
  canMarkAnswer: boolean,
): DiscussionSummary {
  return {
    discussionId: discussion.id,
    repositoryId: discussion.repository.repositoryId,
    categoryId: discussion.categoryId,
    authorPrincipalId: discussion.author.principalId,
    title: discussion.title,
    body: discussion.body,
    state: discussion.state,
    canMarkAnswer,
    acceptedAnswerCommentId: discussion.acceptedAnswer?.commentId,
    comments: discussion.comments.map((comment) => ({
      commentId: comment.id,
      authorPrincipalId: comment.author.principalId,
      body: comment.body,
      status: comment.status,
    })),
  };
}

function categorySummary(
  category: DiscussionCategory,
): DiscussionCategorySummary {
  return {
    categoryId: category.id,
    slug: category.slug,
    name: category.name,
    acceptsAnswers: category.acceptsAnswers,
  };
}
