import type { Email } from "../../domain/value-objects/Email"
import type { Password } from "../../domain/value-objects/Password"

export interface UserProps {
  id: string
  name: string
  email: Email
  password?: Password
  role: "admin" | "user"
}
