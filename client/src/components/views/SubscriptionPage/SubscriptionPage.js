import React, { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { Row, Card, Icon, Avatar, Typography, Col } from 'antd';
import Axios from 'axios';

import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function SubscriptionPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    const subscriptionVariable = {
      // 첫번째로 내가 구독하는 사람의 아이디를 찾고
      userFrom: localStorage.getItem('userId'),
      // 그사람의 아이디로 작성된 비디오를 찾을 수 있다.
    };

    Axios.post('/api/video/getSubscriptionVideos', subscriptionVariable).then(
      (response) => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert('비디오 가져오기를 실패했습니다.');
        }
      }
    );
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <a href={`/video/${video._id}`}>
          <div style={{ position: 'relative' }}>
            <img
              style={{ width: '100%' }}
              src={`http://localhost:5000/${video.thumbnail}`}
            />
            <div className="duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
          //   description={video.description}
        />
        <span>{video.writer.name}</span>
        <br />
        <span style={{ marginLeft: '3rem' }}>{video.views} views </span>
        <span>{moment(video.createdAt).format('YY-MM-DD HH:mm')}</span>
      </Col>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2}> Subscribed Videos </Title>
      <hr />

      <Row gutter={16}>{renderCards}</Row>
    </div>
  );
}

export default SubscriptionPage;
