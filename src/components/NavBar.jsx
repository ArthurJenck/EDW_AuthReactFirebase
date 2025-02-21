import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/createContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase-config"

const NavBar = () => {
  const { toggleModals } = useContext(UserContext)
  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      alert(
        "For some reason, we cannot deconnect, please check your internet connection and retry."
      )
      console.error(err)

      throw new Error("An error occurred: ", err.message)
    }
  }

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
        AuthJS
      </Link>

      <div>
        <button
          className="btn btn-primary"
          onClick={() => toggleModals("signup")}
        >
          Sign up
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={() => toggleModals("login")}
        >
          Log in
        </button>
        <button className="btn btn-danger ms-2" onClick={logOut}>
          Log out
        </button>
      </div>
    </nav>
  )
}

export default NavBar
