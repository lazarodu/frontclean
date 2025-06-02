"use client"

import { createContext, useState, useEffect, type ReactNode, useContext } from "react"
import type { UserProps } from "../../shared/types/UserType"
import { mockUsers } from "../../infrastructure/mocks/UserMock"
import { Email } from "../../domain/value-objects/Email"
import { Password } from "../../domain/value-objects/Password"
import { makeLoginController } from "../../factories/makeLoginController"

export interface AuthContextType {
  currentUser: UserProps | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => { },
  register: async () => { },
  logout: () => { },
})

interface AuthProviderProps {
  children: ReactNode
}

const controller = makeLoginController()

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // const user = mockUsers.find((u) => u.email.getValue() === email && u.password.getValue() === password)
        const user = await controller.login(email, password)

        if (typeof user == "string") {
          reject(new Error("Invalid email or password"))
        } else {
          const setUser = { id: user.id, name: user.name, email: user.email, role: user.role }
          setCurrentUser(setUser)
          localStorage.setItem("currentUser", JSON.stringify({ setUser }))
          resolve()
        }
      }, 500)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email.getValue() === email)
        if (existingUser) {
          reject(new Error("Email already in use"))
        } else {
          const newUser = {
            id: `user-${Date.now()}`,
            name,
            email: new Email(email),
            password: new Password(password),
            role: "user" as const, // Define o tipo de role como 'user'
          }

          // Em um aplicativo real, você enviaria isso para uma API
          mockUsers.push(newUser)

          // Remove password antes de armazenar
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _, ...userWithoutPassword } = newUser
          setCurrentUser(userWithoutPassword)
          localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
          resolve()
        }
      }, 500)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado com AuthProvider");
  }
  return context;
}
