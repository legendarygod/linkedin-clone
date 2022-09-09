import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
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
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const [profileCover, setProfileCover] = useState()
    const [profileDP, setProfileDP] = useState()
    const [profileUsername, setProfileUsername] = useState("")
    const [profileTown, setProfileTown] = useState('')
    const [profileCity, setProfileCity] = useState('')
    const [profileBio, setProfileBio] = useState('')
    const [load, setLoad] = useState()

    const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail)
  const navigate = useNavigate()

  useEffect(() => {
        if(!userName){
            navigate('/');
            return;
        }

    }, [])
    



    const handlecChange = (e) => {
        const image = e.target.files[0]

        if (image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof(image)}`)
            return;
        }
        setProfileCover(image)
    }
    const handleDPChange = (e) => {
        const image = e.target.files[0]

        if (image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof(image)}`)
            return;
        }
        setProfileDP(image)
    }

    const uploadProfile = useCallback(
    (profile) => {
      // Upload File.
      const storageRef = ref(
        storage,
        profile.profileDP && `images/${profile.profileDP.name}`
      );
      const upload = uploadBytesResumable(
        storageRef,
        profile.profileDP && profile.profileDP
      );

      // Listen for state changes, errors, and completion.
      upload.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setLoad(progress);
          if (snapshot.state === "RUNNING") {
            setLoad(progress);
          }
        },
        (error) => {
          console.log(error.code);
        },
        async () => {
          const url = await getDownloadURL(upload.snapshot.ref);
          // Add to DataBase
          await addDoc(collection(db, "userProfile"), {
            user: {
              name: userName,
              title: userEmail,
              photo: userPhoto,
            },
            date: Timestamp.now(),
            profilePicture: profile.profileDP ? url : "",
            town: profile.profileTown,
            city: profile.profileCity,
            bio: profile.profileBio,
            username: profile.profileUsername,
            followers: [],
            following: [],
          });
          setLoad();
        }
      );
    },
    [userName, userEmail, userPhoto]
  );

   const postProfileHandler = (e) => {
    if (e.target === e.currentTarget) {
        try {
            if (profileDP) {
        uploadProfile({ profileDP, profileBio, profileCity, profileTown, profileUsername });
      } else {
        addDoc(collection(db, "userProfile"), {
          user: {
            name: userName,
            title: userEmail,
            photo: userPhoto,
          },
          date: Timestamp.now(),
            profilePicture: "",
            town: profileTown,
            city: profileCity,
            bio: profileBio,
            username: profileUsername,
            followers: [],
            following: [],
        });
      }
      navigate('/profile')
        } catch (error) {
            console.log(error)
        }
    }
  };


  return (
    <>
    {/* <Header /> */}
    <Container>
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
        <FormGroup>
            <input
                    type="file"
                    accept="image/*"
                    id='fileCover' 
                    style={{
                                    display: "none"
                                }}
                    onChange={(e) => handlecChange(e)}
            />
            <p>
                                    <label htmlFor='file'>
                                        Click To Select/Change Cover Image
                                    </label>
                                </p>
        </FormGroup>
        <Button onClick={(e) => {postProfileHandler(e)}}>Update Profile</Button>
    </Container>
    </>
    
  )
}

export default EditProfile

const Container = styled.div`
    width: 450px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

`
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