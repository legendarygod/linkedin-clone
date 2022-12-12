import React,{useEffect} from 'react'
import {auth, provider, signInWithGoogle} from '../firebase'
import styled from 'styled-components'
import { selectUserName, selectUserPhoto,  setUserLogin,  } from '../features/user/userSlice'
import {useSelector, useDispatch} from 'react-redux'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";


const Login = () => {
  const navigate = useNavigate()
    const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch()


   

    const checks = () => {
  if (loading) {
            return <h2>Loading</h2>
        }
  if (user) navigate("/home")
}
    useEffect(()=> {
       checks() 
    }, [user, loading])

    

    const signIn = async () => {
      try{
        signInWithGoogle()
      }catch(error){
        console.log(error);
      }
    }
  return <Container>
    <Nav>
      <a href='/'>
        <img src='/images/login-logo.svg' alt='pic'></img>
      </a>
      <div>
        <Join>
          <Link to="/register">
            Register
          </Link>
          </Join>
        <SignIn>
          <Link to="/login">
            Login
          </Link>
        </SignIn>
      </div>
    </Nav>
    <Section>
        <Hero>
          <h1>Welcome to your Professional community</h1>
          <img src='/images/login-hero.svg' alt='pic' />
        </Hero>
        <Form>
          <Google onClick={signIn}>
            <img src='/images/google.svg' alt='pic'></img>
            Sign In with Google
          </Google>
        </Form>
    </Section>
  </Container>
}


const Container = styled.div`
  padding: 0;
`

const Nav = styled.div`
  max-width: 1128px;
  margin: auto;
  padding:  12px 0 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;
  & > a{
    width: 135px;
    height: 24px;
    @media (max-width: 768px){
      padding: 0 5px;
    }
  }
`

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 12px;
  cursor: pointer;
  &:hover{
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
  }
`

const SignIn = styled.a`
  box-shadow: inset 0 0 0 2px #0a66c2;
  color: #0a66c2;
  border-radius: 24px;
  transition-duration: 150ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  text-align: center;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  &:hover{
    background-color: rgba(112, 161, 249, 0.115);
    color: #0a66c2;
    text-decoration: none;
  }
`

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 760px;
  padding-bottom: 130px;
  padding-top: 40px;
  padding: 60px 0;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  @media (max-width: 768px){
    margin: auto;
    min-height: 0px;
  }
`

const Hero = styled.div`
width: 100%;

h1{
  padding-bottom: 0;
  width: 55%;
  font-size: 56px;
  color: #2977c9;
  font-weight: 200;
  line-height: 70px;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 20px;
    width: 100%;
    line-height: 2;
  }
}

img{
  /* z-index: -1; */
  width: 700px;
  height: 670px;
  position: absolute;
  bottom: -2px;
  right: -150px;
  @media (max-width: 768px){
    top: 230px;
    width: initial;
    position: initial;
    height: initial;
  }
}
`

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  @media (max-width: 768px){
    margin-top: 20px;
  }
`

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 59px;
  width: 100%;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 0 2px rgb(0 0 0 / 0%) inset 0 0 0 1px rgb(0 0 0 / 0%) ;
  vertical-align: middle;
  z-index: 0;
  transition-duration: 250ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
    &:hover{
      background-color: rgba(207, 207, 207, .25);
      color: rgba(0, 0, 0, .75);
  }
`

export default Login;



