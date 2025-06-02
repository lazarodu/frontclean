import type { User } from "../../domain/entities/User";

export interface AuthService {
  authenticate(email: string, password: string): Promise<User | undefined>;
}
