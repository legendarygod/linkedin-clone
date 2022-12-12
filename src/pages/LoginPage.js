import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {auth, logInWithEmailAndPassword, signInWithGoogle} from "../firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import styled from 'styled-components';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate()
    // useEffect(()=> {
    //     if (loading) {
    //         return <h2>Loading...</h2>
    //     }
    //     if (user) {
    //         navigate("/home")
    //     }
    // }, [user, loading])
  return (
    <Login>
        <Container>
            <LoginText type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address"/>
            <LoginText type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            <LoginButton onClick={()=> logInWithEmailAndPassword(email, password)}>Login</LoginButton>
            <GoogleLoginButton onClick={signInWithGoogle}>Login With Google</GoogleLoginButton>
            <ResetLink>
                <Link to="/reset">Forgot Password</Link>
            </ResetLink>
            <RegLink>
                Don't have an account? <Link to='/register'>Register</Link>
            </RegLink>
        </Container>
    </Login>
  )
}

export default LoginPage

const Login = styled.div`
    height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 7px;
`

const Container = styled.div`
    display: flex;
  flex-direction: column;
  text-align: center;
  background-color: #dcdcdc;
  padding: 30px;
`

const LoginText = styled.input`
    padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
`

const LoginButton = styled.button`
  padding: 10px;
  font-size: 18px;
  margin-bottom: 10px;
  border: none;
  color: white;
  background-color: black;
`

const GoogleLoginButton = styled.button`
      background-color: #4285f4;
`

const ResetLink = styled.div``

const RegLink = styled.div``
