import React from 'react'
import './ContentModal.css';
let video

function Player(props) {
    video=props.match.params.video
    console.log(video)
    return (
        <div>
          <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${video}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
        </div>
    )
}

export default Player
