import type { Email } from "../../domain/value-objects/Email"

export interface UserProps {
  id: string
  name: string
  email: Email
  password?: string
  role: "admin" | "user"
}
