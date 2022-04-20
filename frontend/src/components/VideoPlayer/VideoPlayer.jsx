import React from 'react';

const VideoPlayer = (props) => {
    return ( 
        <div>
            <div>
                <iframe title="main-player" id="ytplayer" type="text/html" width="700" height="360"
                src={`https://www.youtube.com/embed/${props.videoId}?autoplay=1`}
                frameBorder="0"></iframe>
            </div>
            <div>
                <p>{props.videoTitle}</p>
                <p>{props.videoDescription}</p>
            </div>
        </div>
     );
}

export default VideoPlayer;