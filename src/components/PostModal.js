import React, { useState } from 'react'
import styled from 'styled-components'
import { FaTimes } from 'react-icons/fa'
import {IoVideocam} from 'react-icons/io5'
import {GiPhotoCamera} from 'react-icons/gi'
import {FcComments} from 'react-icons/fc'
import ReactPlayer from 'react-player'
import {useSelector, useDispatch} from 'react-redux'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut,  } from '../features/user/userSlice'
import db from "../firebase"
import {collection, addDoc, Timestamp} from 'firebase/firestore'

const PostModal = (props) => {
    const [editorText, setEditorText] = useState('')
    const [shareImage, setShareImage] = useState('')
    const [videoLink, setVideoLink] = useState('')
    const [assetArea, setAssetArea] = useState('')

    const userName = useSelector(selectUserName)
    const userPhoto = useSelector(selectUserPhoto)

    

    const postArticlehandler = e => {
        if (e.target === e.currentTarget) {
            if (shareImage || videoLink){
                props.uploadPost({shareImage, videoLink, editorText})
            } else {
                addDoc(collection(db, "articles"))
            }
        }
    }



    const handlecChange = (e) => {
        const image = e.target.files[0]

        if (image === "" || image === undefined){
            alert(`not an image, the file is a ${typeof(image)}`)
            return;
        }
        setShareImage(image)
    }

    const switchAssetArea = area => {
        setShareImage('')
        setVideoLink('')
        setAssetArea(area)
    }

    const reset = (e) => {
        setEditorText("")
        setShareImage('')
        setVideoLink('')
        props.handleClick(e)
    }


    return (<>
            {
                props.showModal === "open" &&
                <Container>
            <Content>
                <Header>
                    <h2>Create a Post</h2>
                    <button onClick={(e) => reset(e)}>
                        <FaTimes />
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        {userPhoto ? (
                            <img src={userPhoto} alt='dp'/>
                            ): (    
                             <img src='/images/user.svg' alt='pic' />
                        )}
                        {userName ? (
                           <>
                            {userName}
                           </> 
                        ): ('Name')}
                    </UserInfo>
                    <Editor>
                    <textarea 
                        value={editorText} 
                        onChange={(e) => setEditorText(e.target.value)}
                        placeholder="what's on your mind?"
                        autoFocus={true}
                    />
                
                        { assetArea === 'image' ? (
                            <UploadImage>
                                <input type='file' accept='image/gif, image/jpeg, image/jpg, iamge/png, image/webp'name='image' id='file' style={{
                                    display: "none"
                                }} onChange={handlecChange}/>
                                <p>
                                    <label htmlFor='file'>
                                        Select An image to share
                                    </label>
                                </p>
                            {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                            </UploadImage>)
                            :
                            assetArea === 'media' && (
                            <>
                                <input type="text"
                                    placeholder='Input Video Link'
                                    value={videoLink}
                                    onChange={(e)=> setVideoLink(e.target.value)}
                                />
                                {videoLink && <ReactPlayer width={'100%'} url={videoLink} controls={true}/>}
                            </>)
                        }

                    </Editor>
                </SharedContent>
                <SharedCreation>
                    <AttachAssets>
                        <AssetButton onClick={() => setAssetArea('image')}>
                            <GiPhotoCamera />
                        </AssetButton>
                        <AssetButton onClick={() => setAssetArea('media')}>
                            <IoVideocam />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComments>
                        <AssetButton>
                            <FcComments />
                            Anyone
                        </AssetButton>
                    </ShareComments>

                    <PostButton disabled={!editorText ? true : false}>Post</PostButton>

                </SharedCreation>
            </Content>
        </Container>
        }
        </>      
        )
            
}

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999999;
    background-color: rgba(0, 0, 0, 0.8);
    color: #000;
    animation: fadeIn 0.3s;
`

const Content = styled.div`
    width: 100%;
    max-width: 552px;
    background-color: #fff;
    max-height: 90%;
    overflow: initial;
    border-radius: 5px;
    position: relative;
    display: flex;
    flex-direction: column;
    top: 32px;
    margin: 0 auto;
`

const Header = styled.div`
    display: block;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
    font-weight: 400;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        height: 40px;
        width: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.15);
        svg, img{
            pointer-events: none;
        }
    }
    `

    const SharedContent = styled.div`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow: auto;
        vertical-align: baseline;
        background: transparent;
        padding: 8px 12px;
    `

    const UserInfo = styled.div`
        display: flex;
        align-items: center;
        padding: 12px 24px;
        svg, img{
            width: 40px;
            height: 40px;
            background-clip: content-box;
            border: 2px solid transparent;
            border-radius: 50%;
        }
        span{
            font-weight: 600;
            font-size: 16px;
            line-height: 1.5;
            margin-left: 5px;
        }
    `

    const SharedCreation = styled.div`
        display: flex;
        justify-content: space-between;
        padding: 12px 24px 12px 16px;
    `

    const AssetButton = styled.button`
        display: flex;
        align-items: center;
        height: 40px;
        min-width: auto;
        color: rgba(0, 0, 0, 0.5);
        svg{
            width: 40px;
        }
    `
    const AttachAssets = styled.div`
        align-items: center;
        display: flex;
        padding-right: 8px;
        ${AssetButton}{
            width: 40px;
        }
    `


    const ShareComments = styled.div`
        padding-left: 8px;
        margin-right: auto;
        border-left: 1px solid rgba(0, 0, 0, 0.15);
        ${AssetButton}{
            margin-right: 5px;
        }
    `

    const PostButton = styled.button`
        min-width: 60px;
        border-radius: 20px;
        padding-left: 16px;
        padding-right: 16px;
        background-color: ${props => (props.disabled ? "rgba(0, 0, 0, 0.15)" : "#0a66c2")};
        border: none;
        color: #fff;
        &:hover{
            background: ${props => (props.disabled ? "rgba(0, 0, 0, 0.15)" : "#004182")};
        }
    `

    const Editor = styled.div`
        padding: 12px 24px;
        textarea{
            width: 100%;
            min-height: 100px;
            resize: none;
        }

        input{
            width: 100%;
            height: 35px;
            font-size: 16px;
            margin-bottom: 20px;
        }
    `
    const UploadImage = styled.div`
        text-align: center;
        img{
            width: 100%;
        }
    `


export default PostModal
