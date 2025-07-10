import type { User } from "../../../domain/entities/User";

export const DataStorage = {
  get: (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  set: (key: string, value: string | User) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  clear: () => {
    localStorage.clear();
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  }
}