import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislike(props) {
  const user = useSelector((state) => state.user);

  const [Likes, setLikes] = useState(0);
  const [Dislike, setDislike] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { videoId: props.videoId, userId: user.userData };
  } else {
    variable = { commentId: props.commentId, userId: user.userData };
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        // 얼마나 많은 좋아요를 받았는지
        setLikes(response.data.likes.length);

        // 내가 좋아요를 이미 눌렀는지
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Likes 정보를 가져오는데 실패하였습니다. !!');
      }
    });

    Axios.post('/api/like/getDislikes', variable).then((response) => {
      if (response.data.success) {
        // 얼마나 많은 싫어요를 받았는지
        setDislike(response.data.dislikes.length);

        // 내가 싫어요를 이미 눌렀는지
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Dislikes 정보를 가져오는데 실패하였습니다. !!');
      }
    });
  }, []);

  return (
    <div style={{ marginRight: '15px' }}>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
            onClick
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislike}</span>
      </span>
    </div>
  );
}

export default LikeDislike;
