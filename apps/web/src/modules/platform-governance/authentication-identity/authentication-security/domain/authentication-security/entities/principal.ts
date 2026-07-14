import { InvalidSessionTransitionError } from "../errors/invalid-session-transition.error";
import {
  createPrincipalId,
  type PrincipalId,
} from "../value-objects/principal-id";
import {
  createPrincipalKind,
  type PrincipalKind,
} from "../value-objects/principal-kind";
import {
  createPrincipalStatus,
  type PrincipalStatus,
} from "../value-objects/principal-status";

export type Principal = Readonly<{
  id: PrincipalId;
  kind: PrincipalKind;
  status: PrincipalStatus;
}>;

export function createPrincipal(input: {
  id: string;
  kind: string;
  status: string;
}): Principal {
  return {
    id: createPrincipalId(input.id),
    kind: createPrincipalKind(input.kind),
    status: createPrincipalStatus(input.status),
  };
}

export function assertCanAuthenticate(principal: Principal): void {
  if (principal.status !== "active") {
    throw new InvalidSessionTransitionError(
      "Disabled principals cannot authenticate.",
    );
  }
}
