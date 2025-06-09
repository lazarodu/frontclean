import { describe, it, expect, vi, type Mock } from "vitest";
import { LoginUserUseCase } from "../../application/usecases/users/LoginUserUseCase";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";
import type { UserRepository } from "../../domain/repositories/UserRepository";

describe("LoginUserUseCase", () => {
  // Mock do AuthService
  const mockAuthService: UserRepository = {
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    getCurrentUser: vi.fn(),
    setCurrentUser: vi.fn(),
  };

  it("deve lançar exceção para e-mail inválido", async () => {
    new LoginUserUseCase(mockAuthService);

    // Email inválido
    expect(() => new Email("invalido")).toThrow("Email inválido");
  });

  it("deve autenticar com sucesso", async () => {
    const usecase = new LoginUserUseCase(mockAuthService);

    // Mock retornando true
    (mockAuthService.login as Mock).mockResolvedValueOnce(true);

    const emailVO = new Email("test@example.com");
    const passwordVO = new Password("Teste@123456");
    const result = await usecase.execute(emailVO, passwordVO);

    expect(result).toBe(true);
    expect(mockAuthService.login).toHaveBeenCalledWith("test@example.com", "Teste@123456");
  });

  it("deve falhar na autenticação", async () => {
    const usecase = new LoginUserUseCase(mockAuthService);

    // Mock retornando false
    (mockAuthService.login as Mock).mockResolvedValueOnce(false);

    const emailVO = new Email("test@example.com");
    const passwordVO = new Password("Wrong@1password");
    const result = await usecase.execute(emailVO, passwordVO);

    expect(result).toBe(false);
  });
});
