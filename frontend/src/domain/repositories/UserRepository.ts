import { User } from "../entities/User";

export interface UserRepository {
    login(email: string, password: string): Promise<User>;
    register(name: string, email: string, password: string): Promise<User>;
    logout(): void;
    getCurrentUser(): User | null;
    setCurrentUser(user: User): void;
}
