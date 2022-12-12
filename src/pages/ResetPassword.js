import React, {useEffect, useState} from 'react'
import {useAuthState} from "react-firebase-hooks/auth"
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { auth, sendPasswordReset } from '../firebase'

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (loading) return <h2>Loading</h2>
        if (user) navigate("/home")
    }, [user, loading])
  return (
    <Reset>
        <Container>
            <ResetTextBox type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address"/>
            <ResetButton onClick={() => sendPasswordReset(email)}>Send password Reset Email</ResetButton>
            <RegDiv>
                Don't Have an Account? <Link to="/register">Register</Link>
            </RegDiv>
        </Container>
    </Reset>
  )
}

export default ResetPassword

const Reset = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  div{
    margin-top: 7px;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`

const ResetTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`

const ResetButton = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`

const RegDiv = styled.div``

