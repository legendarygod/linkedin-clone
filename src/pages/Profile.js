import React, {useEffect, useState} from 'react'
//styling
import styled from 'styled-components'
//router
import { Link, useParams } from 'react-router-dom'
//icons
import {TbDots, TbSend} from 'react-icons/tb'
import {AiOutlineComment, AiOutlineShareAlt} from 'react-icons/ai'
//reducers
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut, selectUserEmail  } from '../features/user/userSlice'
//redux
import {useSelector, useDispatch} from 'react-redux'
//router
import { useNavigate } from 'react-router-dom'
//Firebase Tools For Backeend
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
import { auth, storage} from '../firebase'
import db from '../firebase'

import { useAuthState } from "react-firebase-hooks/auth";
import ProfileModal from '../components/ProfileModal'






const Profile = () => {

  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail)
    const [user, loading, error] = useAuthState(auth);
    const {uid} = useParams()
    const [userProfile, setUserProfile] = useState({})
    const [showModal, setShowModal] = useState('close')


  const navigate = useNavigate()

  const fetchUserProfile = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log(data)
          setUserProfile(data)
          
        } catch (err) {
          console.error(err);
        }
      };

    useEffect(() => {
        console.log(uid)
  console.log(userProfile);

    if (loading) return;
    if (!user) return navigate("/");
    fetchUserProfile();
  }, [user, loading]);

  console.log(userProfile);
  const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget){
            return;
        }
        switch(showModal){
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }

    }

    
  return (
<Container>
    <Head>
        User Profile(Full Profile Functionality coming soon)

        <Link to='/home'>Back To Home</Link>
    </Head>
    <ProfileInfo>
        <CoverPhoto>
            <DisplayPhoto>
                <img src={userProfile ? userProfile.photoURL : "/images/user.svg"} alt='pic' />
            </DisplayPhoto>
        </CoverPhoto>
        <ActionBar>
            <ActionBtn>
                {user.uid === uid ? (
                    <>
                     <button onClick = {handleClick}>
                        Edit Profile
                     </button>      
                    </>

                ) : (
                    <>
                   <button>
                    <img src='/images/nav-messaging.svg' alt='pic' />

                </button>
                <button>
                    Follow
                </button>
                </>
            )}


            </ActionBtn>
        </ActionBar>
        <UserDetail>
            <User>

            <h2>{userProfile ? userProfile.name : ""}</h2>
            <span>{userProfile ? userProfile.name : ""}</span>
            </User>
            <FollowCount>
                <div>
                    <Link to='/profile'>{userProfile.followers ? userProfile.followers.length : 0}</Link>
                    <span>Followers</span>
                </div>
                <div>
                    <Link to='/profile'>{userProfile.following ? userProfile.following.length : 0}</Link>
                    <span>Following</span>
                </div>
            </FollowCount>
        </UserDetail>
        <Bio>
            <BioText>{userProfile ? userProfile.bio : ""}</BioText>
            <BioCity>{userProfile ? `${userProfile.town}, ${userProfile.city}` : ""}</BioCity>
        </Bio>

    </ProfileInfo>
    <Posts>
        
                    <Article >
                             <SharedActor>
                    <Link to='/home'>
                        <img src='/images/user.svg' alt='pic' />
                        <div>
                            <span>Name</span>
                            <span>title</span>
                            <span>date</span>
                        </div>
                        <button>
                            <TbDots />
                        </button>
                    </Link>
                </SharedActor>
                <Description>This is a desc</Description>
                <SharedImage>
                    <Link to='/home'>
                        <img src='images/space1.jpg' alt='pic' />
                    </Link>
                </SharedImage>
                <SocialCounts>
                    <li>
                        <button>
                            {/* {post.likes.length > 0 && <img src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt='likes'/>} */}
                            {/* <AiOutlineComment />
                            <AiOutlineShareAlt />
                            <AiFillForward />
                            <TbSend /> */}
                            <span>0</span>
                        </button>
                    </li>
                    <li>
                        <Link to='/home'>
                            <p> 0 comments
                            </p>
                        </Link>
                    </li>
                </SocialCounts>
                <SocialActions>
                    <button 
                    >
                        {/* {
                            liked ? <AiFillLike /> : <AiOutlineLike /> 
                        } */}
                        <span>Like</span>
                    </button>
                    <button>
                        <AiOutlineComment />
                        <span>Comment</span>
                    </button>
                    <button>
                        <AiOutlineShareAlt />
                        <span>Share</span>
                    </button>
                    <button>
                    <TbSend />
                    <span>Send</span>
                    </button>
                </SocialActions>
                {/* {showComments.includes(id) && (
                    <CommentBox 
                        photo={userPhoto}
                        comments={post.comments}
                        userName={userName}
                        userPhoto={userPhoto}
                        userEmail={userEmail}                        
                        postID={postID}
                    />
                )} */}
                
                </Article>
    </Posts>
    <ProfileModal showModal={showModal} handleClick={handleClick} />
</Container>
  )
}

export default Profile

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    width: 80%;
    flex-direction: column;
    @media (max-width: 768px){
        width: 100%;
    }
`

const Head = styled.div`
    height: 70px;
`

const ProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
`

const Posts = styled.div`
padding: 15px;

`

const CoverPhoto = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DisplayPhoto = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    bottom: -20%;
    left: 10%;
    z-index: 200;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`

const ActionBar = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const ActionBtn = styled.div`
    width: 150px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    button{
        border: 1px solid rgba(0, 0, 0, 0.6);
        padding: 5px 10px;
        &:last-child{
            border-radius: 25px;
        }
        &:first-child{
            border-radius: 50%;
        }
    }
`

const FollowCount = styled.div`
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a{
        margin-right: 3px;
    }

    span{
        font-weight: 600;
    }
`

const UserDetail = styled.div`
    padding: 0 20px;
`

const User = styled.div`
    margin-bottom: 20px;
`

const Bio = styled.div`
    padding: 10px;
`

const BioText = styled.span`
    font-weight: 500;
`

const BioCity = styled.p``

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
    `

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;

`

const SharedActor = styled.div`
    padding-right: 40px;
    flex-wrap: nowrap;
    padding: 12px 16px 0;
    margin-bottom: 8px;
    align-items: center;
    display: flex;
    a{
        margin-right: 12px;
        flex-grow: 1;
        overflow: hidden;
        display: flex;
        text-decoration: none;

        img{
            width: 48px;
            height: 48px;
        }
        & > div{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            span{
                text-align: left;
                &:first-child{
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0, 1);
                }
                &:nth-child(n + 1){
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6)
                }
            }
        }
    }
    button{
        position: absolute;
        right: 12px;
        top: 0;
        background: transparent;
        border: none;
        outline: none;
    }
`

const Description = styled.div`
    padding: 0 16px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.9);
    font-size: 14px;
    text-align: left;
`

const SharedImage = styled.div`
    margin-top: 8px;
    width: 100%;
    display: block;
    position: relative;
    background-color: #f5fafb;
    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
`

const SocialCounts = styled.ul`
    line-height: 1.3;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    margin: 0 16px;
    padding: 8px 0;
    border-bottom: 2px solid #e9e5df;    
    list-style: none;

    li{
        margin-right: 5px;
        font-size: 12px;
        button{
            display: flex;
            outline: none;
            border: none;
            background: transparent;
        }
    }
    
`

const SocialActions = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-start;
    margin: 0;
    min-height: 48px;
    padding: 4px 8px;
    button{
        display: inline-flex;
        align-items: center;
        padding: 8px;
        color: #0a66c2;
        outline: none;
        border: none;
        cursor: pointer;
        background: none;

        &:hover{
            span{
                text-decoration: underline;
            }
        }

        @media (min-width: 768px){
            span{
                margin-left: 8px;
            }
        }
    }
`