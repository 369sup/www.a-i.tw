import type { OrganizationRefV1 } from "../../../contracts/v1/public";
import type { CreateAccountCommand } from "../../commands/create-account/command";

export interface CreateAccountUseCase {
  execute(command: CreateAccountCommand): Promise<OrganizationRefV1>;
}
