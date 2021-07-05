import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
  const user = useSelector((state) => state.user);

  const [CommentValue, setCommentValue] = useState('');

  const handleClick = (event) => {
    setCommentValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const commentVariable = {
      content: CommentValue,
      // 로그인된 유저의 정보를 Redux를 통해 가져온다.
      writer: user.userData._id,
      videoId: props.videoId,
    };

    Axios.post('/api/comment/saveComment', commentVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        props.refreshFunction(response.data.result);
      } else {
        alert('코멘트를 저장하지 못했습니다. !!');
      }
    });

    setCommentValue('');
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <SingleComment
                key={index}
                refreshFunction={props.refreshFunction}
                comment={comment}
                videoId={props.videoId}
              />
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해주세요!!"
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Comment;
