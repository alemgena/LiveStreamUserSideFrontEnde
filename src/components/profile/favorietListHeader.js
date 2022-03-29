import { Col, Row } from 'react-bootstrap';
import React,{useState} from 'react'
import axios from 'axios'
import { url } from '../../utils/url';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import './favorietList.scss'
const FavoriteHeader = () => {
    const[data,setData]=useState([]);
    const user = useSelector((state) => state.login.loggedUser);
  React.useEffect(() => {
        getAllDatas();
      }, []);
      const getAllDatas = () => {
        axios.get(`${url}user/getFavorietList/${user.id}`).then((response) => {
          console.log(response.data.data);
          setData(response.data.data);
        });
      };
  return (
    <div className='cart-list-header'>
        <div>Your favoriet list</div>
      {data.length &&
       <div className='products'>
      <div style={{marginLeft:"60px", display:"flex"}}>
          {data.map((iteam,index)=>(
    <Row>
    <Col  key={index} xs={6} sm={4} md={4} xl={3}>
        
    {iteam.videoInfo.thumbnialFileName ? (
        <div    className='list'>
                    <img 
                 
                    width ='100px'
                    margin-right= '1em'
                    height='auto'
                      src={`${url}images/${iteam.videoInfo.thumbnialFileName}`}
                      alt='hello'
                    />
                    </div>
                  ) : (
                    <Skeleton height='150px' />
                  )}
                  <div>
                  {iteam.videoInfo.video_title.Title}  
                  </div>
    </Col>
  
</Row>
          ))}
     
      </div>
      </div>
      }
  
  
    </div>
  );
};
export default FavoriteHeader;
