import type React from "react"

import { renderHook } from "@testing-library/react"
import { AuthContext, type AuthContextType } from "../../presentation/contexts/AuthContext"
import { useAuth } from "../../presentation/hooks/useAuth"
import { Email } from "../../domain/value-objects/Email"

describe("useAuth Hook", () => {
  it("returns the auth context value", () => {
    const contextValue: AuthContextType = {
      currentUser: { id: "1", name: "Test User", email: new Email("test@example.com"), role: "user" },
      isLoading: false,
      login: async () => { },
      register: async () => { },
      logout: () => { },
    }

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

    const { result } = renderHook(() => useAuth(), { wrapper })

    expect(result.current).toBe(contextValue)
  })

})
