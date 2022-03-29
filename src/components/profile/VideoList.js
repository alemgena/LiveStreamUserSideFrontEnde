import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { GridList, GridListTile } from '@material-ui/core'

import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import './Gried.scss'
import axios from 'axios'
import { url } from '../../utils/url'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'wrap',
  },
  image: {
    width: 300,
  },
}))

export default function TitlebarGridList() {
  const classes = useStyles()
  const [data, setData] = useState([])
  const userId = localStorage.getItem('user_id')
  React.useEffect(() => {
    getAllDatas()
  }, [])
  const getAllDatas = () => {
    axios.get(`${url}user/getUserbyVideo/${userId}`).then((response) => {
      console.log(response)
      setData(response.data.users.videoInfos)
    })
  }
  console.log(data)

  return (
    <div> 
<Row>
            {data.map((item, index) => (
              <Col key={item.video_id} xs={5} sm={4} md={4} xl={2}>
               <Link
              to={`/video/${item.video_id}`}
              style={{ textDecoration: 'none' }}
            >
                  <div className='images'>
                   <img
                src={`${url}images/${item.thumbnialFileName}`}
                alt={item.video_title.Title}
              />
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
    </div>
  )
}
/*

<Row>
            {data.map((video, index) => (
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


           <div className="grid">
      {data.length ? (
        <div>
          {data.map((item) => (
            <Link
              to={`/video/${item.video_id}`}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={`${url}images/${item.thumbnialFileName}`}
                alt={item.video_title.Title}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="headerText"></div>
      )}
    </div>
*/