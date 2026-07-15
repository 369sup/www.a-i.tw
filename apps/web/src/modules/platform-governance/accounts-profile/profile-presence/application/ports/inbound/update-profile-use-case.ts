import type { AccountProfileV1 } from "../../../contracts/v1/public";
import type { UpdateProfileCommand } from "../../commands/update-profile/command";

export interface UpdateProfileUseCase {
  execute(command: UpdateProfileCommand): Promise<AccountProfileV1>;
}
