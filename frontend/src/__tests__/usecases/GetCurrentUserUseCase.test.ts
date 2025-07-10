import { describe, it, expect, vi } from "vitest";
import { GetCurrentUserUseCase } from "../../application/usecases/users/GetCurrentUserUseCase";
import { type UserRepository } from "../../domain/repositories/UserRepository";
import { Email } from "../../domain/value-objects/Email";
import { User } from "../../domain/entities/User";

describe("GetCurrentUserUseCase", () => {
  it("deve retornar o usuário autenticado", async () => {
    const fakeUser = new User("1", "John", new Email("john@example.com"), "admin");

    const mockRepo: UserRepository = {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn().mockReturnValue(fakeUser),
      setCurrentUser: vi.fn(),
    };

    const usecase = new GetCurrentUserUseCase(mockRepo);
    const result = await usecase.execute();

    expect(result).toEqual(fakeUser);
    expect(mockRepo.getCurrentUser).toHaveBeenCalled();
  });
});
