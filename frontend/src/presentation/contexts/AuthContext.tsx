import { createContext, useState, useEffect, type ReactNode, useContext } from "react"
import type { UserProps } from "../../shared/types/UserType"
import { Email } from "../../domain/value-objects/Email"
import { Password } from "../../domain/value-objects/Password"
import { makeLoginUserUseCase, makeLogoutUserUseCase, makeRegisterUserUseCase, makeSetCurrentUserUseCase } from "../../factories/makeUserUseCases"

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

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula chamada de API
    setTimeout(async () => {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        const userStore = JSON.parse(storedUser)
        setCurrentUser(userStore)
        const useCase = makeSetCurrentUserUseCase()
        await useCase.execute(userStore)
      }
      setIsLoading(false)
    }, 500)

  }, [])

  const login = async (email: string, password: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // const user = mockUsers.find((u) => u.email.getValue() === email && u.password.getValue() === password)
        try {

          const useCase = makeLoginUserUseCase()
          const user = await useCase.execute(new Email(email), new Password(password))

          const setUser = { id: user.id, name: user.name, email: user.email, role: user.role }
          setCurrentUser(setUser)
          localStorage.setItem("currentUser", JSON.stringify({ ...setUser }))
          resolve()
        } catch (e) {
          reject(new Error(`E-mail ou senha inválidos: ${e}`))
        }

      }, 500)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // Simula chamada de API
    return new Promise<void>((resolve, reject) => {
      setTimeout(async () => {
        // const existingUser = mockUsers.find((u) => u.email.getValue() === email)
        // if (existingUser) {
        //   reject(new Error("Email already in use"))
        // } else {
        //   const newUser = {
        //     id: `user-${Date.now()}`,
        //     name,
        //     email: new Email(email),
        //     password: new Password(password),
        //     role: "user" as const, // Define o tipo de role como 'user'
        //   }
        // Em um aplicativo real, você enviaria isso para uma API
        // mockUsers.push(newUser)
        // Remove password antes de armazenar
        // const { password: _, ...userWithoutPassword } = newUser
        try {
          const useCase = makeRegisterUserUseCase()
          const newUser = await useCase.execute(name, new Email(email), new Password(password))

          setCurrentUser(newUser)
          localStorage.setItem("currentUser", JSON.stringify(newUser))
          resolve()
        } catch (e) {
          reject(new Error(`Erro ao registrar usuário: ${e}`))
        }
      }, 500)
    })
  }

  const logout = () => {
    const useCase = makeLogoutUserUseCase()
    useCase.execute()
    setCurrentUser(null)
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
