import React, { useState, useRef } from "react";
import styled from "styled-components";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { FaTimes } from 'react-icons/fa'
import {IoVideocam} from 'react-icons/io5'
import {GiPhotoCamera} from 'react-icons/gi'
import {FcComments} from 'react-icons/fc'
import ReactPlayer from 'react-player'
import {useSelector, useDispatch} from 'react-redux'
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut, selectUserEmail  } from '../features/user/userSlice'
import db from "../firebase"

/*________________________________________________________________________________*/

const ModalPost = (props) => {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const userEmail = useSelector(selectUserEmail)
  const [text, setText] = useState("");
  const sharedImage = useRef();
  const [image, setImage] = useState();
  const sharedVedio = useRef();
  const [vedio, setVedio] = useState();

  let textURL = text.match(
    new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?"
    )
  );

  const reset = () => {
    setText("");
    setImage();
    setVedio();
  };

  const postArticleHandler = (e) => {
    if (e.target === e.currentTarget) {
      if (image || vedio) {
        props.uploadPost({ image, vedio, text });
      } else {
        addDoc(collection(db, "articles"), {
          user: {
            name: userName,
            title: userEmail,
            photo: userPhoto,
          },
          date: Timestamp.now(),
          sharedImage: "",
          sharedVedio: textURL ? text : "",
          description: text,
          comments: [],
          likes: [],
        });
      }
      reset();
      props.handleClick(e)
    }
  };

  return (
    <>
      {props.showModal === "open" && (
         <Container>
      <Content>
        <Header>
          <h2>Create a post</h2>
          <button
            onClick={(e) => {
              reset();
              props.handleClick(e);
            }}
          >
            <FaTimes />
          </button>
        </Header>

        <SharedContent>
          <UserInfo>
            <img
              src={userPhoto ? userPhoto : "/Images/user.svg"}
              alt="user"
            />
            <span>{userName}</span>
          </UserInfo>

          <Description>
            <textarea
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
              autoFocus={true}
              placeholder="What do you want to talk about?"
            ></textarea>
          </Description>

          <Uploads>
            {(image || vedio) && (
            //   <img
            //     onClick={() => {
            //       setImage(null);
            //       setVedio(null);
            //     }}
            //     src="/Images/close-post.svg"
            //     alt="close"
            //   />
              <FaTimes onClick={() => {
                  setImage(null);
                  setVedio(null);
                }}/>
            )}
            {image && !vedio && <img src={URL.createObjectURL(image)} alt="" />}
            {vedio && !image && (
              <ReactPlayer
                width="100%"
                url={URL.createObjectURL(vedio)}
                controls={true}
              />
            )}
            {!image && !vedio && textURL && (
              <ReactPlayer width="100%" url={text} controls={true} />
            )}
          </Uploads>

          <Actions>
            <div className="editor">
              <div className="addButtons">
                <button
                  disabled={image || vedio || textURL}
                  onClick={() => sharedImage.current.click()}
                >
                  {/* <img src="/Images/photo-icon.svg" alt="Add a pic" /> */}
                  <GiPhotoCamera />
                  <input
                    ref={sharedImage}
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </button>

                <button
                  disabled={image || vedio || textURL}
                  onClick={() => sharedVedio.current.click()}
                >
                  {/* <img src="/Images/vedio-icon.svg" alt="Add a vedio" /> */}
                  <IoVideocam />
                  <input
                    ref={sharedVedio}
                    onChange={(e) => setVedio(e.target.files[0])}
                    type="file"
                    accept="video/*"
                    hidden
                  />
                </button>

                <button disabled={image || vedio || textURL}>
                  {/* <img src="/Images/document.svg" alt="Add a document" /> */}
                  <IoVideocam />
                </button>
              </div>

              <div className="shareComment">
                <button>
                  {/* <img src="/Images/comment.svg" alt="allow comments" /> */}
                  <FcComments />
                  Anyone
                </button>
              </div>
            </div>

            <button
              disabled={text.trim() === ""}
              className="post"
              onClick={(e) => postArticleHandler(e)}
            >
              Post
            </button>
          </Actions>
        </SharedContent>
      </Content>
    </Container>
   ) }  
    </>
  );
};
export default ModalPost;

/*________________________________________________________________________________*/

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
/*_________________________________________*/
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
/*_________________________________________*/
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  h2 {
    font-weight: 600;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.8);
  }
  button {
    width: 40px;
    height: 40px;
    background-color: white;
    cursor: pointer;
    border: 0;
    border-radius: 50%;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
/*_________________________________________*/
const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  vertical-align: baseline;
  background-color: transparent;
  padding: 8px 20px;
`;
/*_________________________________________*/
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    margin-left: 5px;
  }
`;
/*_________________________________________*/
const Description = styled.div`
  padding: 12px 0;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    border: 0;
    outline: 0;
    font-size: 16px;
    margin-bottom: 20px;
    line-height: 1.5;
  }
`;
/*_________________________________________*/
const Uploads = styled.div`
  text-align: center;
  overflow-y: scroll;
  max-height: 200px;
  margin-bottom: 15px;
  position: relative;
  svg:first-child {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 24px;
    padding: 8px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    z-index: 100;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.9);
    }
  }
  img:last-child {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 98%;
  }
`;
/*_________________________________________*/
const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
    &:disabled {
      background-color: rgba(0, 0, 0, 0.08);
      color: rgba(0, 0, 0, 0.3);
      cursor: not-allowed;
    }
  }
  .editor {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-left: -6px;
    .addButtons {
      button {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        &:disabled {
          filter: contrast(0);
          background-color: transparent;
        }
      }
    }
    .shareComment {
      border-left: 1px solid rgba(0, 0, 0, 0.15);
      padding-left: 5px;
      margin-left: 10px;
      font-size: 14px;
      button {
        display: flex;
        align-items: center;
        border-radius: 16px;
        color: #666666;
        font-weight: 600;
        padding: 8px 14px;
        svg {
          width: 18px;
          margin-right: 4px;
        }
      }
    }
  }
  .post {
    background-color: #0a66c2;
    font-size: 16px;
    color: white;
    padding: 6px 16px;
    cursor: pointer;
    height: fit-content;
    border-radius: 25px;
    transition: 0.3s;
    font-weight: 600;
    &:hover {
      background-color: #004182;
      &:disabled {
        background-color: rgba(0, 0, 0, 0.08);
      }
    }
  }
`;