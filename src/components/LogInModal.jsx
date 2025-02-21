import { useContext, useRef, useState } from "react"
import { UserContext } from "../context/createContext"
import { useNavigate } from "react-router-dom"

const LogInModal = () => {
  const { modalState, toggleModals, logIn } = useContext(UserContext)
  const navigate = useNavigate()
  const [validation, setValidation] = useState("")

  const formRef = useRef(null)

  const closeModal = () => {
    formRef.current.reset()
    setValidation("")
    toggleModals("close")
  }

  const inputs = useRef([])
  const addInput = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const handleForm = async (e) => {
    e.preventDefault()
    setValidation("")

    try {
      const cred = await logIn(inputs.current[0].value, inputs.current[1].value)
      closeModal()
      navigate("/private/home")

      return cred
    } catch {
      setValidation("Incorrect credentials")
    }
  }

  return (
    <>
      {modalState.logInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            className="w-100 h-100 bg-dark bg-opacity-75"
            onClick={closeModal}
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Log in</h5>
                  <button className="btn-close" onClick={closeModal}></button>
                </div>

                <div className="modal-body">
                  <form
                    className="sign-up-form"
                    onSubmit={handleForm}
                    ref={formRef}
                  >
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Email adress
                      </label>
                      <input
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                        ref={addInput}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Password
                      </label>
                      <input
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                        ref={addInput}
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            div
          </div>
        </div>
      )}
    </>
  )
}

export default LogInModal
