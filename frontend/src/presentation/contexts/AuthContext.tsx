import { createContext, useState, useEffect, type ReactNode, useContext } from "react"
import type { UserProps } from "../../shared/types/UserType"
import { Email } from "../../domain/value-objects/Email"
import { Password } from "../../domain/value-objects/Password"
import { makeLoginUserUseCase, makeLogoutUserUseCase, makeRegisterUserUseCase, makeSetCurrentUserUseCase } from "../../factories/makeUserUseCases"
import { DataStorage } from "../../infrastructure/services/http/DataStorage"

export interface AuthContextType {
  currentUser: UserProps | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<string>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => { },
  register: async () => "",
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
      // const storedUser = localStorage.getItem("currentUser")
      const userStore = DataStorage.get("currentUser")
      if (userStore) {
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
          // localStorage.setItem("currentUser", JSON.stringify({ ...setUser }))
          DataStorage.set("currentUser", setUser)
          resolve()
        } catch (e) {
          reject(new Error(`E-mail ou senha inválidos: ${e}`))
        }

      }, 500)
    })
  }

  const register = async (name: string, email: string, password: string) => {
    // Simula chamada de API
    return new Promise<string>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const useCase = makeRegisterUserUseCase()
          const response = await useCase.execute(name, new Email(email), new Password(password))
          resolve(response)
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
