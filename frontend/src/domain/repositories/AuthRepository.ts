import { User } from "../entities/User";

export interface AuthRepository {
    login(email: string, password: string): Promise<User>;
    register(name: string, email: string, password: string): Promise<User>;
    logout(): void;
    getCurrentUser(): User | null;
}
