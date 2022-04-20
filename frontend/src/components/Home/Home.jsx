import React, { useEffect } from "react";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import Comment from "../Comment/Comment";
import { Container, Row, Col } from "react-bootstrap";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const Home = (props) => {

  useEffect(() => {
    console.log("Props being sent from app.js to Home.js",
      'User: ', props.user,
      'username of user: ', props.user.username,
    'videoId: ', props.videoId)
  },[])
  return (
    <div>
      
      <VideoPlayer videoId={props.videoId} />
      <RelatedVideos videoId={props.videoId} />
      <Comment
              user={props.user}
              videoId={props.videoId}
              storedUserName={props.storedUserName}
      />
      
      
      {/* <Container>
        <Row>
          <Col className="col-3">
            1 of 2
            <RelatedVideos
              listRelatedVideos={props.listRelatedVideos}
              setVideoId={props.setVideoId}
              videoId={props.videoId}
            />
          </Col>
          <Col md={9}>
            2 of 2 */}
            
            {/* <CommentForm
              user={props.user}
              videoId={props.videoId}
              setUser={props.setUser}
            /> */}
            
          {/* </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default Home;