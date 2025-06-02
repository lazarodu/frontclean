import type { User } from "../../domain/entities/User";
import { Email } from "../../domain/value-objects/Email";
import { Password } from "../../domain/value-objects/Password";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: new Email("admin@example.com"),
    password: new Password("Admin1234@"),
    role: "admin",
  },
  {
    id: "user-2",
    name: "Regular User",
    email: new Email("user@example.com"),
    password: new Password("User1234@"),
    role: "user",
  },
]
