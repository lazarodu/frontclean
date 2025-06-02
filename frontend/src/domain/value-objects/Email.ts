export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!/\S+@\S+\.\S+/.test(value)) {
      throw new Error("Email inválido");
    }
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
