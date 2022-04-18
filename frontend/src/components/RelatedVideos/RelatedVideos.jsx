import React, { useEffect, useState } from "react";
import axios from "axios";
import "../RelatedVideos/RelatedVideos.css";

const RelatedVideos = (props) => {
  const [listRelatedVideos, setListRelatedVideos] = useState([]);
  const APIKEY = "AIzaSyBX7Unp0G6opzW7hJ3wWBp85ysQaslVrsI"

  async function getRelatedVideos(some_video_id) {
    console.log("Called successfully");
    if (props.videoId) {
      let response = await axios.get(
        `www.googleapis.com/youtube/v3/search?relatedToVideoId={${some_video_id}}&type=video&key={${APIKEY}}`
      );
      setListRelatedVideos(response.data.items);
      console.log("video list", response.data.items);
    } else {
      console.log("video ID");
    }
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getRelatedVideos();
    }
    return () => (mounted = false);
  }, [props.videoId]);

  function handleSubmit(videoId) {
    console.log(videoId);
    props.setVideoId(videoId);
  }

  return (
    <div>
      <ul>
        {listRelatedVideos.map((video, index) => {
          if (video.snippet) {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSubmit(video.id.videoId)}
                >
                  <img
                    src={video.snippet.thumbnails.default.url}
                    alt="thumbnails"
                  ></img>
                </button>
              </li>
            );
          }
          else return null
        })}
      </ul>
    </div>
  );
};

export default RelatedVideos;