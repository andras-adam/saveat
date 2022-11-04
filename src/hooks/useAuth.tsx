import { createContext, ReactNode, useContext, useState } from 'react'


interface IAuthContext {
  isAuthenticated: boolean
  signin: () => void
  signout: () => void
}

const AuthContext = createContext<IAuthContext | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('The useAuth() hook must be used within an AuthProvider.')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ isAuthenticated, setIsAuthenticated ] = useState(true)

  function signin() {
    setIsAuthenticated(true)
  }

  function signout() {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signin, signout }}>
      {children}
    </AuthContext.Provider>
  )
}
