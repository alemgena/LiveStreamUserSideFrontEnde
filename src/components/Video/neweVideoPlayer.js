import axios from 'axios';

import React, { Component, useEffect, useState } from 'react';
import { url } from '../../utils/url';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import './fragment.css';
import Moment from 'react-moment';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { Row, Col, Container } from 'react-bootstrap';
import SideBar from './SideBar';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import { cartSlice } from '../../slices/cart';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import Comment from './comment2'
import { userLogin } from 'ra-core';
const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      marginLeft: '30px',
    },
    closeButton: {
      color:"white",
      "&:hover": { backgroundColor: "yellow" },
    //  "&:focus": { backgroundColor: "yellow" }
    }
  }));
function NeweVideoPlayer(props) {
    const isUserLogged = useSelector((state) => state.login.loggedUser);
    const cartActions = cartSlice.actions;
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = useSelector((state) => state.login.loggedUser);
    // const username = user.userName;
  
    const [data, getAllData] = useState([]);
    const videoId = props.match.params.video_id
    useEffect(() => {
      getAllDatas();
      getAllLike();
      getAllSubscriebe();
      getAllCommentData();
      AddToViewe()
      getAllViews()
     // countAllComment();
    
    }, []);
    console.log(videoId);
  const[subscrbtion,setSubschrieption]=useState("")
  const[Actor,setActor]=useState("")
    const getAllDatas = () => {
      axios.get(`${url}video/getVideoById/${videoId}`).then((response) => {
        getAllData(response.data.user);
       // setActor(response.data.user.usersInfos[0].username)
        console.log(response.data.user.usersInfos)
        console.log(videoId);
        setSubschrieption(response.data.user.video_subscription.subscription_type)
        console.log(response.data.user);
      });
    };
   // console.log(Actor)
    console.log(subscrbtion)
    //console.log(url);
    //console.log(`${url}${data.path}`);
    //
    const config = {
      headers: {
        'Content-Type': 'application/json',
        mode: 'cors',
      },
    };
    const [conuntLike, setLikeInfo] = useState([]);
    const getAllLike = () => {
      axios.get(`${url}user/getAllLike/${videoId}`).then((response) => {
        console.log(response);
        setLikeInfo(response.data.licke);
      });
    };
    console.log(conuntLike.length);
    const addLike = (idd) => {
      if(!isUserLogged ){
        toast.info('Login or register to like a video ! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('the user is not found')
      }
      else{
      axios
        .post(`${url}user/likes/${idd}`, { userID: user.id }, config)
        .then((response) => {
          console.log(response.data.id);
          getAllLike();
        });
      }
    };
    const removeLike = () => {
      if(!isUserLogged ){
        toast.info('Login or register to dislike a video! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('the user is not found')
      }
      else{
      axios
        .delete(`${url}user/unlikes/${videoId}`, config)
        .then((response) => {
  console.log(response)
          getAllLike();
        });
      }
    };
    const addToFavoriet = () => {
      if(!isUserLogged ){
        toast.info('Login or register to add  a video into your favoriete list! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('the user is not found')
      }
      else{
      axios
        .post(`${url}user/addToFavoriet/${videoId}`, { user_Id: user.id }, config)
        .then((response) => {
          if (response.data.success) {
            console.log(response.data);
            toast('add to favoriet ', {
              position: 'top-right',
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else if (response.data.message) {
            console.log(response.data.message);
            toast(
              'remove from the favoriet but still no you can find in the system',
              {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        });
      }
    };
  
    const history = useHistory();
    const Subscribe = (idd) => {
      if(!isUserLogged ){
        toast.info('Login or register to subschriebe  a video ! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('the user is not found')
      }
      else{
      axios
        .post(`${url}user/addToSubscrieber/${idd}`, { user_Id: user.id }, config)
        .then((response) => {
          if (response.data.success) {
            getAllSubscriebe();
            toast('add to subscribe list ', {
              position: 'top-right',
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
  
          } else if (response.data.message) {
            getAllSubscriebe();
            toast('remove subschriebe', {
              position: 'top-right',
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      }
    };
    const [conuntSubscrieb, setSubscrieb] = useState([]);
  
    const getAllSubscriebe = () => {
      axios.get(`${url}user/getAllSubscriebe/${videoId}`).then((response) => {
        console.log(response.data.subscrieb);
        setSubscrieb(response.data.subscrieb);
      });
    };
    console.log(conuntSubscrieb.length)
    //console.log(countSubschrieb.length);
    console.log(data);
  
    const [text, setText] = useState('');
    const [commentInfo, setCommentInfo] = useState([]);
    const addComment = () => {
      if(!isUserLogged ){
        toast.info('Login or register to give comment for video ! ', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.log('the user is not found')
      }
      else{
      axios.post(`${url}user/comment`, { text: text, userId:user.id ,video_id:videoId}, config)
        .then((response) => {
          if (response) {
              console.log(response)
              getAllCommentData();
             // countAllComment();
              setText("")
          } else {
            console.log('field  to get the video data');
          }
        });
      }
    };
    const AddToViewe=()=>{
      axios.post(`${url}video/view/${videoId}`,{
        video_id:videoId,
        user_id:user.id
      }).then(response=>{
        console.log(response)
      })
    }
   //console.log(data.video_subscription.subscription_type)
    const getAllCommentData = () => {
      axios.get(`${url}user/getAllComment/${videoId}`).then((response) => {
        console.log(response.data.comment);
        setCommentInfo(response.data.comment);
      });
    };
    console.log(commentInfo.length)
    const[AllViews,setAllViews]=useState([])

        const getAllViews=()=>{
          axios.get(`${url}video/getAllViews/${videoId}`).then((response) =>{
            console.log(response)
            setAllViews(response.data.data)

          });
        }
   
    return (
        <div>
          <div style={{marginLeft:"20px"}}>
               <ReactPlayer
              className='rect_ayer'
              url={`${url}video/${data.videoFileName}`}
              controls={true}
              key={`${url}video/${data.fileName}`}
            />
            </div>
            <Row>
              <Col>
              <div style={{color:"white"}}>
    
              </div>
              </Col>
            </Row>
        </div>
    )
}

export default NeweVideoPlayer
