import React, {useState} from 'react'
import styled from 'styled-components'
import {doc, updateDoc} from 'firebase/firestore'
import db from '../firebase'
import { TbDots } from 'react-icons/tb';
import InputEmoji from 'react-input-emoji';

const CommentBox = (props) => {
    const [text, setText] =useState("")

    const sendComment = () => {
        updateDoc(doc(db, "articles", props.postID), {
            comments: [
                {
                    name: props.userName,
                    photo:props.userPhoto,
                    email: props.userEmail,
                    text,
                },
                ...props.comments,
            ],
        });
    };
    return (

        <Container>
           <div className="input">
             <img src={props.photo} alt="user" />
             <InputEmoji
               value={text}
               onChange={setText}
               cleanOnEnter
               onEnter={sendComment}
               placeholder="Add a comment..."
             />
           </div>
           <TextBox>
           {props.comments.map((comment, id) => (
             <CommentContainer key={id}>
               <img src={comment?.photo} alt="user" />
               <div className="content">
                 <div className="header">
                   <div className="info">
                     <h6>{comment.name}</h6>
                     <span>{comment.email}</span>
                   </div>
                   <TbDots />
                 </div>
                 <p>{comment.text}</p>
               </div>
             </CommentContainer>
           ))}
           </TextBox>
         </Container>
    )
  
};
export default CommentBox;

/*________________________________________________________________________________*/

const Container = styled.div`
  padding: 5px 16px 8px;
  .input {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
`;
/* --------------------------------------- */

const TextBox = styled.div`
  position: relative;
  overflow-y: scroll;
  height: 300px;
`
/*_________________________________________*/
const CommentContainer = styled.div`
  display: flex;
  padding-top: 15px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  svg {
    width: 20px;
    height: 20px;
  }
  .content {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    background-color: #f2f2f2;
    .header {
      display: flex;
      justify-content: space-between;
      .info {
        text-align: start;
        h6 {
          font-size: 14px;
          color: rgba(0, 0, 0, 1);
          font-weight: 600;
        }
        span {
          font-size: 12px;
          display: block;
          color: rgba(0, 0, 0, 0.6);
        }
      }
      img {
        width: 1rem;
        height: fit-content;
      }
    }
    p {
      padding-top: 10px;
      text-align: start;
    }
  }
`;