import { describe, it, expect, vi } from "vitest";
import { LogoutUserUseCase } from "../../application/usecases/users/LogoutUserUseCase";
import { type UserRepository } from "../../domain/repositories/UserRepository";

describe("LogoutUserUseCase", () => {
  it("deve chamar o método logout do repositório", () => {
    const mockRepo: UserRepository = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn(),
      setCurrentUser: vi.fn(),
    };

    const usecase = new LogoutUserUseCase(mockRepo);
    usecase.execute();

    expect(mockRepo.logout).toHaveBeenCalled();
  });
});
