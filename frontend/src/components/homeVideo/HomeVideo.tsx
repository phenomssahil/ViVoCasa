import React from 'react'
// import arrow from "../../assets/arrow1.png"
import hvideo from "../../assets/production_id_3770017 (1080p).mp4"
import vvideo from "../../assets/pexels-vertical-max-vakhtbovych-7239168 (2160p).mp4"
import "./HomeVideo.css"

const Video:React.FC = () => {
  return (
    <div id="video-container">
        <video className="horizontal-video" autoPlay loop muted>
             <source src={hvideo}/>
        </video>
        <video className="vertical-video" autoPlay loop muted>
          <source src={vvideo}/>
        </video>
    </div>
  )
}

export default Video