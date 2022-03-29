/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import axios from 'axios'
import { img_300, unavailable } from '../../config/config'
import './step.scss'
import { url } from '../../utils/url'
function MovieSlideRes() {
  const [content, setContent] = useState([])
  const [content1, setContent1] = useState([])
  const [content2, setContent2] = useState([])
  const [content3, setContent3] = useState([])
  const [content4, setContent4] = useState([])
  const [content5, setContent5] = useState([])
  const [content6, setContent6] = useState([])
  const [content7, setContent7] = useState([])
  const [content8, setContent8] = useState([])
  const [content9, setContent9] = useState([])
  const [content10, setContent10] = useState([])
  const [content11, setContent11] = useState([])
  const [content12, setContent12] = useState([])
  const [content13, setContent13] = useState([])
  const [content14, setContent14] = useState([])
  const [page, setPage] = useState(1)
      const route="Movies"
  const[dataMovies,setData]=React.useState([])
    const [loadingT, setLoadingT] = React.useState(false);
  const moviesVideos=()=>{
    axios.get(`${url}user/getVideoByCategoriey/${route}`).then(responce=>{
  setLoadingT(false)
    console.log(responce)
    setData(responce.data.data)
})
  }
  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=enUS&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`,
    )
    console.log(data)
    setContent(data.results)
    setContent(data.results[0])
    setContent1(data.results[1])
    setContent2(data.results[2])
    setContent3(data.results[3])
    setContent4(data.results[4])
    setContent5(data.results[5])
    setContent6(data.results[6])
    setContent7(data.results[7])
    setContent8(data.results[8])
    setContent9(data.results[9])
    setContent10(data.results[10])
    setContent11(data.results[11])
    setContent12(data.results[12])
    setContent13(data.results[13])
    setContent14(data.results[14])
  }
  useEffect(() => {
    moviesVideos()
    //window.scroll(0, 0);
    fetchMovies()
    // eslint-disable-next-line
  }, [page])
  return (
    <div>
      <Carousel   controls={false} className="carousel" interval={null}>
        <Carousel.Item className="item">
          <img src={`${img_300}${content.poster_path}`} />
          <img src={`${img_300}${content3.poster_path}`} />
      
        </Carousel.Item>
        <Carousel.Item  className="item">
          <img src={`${img_300}${content5.poster_path}`} />
          <img src={`${img_300}${content7.poster_path}`} />
       
        </Carousel.Item>
              <Carousel.Item className="item">
          <img src={`${img_300}${content8.poster_path}`} />
          <img src={`${img_300}${content9.poster_path}`} />
       
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default MovieSlideRes
