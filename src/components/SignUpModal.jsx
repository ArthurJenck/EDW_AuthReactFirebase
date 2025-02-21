import { useContext, useRef, useState } from "react"
import { UserContext } from "../context/createContext"

const SignUpModal = () => {
  const { modalState, toggleModals, signUp } = useContext(UserContext)
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

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min.")
      return
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match.")
      return
    }

    try {
      const cred = await signUp(
        inputs.current[0].value,
        inputs.current[1].value
      )
      closeModal()

      return cred
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid")
      } else if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used")
      } else {
        setValidation(`Error: ${err.code}`)
      }
      console.error("An error occurred while signup: ", err.message)
      throw new Error("Error while signup:", err)
    }
  }

  return (
    <>
      {modalState.signUpModal && (
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
                  <h5 className="modal-title">Sign Up</h5>
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
                    </div>

                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Repeat Password
                      </label>
                      <input
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="repeatPwd"
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

export default SignUpModal
