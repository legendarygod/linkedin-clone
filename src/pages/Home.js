import React, {useEffect} from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import LeftSide from '../components/LeftSide'
import Main from '../components/Main'
import RightSide from '../components/RightSide'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice'




const Home = (props) => {
    
    const userName = useSelector(selectUserName);
    const navigate = useNavigate()
    useEffect(() => {
        if(!userName){
            navigate('/');
            return;
        }

    }, [])
    

  return (
    <>
        <Header />
        <Container>
            <Section>
                <h5>
                    <Link to='/'>
                        Hiring In a Hurry?
                    </Link>
                </h5>
                <p>
                    find Talented Pros in Record time with Upwork and keep Businness Moving
                </p>
            </Section>
            <Layout>
                <LeftSide />
                <Main />
                <RightSide />
            </Layout>
            
        </Container>
    
    </>
  )
}

const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;
`

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`

const Section = styled.section`
    min-height: 50px;
    padding: 16px 0;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;

    h5{
        color: #0a66c2;
        font-size: 14px;
        a{
            font-weight: 700;
        }
    }

    p{
        font-size: 14px;
        color: #000;
        font-weight: 600;
    }

    @media (max-width: 768px){
        flex-direction: column;
        padding: 0 5px;
    }
`

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside main rightside";
    grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
    column-gap: 25px;
    row-gap: 25px;
    grid-template-rows: auto;
    margin: 25px 0;
    @media (max-width: 768px){
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
`

export default Home;