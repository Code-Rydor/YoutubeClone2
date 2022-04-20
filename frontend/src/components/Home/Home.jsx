import React, { useEffect } from "react";
import RelatedVideos from "../RelatedVideos/RelatedVideos";
import Comment from "../Comment/Comment";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import SearchBar from "../SearchBar/SearchBar";

const Home = (props) => {

  useEffect(() => {
    console.log("Props being sent from app.js to Home.js",
      'User: ', props.user,
      'username of user: ', props.user.username,
      'videoId: ', props.videoId)
  }, [])
  
  return (
    <div>
      <SearchBar getVideo={props.getVideo} />
      <VideoPlayer videoId={props.videoId}
        videoDescription={props.videoDescription}
        videoTitle={props.videoTitle} />
      <RelatedVideos videoId={props.videoId}
        setVideoId={props.setVideoId} />
      <Comment
              user={props.user}
              videoId={props.videoId}
              storedUserName={props.storedUserName} />
    </div>
  );
};

export default Home;