import { alphaValue } from "../domain/value";
import type { BetaPublishedContract } from "../../../beta/src/contracts/public";

export function useAlpha(contract: BetaPublishedContract): string {
  return `${alphaValue}:${contract.version}`;
}
