import React from 'react'
import './Gried.scss'
import { url } from '../../utils/url'
import axios from 'axios'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function NeweFavorietList() {
  const [data, setData] = React.useState([])
  const userId = localStorage.getItem('user_id')
  React.useEffect(() => {
    getAllDatas()
  }, [])
  const getAllDatas = () => {
    axios.get(`${url}user/getFavorietList/${userId}`).then((response) => {
      console.log(response.data.data)
      setData(response.data.data)
    })
  }
  return (
    <div>
<Row>
            {data.map((item, index) => (
              <Col key={item.video_id} xs={5} sm={4} md={4} xl={2}>
            <Link
              to={`/video/${item.videoInfo.video_id}`}
              style={{ textDecoration: 'none' }}
            >
            <div className='images'>
                 <img
         src={`${url}images/${item.videoInfo.thumbnialFileName}`}
                alt="name"
              />
                  </div>
            </Link>
              </Col>
            ))}
          </Row>
    </div>
  )
}

export default NeweFavorietList
/*
<div className="grid">
      {data.length ? (
        <div>
          {data.map((item) => (
            <Link
              to={`/video/${item.videoInfo.video_id}`}
              style={{ textDecoration: 'none' }}
            >
              <img
                src={`${url}images/${item.videoInfo.thumbnialFileName}`}
                alt={item.videoInfo.video_title.Title}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="headerText"></div>
      )}
    </div>

*/