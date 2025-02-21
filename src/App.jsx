import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import SignUpModal from "./components/SignUpModal"
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome"
import LogInModal from "./components/LogInModal"

function App() {
  return (
    <>
      <SignUpModal />
      <LogInModal />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/home" element={<PrivateHome />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
