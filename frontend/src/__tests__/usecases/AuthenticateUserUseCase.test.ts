import { describe, it, expect, vi, type Mock } from "vitest";
import { AuthenticateUserUseCase } from "../../application/usecases/AuthenticateUserUseCase";
import { type AuthService } from "../../shared/types/AuthService";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";

describe("AuthenticateUserUseCase", () => {
  // Mock do AuthService
  const mockAuthService: AuthService = {
    authenticate: vi.fn(),
  };

  it("deve lançar exceção para e-mail inválido", async () => {
    new AuthenticateUserUseCase(mockAuthService);

    // Email inválido
    expect(() => new Email("invalido")).toThrow("Email inválido");
  });

  it("deve autenticar com sucesso", async () => {
    const usecase = new AuthenticateUserUseCase(mockAuthService);

    // Mock retornando true
    (mockAuthService.authenticate as Mock).mockResolvedValueOnce(true);

    const emailVO = new Email("test@example.com");
    const passwordVO = new Password("Teste@123456");
    const result = await usecase.execute(emailVO, passwordVO);

    expect(result).toBe(true);
    expect(mockAuthService.authenticate).toHaveBeenCalledWith("test@example.com", "Teste@123456");
  });

  it("deve falhar na autenticação", async () => {
    const usecase = new AuthenticateUserUseCase(mockAuthService);

    // Mock retornando false
    (mockAuthService.authenticate as Mock).mockResolvedValueOnce(false);

    const emailVO = new Email("test@example.com");
    const passwordVO = new Password("Wrong@1password");
    const result = await usecase.execute(emailVO, passwordVO);

    expect(result).toBe(false);
  });
});
