import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Device } from 'mediasoup-client'
import socketClient from 'socket.io-client'
import { promise } from '../../utils/SocketPromise'
import { useSelector } from 'react-redux'
import { url } from '../../utils/url'
import { toast } from 'react-toastify'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from 'react-responsive'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe'
import { Container, Row, Col } from 'react-bootstrap'
import StopIcon from '@mui/icons-material/Stop'
import LivingIcon from '@mui/icons-material/Living'
import { useHistory } from 'react-router'
import RestoreIcon from '@mui/icons-material/Restore'
import Tooltip from '@material-ui/core/Tooltip'
//global variables
let device, transport, consumerId, flag
let live_media_stream
const opts = {
  secure: true,
  reconnect: true,
  rejectUnauthorized: false,
}
let username
let eventname
let eventType
let videoConsumer
let audioConsumer
const serverUrl = `${url}`

//let socket = socketClient(`${url}`, opts)

let socket = socketClient('https://ethiolive.net', { path: '/socket.io' })
socket.request = promise(socket)
const useStyles = makeStyles((theme) => ({
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
  button: {
    margin: theme.spacing(1),
    marginLeft: '30px',
    color: 'white',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'teal',
    },
  },
  buttonRestart: {
    margin: theme.spacing(1),
    width: 50,
    color: 'white',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'teal',
    },
  },
  subscribe: {
    color: 'teal',
    '&:hover': {
      backgroundColor: 'brown',
    },
  },
}))
let producerUsername
function JoinCreateEvent(props) {
  const [restartDisable, setRestartDisable] = useState(true)
  const [startDisable, setStartDisable] = useState(false)
  const [stopeDSisable, setStopeDisable] = React.useState(true)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    props.history.push('/joinEvent?id')
  }

  async function refres() {
    //we will auto-triggering js function
    //to refresh once after first load
    (function () {
      if (window.localStorage) {
        //check if reloaded once already
        if (!localStorage.getItem('firstLoad')) {
          //if not reloaded once, then set firstload to true
          localStorage['firstLoad'] = true
          //reload the webpage using reload() method
          window.location.reload()
        } else localStorage.removeItem('firstLoad')
      }
    })()
  }
  async function generate_consumerId() {
    return uuidv4()
  }
  username = props.match.params.username
  console.log(username)
  eventname = props.match.params.eventname
  producerUsername = props.match.params.producer
  eventType = props.match.params.privilege

  const history = useHistory()
 useEffect(() => {
    refres()
    
    socket.on('connect', async () => {
      console.log(`connected to ${serverUrl}`)
      console.log(`connected user : ${username} event : ${eventname}`)
      const data = await socket.request('getRouterRtpCapabilitiesConsumer', {
        username,
        consumerId,
        eventname,
        producerUsername,
      })
      console.log('data@connect: ', data)
      await loadDevice(data)
    })
   // console.log('device@useEffect: ', device)
    socket.on('disconnect', () => {
      console.log(`disconnected from ${serverUrl}`)
      props.history.push('/joinEvent?id')
    })

    socket.on('connect_error', (error) => {
      console.error('could not connect to %s%s (%s)', serverUrl, error.message)
    })
    consumerId = generate_consumerId()
    //{username, consumerId, eventname, producerUsername
    socket.emit('join_event', {
      username,
      consumerId,
      eventname,
      producerUsername,
    })
    socket.on('liveStreamHalted', async (data, callback) => {
      let { username, eventname, id } = data
      await resolveAfterXSeconds(2)
      toast.info(`${username} halted the live stream of ${eventname}`, {
        position: 'top-right',
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      props.history.push('/joinEvent?id')
    })
    async function loadDevice(routerRtpCapabilities) {
      try {
        device = new Device()
        console.log(device)
      } catch (error) {
        if (error.name === 'UnsupportedError') {
          console.error('browser not supported')
        }
      }
      await device.load({ routerRtpCapabilities })
    }
    socket.on('message', (message) => {
      console.log(message)
      outputMessage(message)

      // Scroll down
    })

  }, [])
  const [messageList, setMessageLiset] = useState([])
  async function outputMessage(message) {
    setMessageLiset(message)
  }
  console.log(messageList)
  // even startt_name=dataEvent.evenetName;
  let cameraPreview = document.getElementById('videoEvent')
  const classes = useStyles()
  const myVideo = useRef()

  console.log('error')
  console.log('the video', myVideo)
  async function subscribe() {
    setRestartDisable(false)
    setStartDisable(true)
    setStopeDisable(false)
    console.log('this is consumer')
    const data = await socket.request('createConsumerTransport', {
      forceTcp: false,
    })
    console.log(data)
    if (data.error) {
      console.error(data.error)
      return
    }
    await resolveAfterXSeconds(3)
    transport = device.createRecvTransport(data)
    console.log('transport: ', transport)
    transport.on('connect', ({ dtlsParameters }, callback, errback) => {
      socket
        .request('connectConsumerTransport', {
          transportId: transport.id,
          dtlsParameters,
        })
        .then(callback)
        .catch(errback)
      console.log(
        `consumer -> transport Connectionstate --> ${transport.connectionState}`,
      )
    })

    transport.on('connectionstatechange', async (state) => {
      console.log(`transport-->consumer connectionState --> ${state}`)

      switch (state) {
        case 'connecting':
          // sub_status.innerHTML = 'subscribing...';
          //Subscribtion_Control.disabled = true;
          break
        case 'connected':
          await resolveAfterXSeconds(3)
          myVideo.current.srcObject = live_media_stream
          myVideo.current.play()
          console.log(live_media_stream)
          await socket.request('resume')
          console.log('live media stream: ', live_media_stream)

          //   sub_status.innerHTML = 'subscribed';
          // btn_subscribe.disabled = true
          //btn_unsubscribe.disabled = false
          break
        case 'disconnected':
          let iceparameters = await socket.request('restartConsumerIce', {
            consumerId,
          })
          if (iceparameters) {
            console.log('restartIce::iceparameters ', { ...iceparameters })
            transport.restartIce({ iceParameters: { ...iceparameters } })
          } else {
            flag = true
            transport.close()
          }
          break
        case 'failed':
          if (flag) {
            transport.close()
            // publish_status.innerHTML =  `connectionstatechange --> ${state} `;
          } else {
            let iceparams = await socket.request('restartConsumerIce', {
              consumerId,
            })
            if (iceparams) {
              console.log('restartIce::iceparameters ', { ...iceparams })
              transport.restartIce({ iceParameters: { ...iceparams } })
            }
          }
          break
        default:
          break
      }
    })
    console.log('this is consumer')
    live_media_stream = await consume(transport)
    // myVideo.current.srcObject=live_media_stream
    //myVideo.current.srcObject =live_media_stream;
    console.log('live media stream: ', live_media_stream)
  }

  async function consume(transport) {
    const { rtpCapabilities } = device
    let dataJsonString = await socket.request('consume', {
      rtpCapabilities,
      eventType,
      consumerId,
    })

    const data = parseJsonText(dataJsonString)

    console.log('consumerParams ', data)

    let videoConsumerParams = data.videoParams
    let audioConsumerParams = data.audioParams

    console.log({ ...videoConsumerParams })
    console.log({ ...videoConsumerParams })

    let stream = new MediaStream()
    if (videoConsumerParams) {
      videoConsumer = await transport.consume({ ...videoConsumerParams })
      stream.addTrack(videoConsumer.track)
    }
    if (audioConsumerParams) {
      audioConsumer = await transport.consume({ ...audioConsumerParams })
      stream.addTrack(audioConsumer.track)
    }
    // console.log('consumer track : ',{videoConsumer.track,  audioConsumer.track})

    console.log('stream: ', stream)

    return stream
  }
  function parseJsonText(jsonText) {
    let map = JSON.parse(jsonText)

    return map
  }
  function resolveAfterXSeconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x)
      }, x * 10 ** 3)
    })
  }
  const unsubscribe = async () => {
    let unsubscribe_status = await socket.request('unsubscribe', {
      consumerId,
      username,
      producerUsername,
      eventType,
    })
    if (unsubscribe_status) {
      socket.emit('consumerLeave', { username, consumerId })
      await resolveAfterXSeconds(2)
    }
  }
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const [messageBody, setMessageBody] = useState('')
  const SendMessage = (e) => {
    e.preventDefault()

    // Get message text

    setMessageBody('')
    const message = messageBody.trim()

    if (!message) {
      return false
    }
    console.log(message)

    // Emit message to server
    socket.emit('chatMessage', { consumerId, username, message })
  }
  async function restart() {
    let iceparameters = await socket.request('restartConsumerIce', {
      consumerId,
    })
    console.log('restartIce::iceparameters ', { ...iceparameters })
    transport.restartIce({ iceParameters: { ...iceparameters } })
  }
  return (
    <div>
      <Tooltip
        title="Restart"
        color="secondary"
        classes={{
          tooltip: classes.customTooltip,
          arrow: classes.customArrow,
        }}
        aria-label="add"
        arrow
      >
        <IconButton
          disabled={restartDisable}
          className={classes.buttonRestart}
          onClick={(e) => restart()}
        >
          <RestoreIcon />
        </IconButton>
      </Tooltip>
      <Row>
        <div>
          <video ref={myVideo} controls autoplay playsinline></video>
        </div>
        <span></span>
      </Row>
      <div className="joinLive">
        <Row>
          <Col>
            <Button
              disabled={startDisable}
              size=""
              className={classes.button}
              startIcon={<LivingIcon />}
              onClick={() => {
                subscribe()
              }}
            >
              Start
            </Button>
            <Button
              disabled={stopeDSisable}
              size=""
              className={classes.button}
              startIcon={<StopIcon />}
              onClick={() => {
                handleClickOpen()
              }}
            >
              Stop
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="formJoin">
              <form onSubmit={SendMessage} style={{ display: 'flex' }}>
                <textarea
                  className="textConsumer"
                  style={{ border: '2px solid teal' }}
                  placeholder="Add a public comment..."
                  value={messageBody}
                  required
                  onChange={(e) => setMessageBody(e.target.value)}
                />
                <input
                  type="submit"
                  className="commentSubmint"
                  style={{ background: 'teal', height: '52px' }}
                  value="Send"
                />
              </form>
              <div>
                {messageList.username}
                <span>{messageList.text}</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Confirm the action</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            would you like to leave the live stream
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            onClick={handleClose}
            variant="contained"
          >
            Now
          </Button>
          <Button
            onClick={() => {
              unsubscribe()
              handleClose()
            }}
            className={classes.button}
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default JoinCreateEvent
