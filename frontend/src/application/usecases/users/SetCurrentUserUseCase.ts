import type { User } from "../../../domain/entities/User";
import type { UserRepository } from "../../../domain/repositories/UserRepository";

export class SetCurrentUserUseCase {
  private setCurrentUserService: UserRepository;

  constructor(setCurrentUserService: UserRepository) {
    this.setCurrentUserService = setCurrentUserService;
  }

  async execute(user: User) {
    return this.setCurrentUserService.setCurrentUser(user);
  }
}
