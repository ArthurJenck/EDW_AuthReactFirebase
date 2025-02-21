import { useState } from "react"
import { UserContext } from "./createContext"

export const UserContextProvider = (props) => {
  const [modalState, setModalState] = useState({
    signUpModal: false,
    logInModal: false,
  })

  const toggleModals = (modal) => {
    if (modal === "login") {
      setModalState({
        signUpModal: false,
        logInModal: true,
      })
    }

    if (modal === "signup") {
      setModalState({
        signUpModal: true,
        logInModal: false,
      })
    }

    if (modal === "close") {
      setModalState({
        signUpModal: false,
        logInModal: false,
      })
    }
  }

  return (
    <UserContext.Provider value={{ modalState, toggleModals }}>
      {props.children}
    </UserContext.Provider>
  )
}
