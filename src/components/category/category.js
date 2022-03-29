import React from 'react'
import {url} from '../../utils/url'
import {imageVideoUrl} from '../../utils/url'
import axios from 'axios'
import { Col, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from '../../components/LoadingBox'
import CategoryNotFound from '../../components/utils/categoreyNotFound'
const Category = (props) => {
  const location = props.location.pathname;
  const route = location.substring(location.lastIndexOf("/") + 1);
    const[data,setData]=React.useState([])
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
setLoading(true)
axios.get(`${url}user/getVideoByCategoriey/${route}`).then(responce=>{
  setLoading(false)
    console.log(responce)
    setData(responce.data.data)
})
    },[])
    console.log(data)

    return (
      <div>
        
{loading ? (
        <Loading style={{ padding: "8em" }} />
      ):
        <div className='products'>

 <Row>
    {data.length!==0 ? (
      <div>
      
  {data.map((video,index)=>{
    return(
      <Col key={index} xs={6} sm={4} md={4} xl={3}>
      <Link to={`/video/${video.video_id}`} style={{ textDecoration: 'none'}}>
      <div className='images'>
      <img             
             style={{
               display:"flex",
              width: '200px',
              height: '200px',  
            }}
        alt='hello'
        src={`${url}images/${video.thumbnialFileName}`}
      ></img>
      </div>
     
      </Link>
      </Col>
    )
  })} </div>
 )
 :(
  <CategoryNotFound name={route}/>

  )}
  </Row>
</div>
}
</div>
    )
}

export default Category
