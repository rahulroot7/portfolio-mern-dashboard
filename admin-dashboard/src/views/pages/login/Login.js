import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'

const Login = () => {
  const [validated, setValidated] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      navigate("/dashboard")
    }
  },[])
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      try {
        let result = await fetch('http://localhost:5000/api/auth/admin-login', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        result = await result.json()
        if (result.name) {
          localStorage.setItem('token', result.token)
          localStorage.setItem('tokenExpiry', Date.now() + 4 * 60 * 60 * 1000); // 4 hours in milliseconds
          toast.success(result.message)
          navigate("/dashboard")
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        console.error('Error during login:', error)
      }
    }
    setValidated(true)
  }

  const handleForm = (e) => {
    const obj = { ...formData, [e.target.name]: e.target.value }
    setFormData(obj)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    required
                  >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>

                    {/* email Input with Validation */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleForm}
                        required
                      />
                      <CFormFeedback invalid>
                        Please enter a valid email.
                      </CFormFeedback>
                    </CInputGroup>

                    {/* Password Input with Validation */}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={handleForm}
                        required
                        minLength="6"
                      />
                      <CFormFeedback invalid>
                        Password must be at least 6 characters long.
                      </CFormFeedback>
                    </CInputGroup>

                    {/* Submit Button */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
