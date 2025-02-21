import { useContext } from "react"
import { UserContext } from "../../context/createContext"
import { Navigate, Outlet } from "react-router-dom"

const Private = () => {
  const { currentUser } = useContext(UserContext)

  if (!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div className="container">
      <Outlet />
    </div>
  )
}

export default Private
