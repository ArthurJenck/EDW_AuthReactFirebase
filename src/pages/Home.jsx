import { useContext } from "react"
import { UserContext } from "../context/createContext"

const Home = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div className="container p-5">
      <h1 className="display-3 text-light">
        {currentUser ? "Welcome buddy" : "Hi, Sign up or Log in"}
      </h1>
    </div>
  )
}

export default Home
