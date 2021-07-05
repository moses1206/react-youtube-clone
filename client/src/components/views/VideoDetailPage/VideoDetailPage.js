import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, List, Avatar } from 'antd';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comment from './Section/Comment';

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;

  const [VideoDetail, setVideoDetail] = useState([]);
  const [Comments, setComments] = useState([]);
  const videoVariable = { videoId: videoId };

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.videoDetail);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오는데 실패하였습니다. !!');
      }
    });

    Axios.post('/api/comment/getComments', videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.videoDetail);
        setComments(response.data.comments);
      } else {
        alert('코멘트 정보를 가져오는데 실패하였습니다. !!');
      }
    });
  }, []);

  if (VideoDetail.writer) {
    const SubscribeButton = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem('userId')}
      />
    );

    const refreshFunction = (newComment) => {
      setComments(Comments.concat(newComment));
    };

    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <video
              style={{ width: '100%' }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
              controls
            ></video>
            <List.Item actions={[SubscribeButton]}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={VideoDetail.writer && VideoDetail.writer.image}
                  />
                }
                title={VideoDetail.title}
                description={VideoDetail.description}
              />
            </List.Item>
            <Comment
              refreshFunction={refreshFunction}
              commentLists={Comments}
              videoId={videoId}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>...Loading</div>;
  }
}

export default VideoDetailPage;
