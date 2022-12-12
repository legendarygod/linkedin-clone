import React, {useEffect, useState} from 'react'
import {useAuthState} from "react-firebase-hooks/auth"
import {Link, useNavigate} from "react-router-dom"
import styled from 'styled-components'
import { auth, registerWithEmailAndPassword, signInWithGoogle } from '../firebase'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()

    const register = () => {
        if (!name){
            alert("Please Enter Name");
        }
        registerWithEmailAndPassword(name, email, password)
    }
const checks = () => {
  if (loading) {
            return <h2>Loading</h2>
        }
  if (user) navigate("/login")
}
    useEffect(()=> {
       checks() 
    }, [user, loading])
  return (
    <Registerer>
        <Container>
            <RegTextBox type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
            <RegTextBox type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Valid Email Address" />
            <RegTextBox type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <RegButton onClick={register}>
                Register
            </RegButton>
            <GoogleReg onClick={signInWithGoogle}>
                Register With Google
            </GoogleReg>
            <LoginReg>
                Already Have An Account? <Link to="/login">Login</Link>
            </LoginReg>
        </Container>
    </Registerer>
  )
}

export default Register

const Registerer = styled.div`
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

const RegTextBox = styled.input`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`

const RegButton = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`

const GoogleReg = styled(RegButton)`
  background-color: #4285f4;
`

const LoginReg = styled.div``
