/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'

import React, { Component, useEffect, useState } from 'react'
import { url } from '../../utils/url'
import ReactPlayer from 'react-player'

import './fragment.css'
import Moment from 'react-moment'
import Tooltip from '@material-ui/core/Tooltip'
import BackspaceIcon from '@material-ui/icons/Backspace'
import { Row, Col, Container } from 'react-bootstrap'
import SimilarVodeos from './similarVideos'
import IconButton from '@material-ui/core/IconButton'
import { useHistory } from 'react-router'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { useMediaQuery } from 'react-responsive'
import './step.scss'
import Avatar from '@mui/material/Avatar'
let AvaterName
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginLeft: '30px',
  },
  closeButton: {
    color: 'white',

    //  "&:focus": { backgroundColor: "yellow" }
  },
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: 'rgba(220, 0, 78, 0.8)',
  },

  customNeweTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: '#ff6a6a',
  },
  //
  customArrow: {
    color: '#f1f1f1',
  },
}))
const Player = (props) => {
  const classes = useStyles()
  const user = useSelector((state) => state.login.userInformation)
  // const username = user.userName;

  const [data, getAllData] = useState([])
  const [userInformation, setUserInformation] = useState([])
  const [subscrbtion, setSubschrieption] = useState('')
  const [userSubscrieb, setSubscriebb] = useState('')
  const [Title, setTitle] = useState([])
  const videoId = props.match.params.video_id
  useEffect(() => {
    getAllDatas()
    getAllLike()
    getAllSubscriebe()
    getAllCommentData()
    // countAllComment();
    AddToViewe()
    getAllViews()
    viedobyUser()
  }, [])
  console.log(videoId)

  let flag
  const [categorie, setCategorie] = useState(false)
   const [categorieInfo, setCategorieInfo] = useState(false)
  const getAllDatas = () => {
    axios.get(`${url}video/getVideoById/${videoId}`).then((response) => {
      getAllData(response.data.user)
      console.log(response.data.user.catagory)
      if (response.data.user.catagory !=='none') {
        setCategorie(true)
        setCategorieInfo(response.data.user.catagory)

      }
      console.log(videoId)
      setSubschrieption(response.data.user.video_subscription.subscription_type)
      setSubscriebb(response.data.user.usersInfos[0])
      setSubscriebb(response.data.user.usersInfos[0])
      setSubscriebb(response.data.user.usersInfos[0])
      setUserInformation(response.data.user.usersInfos[0])
      setTitle(response.data.user.video_title)
      flag = 1
    })
  }
  console.log(categorie)
  console.log(userInformation)
  //const AvaterName=userInformation.FirstName.charAt(0)

  console.log(subscrbtion)
  //console.log(url);
  //console.log(`${url}${data.path}`);
  //
  const config = {
    headers: {
      'Content-Type': 'application/json',
      mode: 'cors',
    },
  }
  const [conuntLike, setLikeInfo] = useState([])
  const getAllLike = () => {
    axios.get(`${url}user/getAllLike/${videoId}`).then((response) => {
      console.log(response)
      setLikeInfo(response.data.licke)
    })
  }
  console.log(conuntLike.length)
  const addLike = (idd) => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
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
    } else {
      axios
        .post(`${url}user/likes/${idd}`, { userID: user.userId }, config)
        .then((response) => {
          console.log(response.data.id)
          getAllLike()
        })
    }
  }
  const removeLike = () => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
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
    } else {
      axios.delete(`${url}user/unlikes/${videoId}`, config).then((response) => {
        console.log(response)
        getAllLike()
      })
    }
  }
  const addToFavoriet = () => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      toast.info(
        'Login or register to add  a video into your favoriete list! ',
        {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      )
      console.log('the user is not found')
    } else {
      axios
        .post(
          `${url}user/addToFavoriet/${videoId}`,
          { user_Id: user.userId },
          config,
        )
        .then((response) => {
          if (response.data.success) {
            console.log(response.data)
            toast('add to favoriet ', {
              position: 'top-right',
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else if (response.data.message) {
            console.log(response.data.message)
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
              },
            )
          }
        })
    }
  }

  const history = useHistory()
  const Subscribe = (idd) => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
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
    } else {
      axios
        .post(
          `${url}user/addToSubscrieber/${idd}`,
          { user_Id: user.userId, userSubId: userSubscrieb.userId },
          config,
        )
        .then((response) => {
          if (response.data.success) {
            getAllSubscriebe()
            toast('add to subscribe list ', {
              position: 'top-right',
              autoClose: 3500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          } else if (response.data.message === 'unsubscriebe') {
            console.log(user.id)
            axios
              .delete(
                `${url}user/deletSubscriebe/${idd}/${user.id}`,
                { user_Id: user.userId },
                config,
              )
              .then((response) => {
                if (response) {
                  getAllSubscriebe()
                  toast('remove subschriebe', {
                    position: 'top-right',
                    autoClose: 3500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                }
              })
          }
        })
    }
  }
  const [conuntSubscrieb, setSubscrieb] = useState([])
  const getAllSubscriebe = () => {
    axios.get(`${url}user/getAllSubscriebe/${videoId}`).then((response) => {
      console.log(response.data.subscrieb)
      setSubscrieb(response.data.subscrieb)
    })
  }
  console.log(conuntSubscrieb.length)
  //console.log(countSubschrieb.length);
  console.log(data)

  const [text, setText] = useState('')
  const [commentInfo, setCommentInfo] = useState([])
  const addComment = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
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
    } else {
      axios
        .post(
          `${url}user/comment`,
          { text: text, userId: user.userId, video_id: videoId },
          config,
        )
        .then((response) => {
          if (response) {
            console.log(response)
            getAllCommentData()
            // countAllComment();
            setText('')
          } else {
            console.log('field  to get the video data')
          }
        })
    }
  }
  //console.log(data.video_subscription.subscription_type)
  const getAllCommentData = () => {
    axios.get(`${url}user/getAllComment/${videoId}`).then((response) => {
      console.log(response.data.comment)
      setCommentInfo(response.data.comment)
    })
  }
  console.log(commentInfo.length)
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const AddToViewe = () => {
    axios
      .post(`${url}video/view/${videoId}`, {
        video_id: videoId,
      })
      .then((response) => {
        console.log(response)
        getAllViews()
      })
  }
  const [views, setAllViews] = useState([])
  const getAllViews = () => {
    axios.get(`${url}video/getAllViews/${videoId}`).then((response) => {
      console.log(response.data)
      setAllViews(response.data.data)
    })
  }
  const viedobyUser = () => {
    axios.post(`${url}video/getUserbyVideo/${videoId}`).then((response) => {
      console.log(response)
    })
  }

  return (
    <Container>
      <Row>
        <div>
          <Tooltip
            title="Back to Home"
            color="secondary"
            classes={{
              tooltip: classes.customTooltip,
              arrow: classes.customArrow,
            }}
            aria-label="add"
            arrow
          >
            <IconButton
              classes={{
                root: classes.closeButton,
                focusVisible: classes.closeButton,
              }}
              onClick={() => {
                history.push('/')
              }}
              color="red"
            >
              <BackspaceIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Add to Favoriet"
            color="secondary"
            classes={{
              tooltip: classes.customTooltip,
              arrow: classes.customArrow,
            }}
            aria-label="add"
            arrow
          >
            <IconButton
              classes={{
                root: classes.closeButton,
                focusVisible: classes.closeButton,
              }}
              margin="20px"
              onClick={addToFavoriet}
            >
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
          <div className={md ? 'player-wrapperRes' : 'player-wrapper'}>
            <Col>
              <ReactPlayer
                className="react-player "
                url={`${url}videos/${data.videoFileName}`}
                controls={true}
                key={`${url}videos/${data.fileName}`}
                style={{ margin: 'auto', width: '400px' }}
              />
            </Col>
          </div>
          <Col>
            <div style={{ display: 'flex' }} className="all">
              {' '}
              <div className="like">
                <button
                  onClick={(e) => addLike(data.video_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-up" />{' '}
                </button>
                <span style={{ marginLeft: '10px', color: 'white' }}>
                  {conuntLike.length} Likes
                </span>
              </div>
              <div style={{ marginLeft: '10px' }} className="dislike">
                <button
                  onClick={(e) => removeLike(data.video_id)}
                  type="button"
                  className="btn btn-light"
                >
                  <i className="fas fa-thumbs-down"></i>
                </button>
              </div>
            </div>
            <div className="title">
              <Row>
                <Col lg={3}>
                  <img src={`${url}images/${data.thumbnialFileName}`}></img>
                </Col>
                <Col lg={7}>
                  <div className="titleOf">{Title.Title}</div>
                  <div className="descrieption">{Title.Descrieption}</div>
                </Col>
                <Col lg={2}>{categorie && <div>
                  <SimilarVodeos data={categorieInfo}/>
                   </div>}</Col>
              </Row>
            </div>
          </Col>
          <Col>
            <div className="titleVideo" style={{ marginTop: '10px' }}>
              {Title.Title}
            </div>
            <div className="date">
              Postd on{' '}
              <Moment style={{ marginLeft: '10px' }} format="YYYY-MM-DD">
                {data.updatedAt}
              </Moment>
            </div>
          </Col>
          <hr className="line" />
          <div style={{ display: 'flex' }}>
            <div
              className="date"
              style={{ marginLeft: '20px', marginTop: '20px' }}
            >
              {Title.Descrieption}
            </div>
          </div>
          <hr className="line" />
          <div>
            <div className="date">
              {conuntSubscrieb.length} Subscribers
              <span>
                <button
                  style={{
                    marginLeft: '2px',
                    backgroundColor: '#CC0000',
                    borderRadius: '4px',
                    color: 'white',
                    padding: '10px 20px',
                    fontWeight: '500',
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                  }}
                  onClick={(e) => Subscribe(data.video_id)}
                >
                  Subscribe
                </button>
              </span>{' '}
            </div>

            <hr className="line" />
            <div className="date">{commentInfo.length} comment</div>

            <form style={{ display: 'flex' }} onSubmit={addComment}>
              {md ? (
                <textarea
                  style={{ width: '200px', border: '2px solid teal' }}
                  placeholder="Add a public comment..."
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                />
              ) : (
                <textarea
                  style={{ width: '500px', border: '5px' }}
                  placeholder="Add a public comment..."
                  value={text}
                  required
                  onChange={(e) => setText(e.target.value)}
                />
              )}

              <br />
              {md ? (
                <input
                  type="submit"
                  style={{ width: '70px', background: 'teal', height: '52px' }}
                  value="Send"
                />
              ) : (
                <input
                  type="submit"
                  style={{ width: '200px', background: 'teal', height: '52px' }}
                  value="Send"
                />
              )}
            </form>
          </div>

          <div>
            {commentInfo.map((iteam) => {
              console.log(iteam.name)
              return (
                <div>
                  <div>
                    {iteam.name}
                    <span style={{ color: '#AAAAAA', marginLeft: '.5rem' }}>
                      <Moment format="HH:mm">{iteam.updatedAt}</Moment>
                    </span>
                  </div>
                  <div>{iteam.text}</div>
                </div>
              )
            })}
          </div>
        </div>
      </Row>
    </Container>
  )
}

export default Player
