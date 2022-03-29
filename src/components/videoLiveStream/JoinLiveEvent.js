import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import socketClient from 'socket.io-client'
import { promise } from '../../utils/SocketPromise'
import { url } from '../../utils/url'
import Button from '@material-ui/core/Button'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@material-ui/core/TextField'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import jwt_decode from 'jwt-decode'
import { useMediaQuery } from 'react-responsive'

import Dialog from '@material-ui/core/Dialog'
import shortid from 'shortid'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing(1),
    marginLeft: '30px',
    color: 'white',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'teal',
    },
  },
  borderTextField: {
    // - The TextField-root
    // - Make the border more distinguishable

    // (Note: space or no space after & matters. See SASS "parent selector".)
    '& .MuiOutlinedInput-root': {
      // - The Input-root, inside the TextField-root
      '& fieldset': {
        // - The <fieldset> inside the Input-root
        borderColor: 'teal',
        border: 'solid 3px ',
        // - Set the Input border
      },
      '&:hover fieldset': {
        borderColor: 'teal',
        border: 'solid 3px ',
        // - Set the Input border when parent has :hover
      },
      '&.Mui-focused fieldset': {
        label: {
          display: 'none',
        }, // - Set the Input border when parent is focused
        borderColor: 'teal',
        border: 'solid 3px ',
      },
    },
  },
  closeButtonre: {
    position: 'absolute',
    marginLeft: 352,
    marginTop: -15,
    borderRadius: 0,
    '& > button': {
      background: 'transparent', // If you want button to be transparent
    },
  },
  closeButton: {
    position: 'absolute',
    marginLeft: 260,
    marginTop: -15,
    borderRadius: 0,
    '& > button': {
      background: 'transparent', // If you want button to be transparent
    },
  },
  paperre: {
    position: 'fixed',
    width: 470,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  paper: {
    position: 'fixed',
    width: 350,
    marginRight: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  select: {
    '&:before': {
      borderColor: 'teal',
    },
    '&:after': {
      borderColor: 'teal',
    },
  },
  icon: {
    fill: 'teal',
  },
}))
let userName
function rand() {
  return Math.round(Math.random() * 20) - 10
}
function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}
//list options
function JoinLiveEvent(props) {
  const privateId = window.location.search.slice(1)
  //console.log(shortid.generate());
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  let history = useHistory()
  const [modalOne, setModalOne] = React.useState(true)
  const [useList, setUserList] = React.useState(false)
  useEffect(() => {
    if (privateId === 'id') {
      getAllLiveEvent()
      if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
        userName = shortid.generate()
        setUserName(userName)
      } else {
        userName = user.username

        setUserName(userName)
      }
    } else {
      checkTokenExpirationMiddleware()
      if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
        console.log('no token')
        props.history.push('/')
      } else {
        userName = user.username
        axios
          .get(`${url}user/getAllPrivatUser/${userName}/${privateId}`)
          .then((response) => {
            console.log(response)
            if (response.data.resualt === 'user is exists') {
              getAllLiveEvent()
              setUserName(userName)
            } else {
              toast.info(
                'The Link is not provideed to you inorder to  join priviet livestream! ',
                {
                  position: 'top-right',
                  autoClose: 6000,
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }
      return () => { };
  }, [])
  const [modalStyle] = React.useState(getModalStyle)
  const checkTokenExpirationMiddleware = () => {
    if (localStorage.getItem('token')) {
      let token = localStorage.getItem('token')
      let decodedToken = jwt_decode(token)
      console.log('Decoded Token', decodedToken)
      let currentDate = new Date()
      // JWT exp is in seconds
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.clear()
        history.push('/')
        console.log('Token expired.')
      } else {
        console.log('Valid token')
      }
    }
  }
  const getAllLiveEvent = async () => {
    if (privateId === 'id') {
      console.log('event is public')
     await axios.get(`${url}admin/getAllLiveEventForUser`).then((responce) => {
        setEventList(responce.data.data)
        console.log(responce.data.data)
      })
    } else {
      console.log('event is private')
      axios
        .get(`${url}admin/getAllPrivietLiveEvent/${privateId}`)
        .then((responce) => {
          setEventList(responce.data.data)
          console.log(responce.data.data)
        })
    }
  }
  const [myEvent, setMyEvent] = useState('')
  const user = useSelector((state) => state.login.userInformation)
  const [username, setUserName] = useState('')
  const [eventList, setEventList] = useState([])
  console.log(privateId)
  const submitHandler = (e) => {
    e.preventDefault()
    //console.log(strs)
    const eventInfo = eventList.find((event) => event.Id === myEvent)
    let producer = eventInfo.producer
    let eventType = eventInfo.Privielage
    console.log(eventType, producer)
    const eventName = eventInfo.eventName
    props.history.push(
      `/joinEveneniet/${username}/${eventName}/${producer}/${eventType}`,
    )
  }
  console.log(myEvent)
  const classes = useStyles()

  const handleClose = () => {
    setModalOne(false)
    props.history.push('/')
  }
  const habdleModalOne = () => {
    setModalOne(true)
  }
  const [disable, setDisabled] = React.useState(true)
  return (
    <div>
      {privateId === 'id' ? (
        <div>
          <Dialog
            maxWidth="sm"
            fullWidth
            open={modalOne}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>{' '}
            <DialogContent style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                variant="outlined"
                className={classes.borderTextField}
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <label>Select LiveEvent</label>
              <FormControl fullWidth style={{ marginTop: '20px' }}>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  style={{ backgroundColor: 'rgb(232, 241, 250)' }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={myEvent}
                  onChange={(e) => {
                    setMyEvent(e.target.value)
                  }}
                >
                  {eventList.map((iteam, index) => (
                    <MenuItem value={iteam.Id}>{iteam.eventName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {eventList.length ? (
                <Button
                  onClick={(e) => {
                    submitHandler(e)
                    //  handleReques();
                  }}
                  className={classes.button}
                >
                  Join Live
                </Button>
              ) : (
                <Button
                  disabled={disable}
                  onClick={(e) => {
                    submitHandler(e)

                    //  handleReques();
                  }}
                  className={classes.button}
                >
                  Sorry No more events
                </Button>
              )}
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          {!localStorage.getItem('user_id') ||
          !localStorage.getItem('token') ? (
            toast.info('Login to  join priviet livestream! ', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          ) : (
            <div>
              <Dialog
                maxWidth="sm"
                fullWidth
                open={modalOne}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <Box position="absolute" top={0} right={0}>
                  <IconButton onClick={handleClose}>
                    <Close />
                  </IconButton>
                </Box>{' '}
                <DialogContent style={{ marginTop: '20px' }}>
                  <TextField
                    fullWidth
                    autoFocus
                    color="primary"
                    margin="normal"
                    variant="outlined"
                    className={classes.borderTextField}
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label>Select LiveEvent</label>
                  <FormControl fullWidth style={{ marginTop: '20px' }}>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                      className={classes.select}
                      style={{ backgroundColor: 'rgb(232, 241, 250)' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={myEvent}
                      onChange={(e) => {
                        setMyEvent(e.target.value)
                      }}
                    >
                      {eventList.map((iteam, index) => (
                        <MenuItem value={iteam.Id}>{iteam.eventName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {eventList.length ? (
                    <Button
                      onClick={(e) => {
                        submitHandler(e)
                        //  handleReques();
                      }}
                      className={classes.button}
                    >
                      Join Live
                    </Button>
                  ) : (
                    <Button
                      disabled={disable}
                      onClick={(e) => {
                        submitHandler(e)

                        //  handleReques();
                      }}
                      className={classes.button}
                    >
                      Sorry No more events
                    </Button>
                  )}
                </DialogContent>
              </Dialog>
              )
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default JoinLiveEvent
