import type { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetCurrentUserUseCase {
  private getCurrentUserService: UserRepository;

  constructor(getCurrentUserService: UserRepository) {
    this.getCurrentUserService = getCurrentUserService;
  }

  async execute() {
    return this.getCurrentUserService.getCurrentUser();
  }
}
