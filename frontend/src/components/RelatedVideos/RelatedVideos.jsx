import React, { useEffect, useState } from "react";
import axios from "axios";
import "../RelatedVideos/RelatedVideos.css";

const RelatedVideos = (props) => {
  const [listRelatedVideos, setListRelatedVideos] = useState([]);
  const APIKEY = "AIzaSyCGCESY1CjRJSKHwX_ju4zfz0klFjmzipw"

  async function getRelatedVideos() {
    console.log("Called successfully");
    if (props.videoId) {
      let response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${props.videoId}&type=video&key=${APIKEY}&part=snippet`);
      setListRelatedVideos(response.data.items);
      console.log("video list", listRelatedVideos);
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
          else return (
            <h1>Loading...</h1>
       )
        })}
      </ul>
    </div>
  );
};

export default RelatedVideos;