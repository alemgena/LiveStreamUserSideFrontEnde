import React,{useEffect,useState} from "react";

import NoData from './noData'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import './newe.css'
import { url } from '../../utils/url'
import axios from 'axios'
import { Link } from "react-router-dom";
export default function MoviesVideo() {
      const [videos, setVideos] = useState([])
      useEffect(() => {
  const route="Movies"
 axios.get(`${url}user/getVideoByCategoriey/${route}`).then((response) => {
      if (response) {
        console.log(response.data.data)
        // console.log(response.data.success.thumbnialFilePath);
        setVideos(response.data.data)
      }
    })
  }, [])
  const renderItems = videos.map((img) => {
    return (
    <div>
         <Link
                  to={`/video/${img.video_id}`}
                  style={{ textDecoration: 'none' }}
                >
        <div className="div-image">
        
          <img className="image" src={`${url}/images/${img.thumbnialFileName}`} alt="" />
          
      </div>
      </Link>
      </div>
    );
  });

  return (
    <div>
       {videos.length===0?
      <div>
<NoData/>
      </div>:
    <div className="container-carousel">
      <div className="carousel-content">
        <Carousel
        className="carousel"
          centerMode
          showStatus={false}
          dynamicHeight={false}
          
          swipeScrollTolerance={50}
          centerSlidePercentage={50}
          showThumbs={false}
      
       
        >
          {renderItems}
        </Carousel>
      </div>
    </div>
}
    </div>
  );
}
