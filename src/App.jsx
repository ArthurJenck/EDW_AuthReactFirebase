import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import SignUpModal from "./components/SignUpModal"
import "./globals.css"

function App() {
  return (
    <>
      <NavBar />
      <SignUpModal />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
