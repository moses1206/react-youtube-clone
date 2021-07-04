import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Row, Col, List, Avatar } from 'antd';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';

function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState([]);

  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  useEffect(() => {
    Axios.post('/api/video/getVideoDetail', variable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
        console.log(response.data.videoDetail);
      } else {
        alert('비디오 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  if (VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <video
              controls
              style={{ width: '100%' }}
              src={`http://localhost:5000/${VideoDetail.filePath}`}
            />
            <List.Item
              actions={[
                <Subscribe
                  userTo={VideoDetail.writer._id}
                  userFrom={localStorage.getItem('userId')}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>
            {/* Comments */}
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