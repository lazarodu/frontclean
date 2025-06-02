import type { User } from "../../domain/entities/User";
import { type AuthService } from "../../shared/types/AuthService";
import { mockUsers } from "../mocks/UserMock";

export class AuthServiceInMemory implements AuthService {
  async authenticate(email: string, password: string): Promise<User | undefined> {
    const user = mockUsers.find((u) => u.email.getValue() === email && u.password.getValue() === password);
    return user;
  }
}
