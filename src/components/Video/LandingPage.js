/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import './fragment.css'
import { Card, Typography, Avatar } from 'antd'
import axios from 'axios'
import Table from '@mui/material/Table';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import TableContainer from '@mui/material/TableContainer';
import { url } from '../../utils/url'
import Paper from '@mui/material/Paper';
import Loading from '../loading/Loding'
import './step.scss'
import SeriousRes from './SeriousRes'
//import NoData from './2953962.jpg'
import MoviesRes from './MovieSlide'
import TradingRes from './Trading'
import LandingTwo from './Carousel'
import { makeStyles } from '@material-ui/core/styles'
import DataArrayIcon from '@mui/icons-material/DataArray';
import NodData from './noData'
const useStyles = makeStyles((theme) => ({

}))
const { Title } = Typography

//http://localhost:9000/public/image/image_1628252389021.jpg

const LandingPage = () => {
  const [loading, setLoading] = useState(true)

  const [videos, setVideos] = useState([])

  useEffect(() => {
    //fetchMovies()
 
    axios.get(`${url}video/getAllVideo`).then((response) => {
      if (response) {
        console.log(response.data.video)
        setVideos(response.data.video)
        setLoading(false)
      } else {
        console.log('field to get the video data')
      }
    })
  }, [])

  return (
    <div>
      <div>
        <Title className="recomended" style={{ color: 'white' }} level={1}>
          Recommended
        </Title>
        <div>
          {' '}
          {loading ? (
            <div  className="recomended">
              <Loading />
            </div>
          ) : (
            <div className="recomended">
              {videos.length===0?
              <div>
   <NodData/>    
              </div>:
              <LandingTwo />
}
            </div>
          )}
        </div>
        <div className="recomended">
          <Title style={{ color: 'white' }} level={1}>
            Treading
          </Title>
          <div>
            {loading? (
              <div>
                <Loading />
              </div>
            ) : (
              <TradingRes />
            )}
          </div>
          <Title style={{ color: 'white' }} level={1}>
            Movies
          </Title>
          <div>
            {loading? (
              <div>
                <Loading />
              </div>
            ) : (
              <MoviesRes />
            )}
          </div>
          <Title style={{ color: 'white' }} level={1}>
            Tv Series
          </Title>
          <div>
            {loading? (
              <div>
                <Loading />
              </div>
            ) : (
              <SeriousRes />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default LandingPage
