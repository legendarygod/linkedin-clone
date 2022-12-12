import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import Header from '../components/Header'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut, selectUserEmail  } from '../features/user/userSlice'
import {useSelector, useDispatch} from 'react-redux'
//Firebase Tools For Backeend
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
} from 'firebase/firestore'
import { storage} from '../firebase'
import db from '../firebase'
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
//routers
import { useNavigate, useParams } from 'react-router-dom'

const EditProfile = (props) => {
    const [profileDP, setProfileDP] = useState('')
    const [profileUsername, setProfileUsername] = useState("")
    const [profileTown, setProfileTown] = useState('')
    const [profileCity, setProfileCity] = useState('')
    const [profileBio, setProfileBio] = useState('')
    const [load, setLoad] = useState()

    const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail)
  const navigate = useNavigate()
  const uid = useParams()

  useEffect(() => {
        if(!userName){
            navigate('/');
            return;
        }

    }, [])
    

    const reset = () => {
    setProfileDP('')
    setProfileUsername("")
    setProfileTown("")
    setProfileBio("")
    setProfileCity("")
  };

    
    const handleDPChange = (e) => {
        const image = e.target.files[0]

        if (image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof(image)}`)
            return;
        }
        setProfileDP(image)
    }

   

   const postProfileHandler = (e) => {
        updateDoc(doc(db, "users", uid), {
            photoURL: profileDP,
            town: profileTown,
            city: profileCity,
            bio: profileBio,
        });
  };


  return (
    <>
    {props.showModal == "open" && (
        <Container>
        <Content>
            <button
            onClick={(e) => {
              reset();
              props.handleClick(e);
            }}
          >
            <FaTimes />
          </button>
        <FormGroup>
            <input type='text' placeholder='Username' onChange={(e) => {setProfileUsername(e.target.value)}} value={profileUsername}/>
        </FormGroup>
        <FormGroup>
            <input type='text' placeholder='Town' onChange={(e) => {setProfileTown(e.target.value)}} value={profileTown}/>
        </FormGroup>
        <FormGroup>
            <input type='text' placeholder='City' onChange={(e) => {setProfileCity(e.target.value)}} value={profileCity}/>
        </FormGroup>
        <FormGroup>
            <textarea  placeholder='Bio' onChange={(e) => {setProfileBio(e.target.value)}} value={profileBio}/>
        </FormGroup>
        <FormGroup>
            <input
                    type="file"
                    accept="image/*"
                    id='file' 
                    style={{
                                    display: "none"
                                }}
                    onChange={(e) => handleDPChange(e)}
            />
            <p>
                                    <label htmlFor='file'>
                                        Click to Select/Change Display Photo
                                    </label>
                                </p>
        </FormGroup>
        <Button onClick={(e) => {postProfileHandler(e)}}>Update Profile</Button>
        </Content>
       
       
    </Container>
    )}
    </>
    
    
  )
}

export default EditProfile

const Container = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.75);
  animation: fadeIn 0.3s;
`;

const Content = styled.article`
  max-width: 552px;
  max-height: 90%;
  background-color: white;
  border-radius: 5px;
  position: relative;
  top: 32px;
  margin: 0 auto;
  animation: up 0.5s ease-out;
`; 

const FormGroup = styled.div`
 padding: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    input{
        border: none;
        width: 180px;
        height: 40px;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
        border-radius: 25px;
        text-align: center;
    }

    textarea{
        width: 300px;
        height: 150px;
        resize: none;
        border: none;
        box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
        border-radius: 10px;
    }
    label{
        cursor: pointer;
        color: rgba(0, 0, 0, 0.5);
        &:hover{
            color: #000;
        }
    }
`

const Button = styled.div`
    padding: 10px;
    background-color: purple;
    border-radius: 25px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
`