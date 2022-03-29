/* eslint-disable no-dupe-keys */
/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios'

import React, { Component, useEffect, useState } from 'react'
import { url } from '../../utils/url'
import ReactPlayer from 'react-player'
import { Link } from 'react-router-dom'
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
import {
  Breadcrumbs,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import { useMediaQuery } from 'react-responsive'
import './step.scss'
import { styled } from '@mui/material/styles'

import Paper from '@mui/material/Paper'

import ButtonBase from '@mui/material/ButtonBase'
import UserVideo from './userVideo'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  width: '150px',
  height: '250px',
})
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
  breadcrumb: {
    backgroundColor: ' #111',
    margin: '70px',
    fontWeight: 100,
    fontSize: [40, '!important'],
   position: '-webkit-sticky',
 position: 'sticky',
 
  },  
  breadcrumRes: {
    backgroundColor: ' #111',

    fontWeight: 100,
    fontSize: [20, '!important'],
  },
  bre: {
    marginLeft: '75px',
  },
  breRes: {
    marginLeft: '35px',
  },
  breadcrumbLink: {
    color: '#BBBBBB',
    marginBottom: '60px',
    fontWeight: 600,
    fontSize: [17, '!important'],
    '&:hover': {
      color: '#BBBBBB',
      textDecoration: 'underline #000000',
    },
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
    similareVideos()
  }, [])
  console.log(videoId)

  let flag
  const [categorie, setCategorie] = useState(false)
  const [categorieInfo, setCategorieInfo] = useState()
  const getAllDatas = () => {
    axios.get(`${url}video/getVideoById/${videoId}`).then((response) => {
      getAllData(response.data.user)
      console.log(response.data.user.catagory)
      if (response.data.user.catagory !== 'none') {
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
  const [dataa, setDataa] = React.useState([])
  const similareVideos = () => {
    axios
      .get(`${url}user/getVideoByCategoriey/${categorieInfo}`)
      .then((responce) => {
        console.log(responce)
        setDataa(responce.data.data)
      })
  }
  console.log(dataa)
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
  const [favoriet, setFavoriet] = useState(true)
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
            setFavoriet(false)
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
            setFavoriet(true)
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
        .post(`${url}user/comment`, {
          text: text,
          userId: user.userId,
          video_id: videoId,
        })
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
  const md1 = useMediaQuery({ query: '(max-width: 576px)' })
  const md4 = useMediaQuery({ query: '(max-width: 1043px)' })
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
  const md2 = useMediaQuery({ query: '(min-width: 577px)' })
  const md3 = useMediaQuery({ query: '(max-width: 904px)' })
  return (
    <div>
      <div>
        <Breadcrumbs
          separator=" "
          aria-label="breadcrumb"
          style={{ color: 'white'}}
          className={md1? classes.breadcrumRes:classes.breadcrumb}
        >
          {categorie === 'false' && (
            <div className={md1 ? classes.breRes : classes.bre}>
              <Link
                className={classes.breadcrumbLink}
                style={{ textDecoration: 'none' }}
                to={`/`}
              >
                Home
              </Link>
              <Link
                className={classes.breadcrumbLink}
                style={{ marginRight: '20px', textDecoration: 'none' }}
              >
                {Title.Title}
              </Link>
            </div>
          )}
          <div className={md1 ? classes.breRes : classes.bre}>
            <Link
              className={classes.breadcrumbLink}
              style={{ textDecoration: 'none' }}
              to={`/`}
            >
              Home <span style={{ marginLeft: '5px' }}>/</span>
            </Link>
          </div>
          {categorieInfo === 'Trading' ? (
            <Link
              className={classes.breadcrumbLink}
              style={{ textDecoration: 'none' }}
              to="/Trending"
            >
              {categorieInfo} <span style={{ marginLeft: '5px' }}>/</span>
            </Link>
          ) : (
            <div>
              {categorieInfo === 'Movies' ? (
                <Link
                  className={classes.breadcrumbLink}
                  style={{ textDecoration: 'none' }}
                  to="/movies"
                >
                  {categorieInfo} <span style={{ marginLeft: '5px' }}>/</span>
                </Link>
              ) : (
                <Link
                  className={classes.breadcrumbLink}
                  style={{ textDecoration: 'none' }}
                  to="/series"
                >
                  {categorieInfo} <span style={{ marginLeft: '3px' }}>/</span>
                </Link>
              )}
            </div>
          )}
          <Link
            className={classes.breadcrumbLink}
            style={{ marginRight: '20px', textDecoration: 'none' }}
          >
            {Title.Title}
          </Link>
        </Breadcrumbs>
      </div>
      <div className="playerPage">
        <Row>
          <div className={md1 ? 'player-wrapperRes' : 'player-wrapper'}>
            <Col>
              <ReactPlayer
                className="react-player "
                url={`${url}videos/${data.videoFileName}`}
                controls={true}
                key={`${url}videos/${data.fileName}`}
        height='440px'
       //width="300px"
              />
            </Col>
          </div>
        </Row>
        
        <div style={{ marginLeft: '10px', marginTop: '20px' }}>
          <Row>
            <Grid container spacing={2}>
              <Grid item xs={11} spacing={2} sm container>
                {md1 ? (
                  <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={6} md={3}>
                      <ButtonBase sx={{ width: 170, height: 170 }}>
                        <Img
                          alt="complex"
                          src={`${url}images/${data.thumbnialFileName}`}
                        />
                      </ButtonBase>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item md={3}>
                    <ButtonBase sx={{ width: 150, height: 160 }}>
                      <Img
                        alt="complex"
                        src={`${url}images/${data.thumbnialFileName}`}
                      />
                    </ButtonBase>
                  </Grid>
                )}
                {md2 && md3 ? (
                  <Grid style={{ marginLeft: '25px' }} item xs={8} md={3}>
                    <div className="titleOf">{Title.Title}</div>
                    <div className="descrieption">{Title.Descrieption}</div>
                  </Grid>
                ) : (
                  <Grid item md={9}>
                    <div className="titleOf">{Title.Title}</div>
                    <div className="descrieption">{Title.Descrieption}</div>
                  </Grid>
                )}
                <Grid item md={15}>
                  <div style={{ marginTop: '80px' }}>
                    <hr className="line" />
                    <div className="date">{commentInfo.length} Comment</div>
                    <form style={{ display: 'flex' }} onSubmit={addComment}>
                      {md1 ? (
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
                      {md1 ? (
                        <input
                          type="submit"
                          style={{
                            width: '70px',
                            background: 'teal',
                            height: '52px',
                            color:'white'
                          }}
                          value="Submit"
                        />
                      ) : (
                        <input
                          type="submit"
                          style={{
                            width: '200px',
                            background: 'teal',
                            height: '52px',
                            color:'white'
                          }}
                          value="Submit"
                        />
                      )}
                    </form>
                    <div>
                      {commentInfo.map((iteam) => {
                        console.log(iteam.name)
                        return (
                          <div>
                            <div>
                              {iteam.name}
                              <span
                                style={{
                                  color: '#AAAAAA',
                                  marginLeft: '.5rem',
                                }}
                              >
                                <Moment format="HH:mm">
                                  {iteam.updatedAt}
                                </Moment>
                              </span>
                            </div>
                            <div>{iteam.text}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Grid>
              </Grid>
              {md4 ? (
                <Grid item md={14}>
                  <div>
                    {categorie ?
                      <div>
                        <div
                          className="titleOf"
                          style={{ marginBottom: '10px' }}
                        >
                          You May Also Like
                        </div>
                        <SimilarVodeos data={categorieInfo} />
                      </div>:
                         <div>
                        <div
                          className="titleOf"
                          style={{ marginBottom: '10px' }}
                        >
                          You May Also Like
                        </div>
                        <UserVideo/>
                      </div>

                    }
                  </div>
                </Grid>
              ) : (
                <Grid style={{ marginRight: '20px' }} item md={4}>
                  <div>
                    {categorie ?
                      <div>
                        <div
                          className="titleOf"
                          style={{ marginBottom: '10px' }}
                        >
                          You May Also Like
                          {favoriet ? (
                            <Button
                              classes={{
                                root: classes.closeButton,
                                focusVisible: classes.closeButton,
                              }}
                              style={{ marginLeft: '40px', color: 'white' }}
                              onClick={addToFavoriet}
                              endIcon={<FavoriteIcon />}
                            >
                              Add to Favorite
                            </Button>
                          ) : (
                            <Button
                              classes={{
                                root: classes.closeButton,
                                focusVisible: classes.closeButton,
                              }}
                              style={{ marginLeft: '70px', color: 'white' }}
                              onClick={addToFavoriet}
                              endIcon={<FavoriteIcon />}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <SimilarVodeos data={categorieInfo} />
                      </div>:
                      <div>
                        <div
                          className="titleOf"
                          style={{ marginBottom: '10px' }}
                        >
                          You May Also Like
                          {favoriet ? (
                            <Button
                              classes={{
                                root: classes.closeButton,
                                focusVisible: classes.closeButton,
                              }}
                              style={{ marginLeft: '40px', color: 'white' }}
                              onClick={addToFavoriet}
                              endIcon={<FavoriteIcon />}
                            >
                              Add to Favorite
                            </Button>
                          ) : (
                            <Button
                              classes={{
                                root: classes.closeButton,
                                focusVisible: classes.closeButton,
                              }}
                              style={{ marginLeft: '70px', color: 'white' }}
                              onClick={addToFavoriet}
                              endIcon={<FavoriteIcon />}
                            >
                              Remove
                            </Button>
                          )}
                        </div>
                        <UserVideo />
                      </div>
                    }
                  </div>
                </Grid>
              )}
            </Grid>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Player
