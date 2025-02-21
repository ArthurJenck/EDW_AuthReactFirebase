import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../context/createContext"

const NavBar = () => {
  const { toggleModals } = useContext(UserContext)

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
        <button className="btn btn-primary ms-2">Log in</button>
        <button className="btn btn-danger ms-2">Log out</button>
      </div>
    </nav>
  )
}

export default NavBar
