export class Password {
  private readonly value: string;

  constructor(value: string) {
    if (value.length < 8) {
      throw new Error("A senha deve ter pelo menos 8 caracteres");
    } else if (!/[A-Z]/.test(value)) {
      throw new Error("A senha deve conter pelo menos uma letra maiúscula");
    } else if (!/[a-z]/.test(value)) {
      throw new Error("A senha deve conter pelo menos uma letra minúscula");
    } else if (!/[0-9]/.test(value)) {
      throw new Error("A senha deve conter pelo menos um número");
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      throw new Error("A senha deve conter pelo menos um caractere especial");
    }
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
