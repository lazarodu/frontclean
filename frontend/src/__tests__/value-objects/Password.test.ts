import { describe, it, expect } from "vitest";
import { Password } from "../../domain/value-objects/Password";

describe("Password", () => {
  it("deve criar a senha com sucesso se for válida", () => {
    const value = "Valid123!";
    const password = new Password(value);
    expect(password.getValue()).toBe(value);
  });

  it("deve lançar erro se tiver menos de 8 caracteres", () => {
    expect(() => new Password("A1a!")).toThrow("A senha deve ter pelo menos 8 caracteres");
  });

  it("deve lançar erro se não tiver letra maiúscula", () => {
    expect(() => new Password("valid123!")).toThrow("A senha deve conter pelo menos uma letra maiúscula");
  });

  it("deve lançar erro se não tiver letra minúscula", () => {
    expect(() => new Password("VALID123!")).toThrow("A senha deve conter pelo menos uma letra minúscula");
  });

  it("deve lançar erro se não tiver número", () => {
    expect(() => new Password("ValidPass!")).toThrow("A senha deve conter pelo menos um número");
  });

  it("deve lançar erro se não tiver caractere especial", () => {
    expect(() => new Password("Valid1234")).toThrow("A senha deve conter pelo menos um caractere especial");
  });
});
