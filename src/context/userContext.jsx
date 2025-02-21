import { useEffect, useState } from "react"
import { UserContext } from "./createContext"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "../firebase-config"

export const UserContextProvider = (props) => {
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd)
  const logIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

  const [currentUser, setCurrentUser] = useState()
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })

    return unsubscribe
  }, [])

  // MODALS
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
    <UserContext.Provider
      value={{ modalState, toggleModals, signUp, logIn, currentUser }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}
