import React, { useEffect, useState } from 'react'
import { FaCode } from 'react-icons/fa'
import './fragment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Card, Typography, Avatar } from 'antd'
import axios from 'axios'

import { url } from '../../utils/url'
import { url2 } from '../../utils/url'
import { cartSlice } from '../../slices/cart'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import MessageBox from './VideoUploadStep/MessageBox'
import { imageVideoUrl } from '../../utils/url'
import {
  useMediaQuery,
  AppBar,
  useTheme,
  Tab,
  Tabs,
  Toolbar,
} from '@material-ui/core'
import Loading from '../loading/Loding'
import './step.scss'
import CategorieList from './CategorieList'
const { Meta } = Card
const { Title } = Typography

//http://localhost:9000/public/image/image_1628252389021.jpg

const LandingPage = () => {
  const user = useSelector((state) => state.login.loggedUser)
  const cartActions = cartSlice.actions
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  //const username = user.userName;
  const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />
  const [videos, setVideos] = useState([])
  useEffect(() => {
    setLoading(true)
    axios.get(`${url}video/getAllVideo`).then((response) => {
      if (response) {
        console.log(response.data.video)
        // console.log(response.data.success.thumbnialFilePath);
        setVideos(response.data.video)
      } else {
        console.log('field to get the video data')
      }
    })
  }, [])
  console.log(videos.video_id)
  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <div>
   
        <div>
        
          
          <Title className="recomended" style={{ color: 'white' }} level={1}>
            Recommended
          </Title>
<div>   {loading && videos.length === 0 ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="recomended">
          <Row>
            {videos.map((video, index) => (
              <Col key={video.video_id} xs={5} sm={4} md={4} xl={3}>
                <Link
                  to={`/video/${video.video_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="images">
                    <img
                      alt="hello"
                      src={`${url}/images/${video.thumbnialFileName}`}
                    ></img>
                  </div>
                  <div style={{ textAlign: 'center' }} className="text-team">
                    {video.video_title.Title}
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
          </div>
             )}
          </div>
        </div>
   
    </div>
  )
}
export default LandingPage
