import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Link,  useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice'
import { useAuthState } from "react-firebase-hooks/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    getDocs,
    orderBy,
    where,
    query,
    Timestamp,
    updateDoc,
} from 'firebase/firestore'
import {auth, storage} from '../firebase'
import db from '../firebase'


const LeftSide = () => {
    
    const [user, loading, error] = useAuthState(auth);
       const navigate = useNavigate()
       const dispatch = useDispatch()
       
       const fetchUserName = async () => {
           try {
             const q = query(collection(db, "users"), where("uid", "==", user?.uid));
             const doc = await getDocs(q);
             const data = doc.docs[0].data();
             dispatch(setUserLogin({
             name: data.displayName,
             email: data.email,
             photo: data.photoURL
           }))
           } catch (err) {
             console.error(err);
           }
         };
    
       //user credewentials
       const userName = useSelector(selectUserName);
       const userPhoto = useSelector(selectUserPhoto);
    
        useEffect(() => {
       if (loading) return;
       if (!user) return navigate("/");
       fetchUserName();
     }, [user, loading]);

  return (
    <Container>
        <ArtCard>
            <UserInfo>
                <CardBackGround />
                <Link to='/home'>
                    <Photo />
                    <Links>
                        {userName ? `Welcome, ${userName}!` : "Welcome"}
                    </Links>
                </Link>
                <Link to='/home'>
                    <AddPhotoText>
                        Add A Photo
                    </AddPhotoText>
                </Link>
                <Link to={`/profile/${user?.uid}`}>
                    <AddPhotoText>
                        View Profile
                    </AddPhotoText>
                </Link>
            </UserInfo>
            <Widget>
                <Link to='/'>
                    <div>
                        <span>Connections</span>
                        <span>Grow Your Network</span>
                    </div>
                    <img src='/images/widget-icon.svg' alt='' />
                </Link>
            </Widget>
            <Item>
                <span>
                    <img src='/images/item-icon.svg' alt='' />
                    My Items
                </span>
            </Item>
        </ArtCard>
        <CommunityCard>
            <Link to='/home'>
                <span>
                    Groups
                </span>
            </Link>
            <Link to='/home'>
                <span>
                    events
                    <img src='/images/plus-icon.svg' alt=''/>
                </span>
            </Link>
            <Link to='/home'>
                <span>
                    Follow Hashtags
                </span>
            </Link>
            <Link to='/home'>
                <span>
                    Discover More
                </span>
            </Link>
        </CommunityCard>
    </Container>
  )
}

const Container = styled.div`
    grid-area: leftside;
`

const ArtCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 0;
    background-color: #fff;
    border-radius: 5px;
    transition: box-shadow 2.5s;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`

const UserInfo = styled.div`
    border-bottom: 1px solid rgba(0, 0 , 0, 0.15);
    padding: 12px 12px 16px;
    word-wrap: break-word;
    word-break: break-word;
`
const CardBackGround = styled.div`
    background: url('/images/card-bg.svg');
    background-position: center;
    background-size: 462px;
    height: 54px;
    margin: -12px -12px 0;
`
const Photo = styled.div`
    box-shadow: none;
    background-image: url('/images/photo.svg');
    width: 72px;
    height: 72px;
    box-sizing: border-box;
    background-clip: content-box;
    background-color: white;
    background-position: center;
    background-size: 60%;
    background-repeat: no-repeat;
    border: 2px solid #fff;
    margin: -30px auto 12px;
`
const Links = styled.div`
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0,0,0,0.9);
    font-weight: 600;
`
const AddPhotoText = styled.div`
    color: #0a66c2;
    margin-top: 4px;
    font-size: 12px;
    line-height: 1.33;
    font-weight: 400;
    text-decoration: none;
`

const Widget = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    padding-top: 12px;
    padding-bottom: 12px;
    text-decoration: none;

    & > a{
        text-decoration: none !important;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 12px;

        &:hover{
            background-color: rgba(0, 0, 0, 0.08);
        }

        div{
            display: flex;
            flex-direction: column;
            text-align: left;
            span{
                font-size: 12px;
                line-height: 1.333;
                &:first-child{
                    color: rgba(0, 0, 0, .6);
                }
                &:nth-child(2){
                    color: rgba(0, 0, 0, 1);
                }
            }
        }
    }
    svg{
        color: rgba(0, 0, 0, 1);
    }
`

const Item = styled.a`
    border-color: rgba(0, 0, 0, 0.6);
    text-align: left;
    padding: 12px;
    font-size: 12px;
    display: block;
    span{
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 1);
        svg{
                    color: rgba(0, 0, 0, .6);
        }
    }

    &:hover{
        background-color: rgba(0, 0, 0, 0.06);
    }
`

const CommunityCard = styled(ArtCard)`
    padding: 8px 0 0;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    text-decoration: none;

    a{
        color: #000;
        padding: 4px 12px 4px 12px;
        font-size: 12px;
    text-decoration: none;

        
        &:hover{
            color: #0a66c2;
        }

        span{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &:last-child{
            color: rgba(0, 0, 0, 0.6);
            text-decoration: none;
            border-top: 1px solid #cccccc;
            padding: 12px;
            &:hover{
                background-color: rgba(0, 0, 0, 0.08)
            }
        }
    }
`

export default LeftSide