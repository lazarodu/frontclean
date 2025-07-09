import type { Email } from "../value-objects/Email";
import type { Password } from "../value-objects/Password";

export class User {
  public readonly id: string = ''
  public readonly name: string = ''
  public readonly email: Email;
  public readonly password?: Password
  public readonly role: 'admin' | 'user' = 'user';

  constructor(id: string, name: string, email: Email, role: 'admin' | 'user') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
