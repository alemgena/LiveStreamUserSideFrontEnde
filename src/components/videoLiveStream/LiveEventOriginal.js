import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Device } from 'mediasoup-client'
import socketClient from 'socket.io-client'
import axios from 'axios'
import Divider from '@mui/material/Divider'
import { useSelector } from 'react-redux'
import Tooltip from '@material-ui/core/Tooltip'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation'
import { promise } from '../../utils/SocketPromise'
import { url } from '../../utils/url'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { List, ListItem, ListItemText } from '@material-ui/core/'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'

import Button from '@material-ui/core/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { Camera } from '@material-ui/icons'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import HardwareIcon from '@mui/icons-material/Hardware'
import { Container, Row, Col } from 'react-bootstrap'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
//import { useMediaQuery } from 'react-responsive'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import RestoreIcon from '@mui/icons-material/Restore'
import AddIcon from '@mui/icons-material/Add'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
let videoProducer, flag
let audioProducer
let mediaRecorder //
let recordedBlobs
let transport
//import { useSelector } from 'react-redux';
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
  buttonRestart: {
    margin: theme.spacing(1),
    width: 50,
    color: 'white',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'teal',
    },
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
  subscribe: {
    color: 'teal',
    '&:hover': {
      backgroundColor: 'brown',
    },
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
      cursor: 'default',
    },
    '& .MuiSvgIcon-root': {
      fontSize: '8rem',
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
        borderRadius: '30px',
        // - Set the Input border
      },

      '&:hover fieldset': {
        borderColor: 'teal',
        border: 'solid 3px ',
        borderRadius: '30px',
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
  dialog: {
    position: 'absolute',
    left: 350,
    top: 50,
  },
  dialogResponcieve: {
    position: 'absolute',
    top: 0,
  },
}))

let username, eventname, event_type, eventId
//socket = socketClient(serverUrl, opts);
//global variables
let device
let producer
let media_stream

//	myVideo.current.srcObject = stream
const opts = {
  secure: true,
  reconnect: true,
  rejectUnauthorized: false,
  withCredentials: false,
  //path:"/socket"
}
//A7ta1a0v
const serverUrl = `${url}`
let socket = socketClient('https://ethiolive.net', { path: '/socket.io' })
//let socket = socketClient(`${url}`, opts)
socket.request = promise(socket)
function LiveEventOriginal(props) {
  const [setUserDeviecs, setInputUserDeviecs] = React.useState(false)
  console.log(window.location.href)
  const host = window.location.host

  const [openInput, setOpenInput] = React.useState(false)

  const handleClickOpenInput = () => {
    setOpenInput(true)
  }

  const handleCloseInput = () => {
    setOpenInput(false)
  }
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const classes = useStyles()
  const [haletDisable, setHaletDisabled] = React.useState(true)
  const [webCameDisabled, setDisabled] = React.useState(false)
  const [screenDisabled, setScreenDisabled] = React.useState(false)
  const [publieshExternal, setExternalPubliesh] = React.useState(false)
  //username = props.match.params.username
  //eventname=props.match.params.eventname
  //const event_type=props.match.params.privilege
  //console.log(event_type)
  // console.log(username,eventname)
  const dataEvent = props.location.state
  username = dataEvent.username
  console.log(username)
  eventname = dataEvent.event
  event_type = dataEvent.Prievielage
  eventId = dataEvent.eventId
  const [restartDisable, setRestartDisable] = useState(true)
  const [recordType, setRecordType] = useState('Start Recording')
  const [myVideo] = useState(React.createRef())
  const [mimType, setMimType] = useState([])

  useEffect(() => {
    getAllUser()
    /*  if(reloadCount < 2) {

          sessionStorage.setItem('reloadCount', String(reloadCount+1));
          window.location.reload();
        } else {
          sessionStorage.removeItem('reloadCount');
        }
        */

    available_Devices()

    socket.on('connect', async () => {
      console.log(`connected to ${serverUrl}`)
      //  available_Devices()//
    })
    socket.on('disconnect', () => {
      console.log(`disconnected from ${serverUrl}`)
      props.history.push('/creatLiveEvent')
      //  window.location.replace(`${hostname}/create_live_streams`);
    })
    socket.on('connect_error', (error) => {
      console.error('could not connect to %s%s (%s)', serverUrl, error.message)
    })

    socket.emit('create_event', { username, eventname, eventId, event_type })

    async function get_room_rtp_capabilities() {
      const data = await socket.request('getRouterRtpCapabilitiesProducer')

      await loadDevice(data)
    }
    get_room_rtp_capabilities()
    console.log('err')

    /** load device rtp capabilities */
    async function loadDevice(routerRtpCapabilities) {
      try {
        device = new Device()
      } catch (error) {
        if (error.name === 'UnsupportedError') {
          console.error('browser not supported')
        }
      }
      await device.load({ routerRtpCapabilities })
    } //end of loadDevice(routerRtpCapabilities)
    getSupportedMimeTypes()
    listLiveUsers()
    socket.on('message', (message) => {
      console.log('message', message)
      outputMessage(message)

      // Scroll down
      // chatMessages.scrollTop = chatMessages.scrollHeight;
    })
  }, [])
  console.log(username, eventname, eventId, event_type)
  const [neweMessage, setNeweMessage] = useState([])
  const [messageList, setMessageLiset] = useState([])
  let messageData = []
  async function outputMessage(message) {
    messageData.push(message)
    setMessageLiset(message)
  }
  console.log(messageData)
  console.log(messageList)
  async function outputEventName() {}
  async function outputUsers() {}
  async function listLiveUsers() {
    let cb = await socket.request('liveProducers', { eventId })

    console.log('liveUsers callback: ', cb)

    let data = JSON.parse(cb)

    console.log('liveUsers', data)

    let { eventname, liveUsers } = data

    outputEventName(eventname)
    outputUsers(liveUsers)
  }
  // registerGlobals()
  const invietationLink = `http://${host}/joinEvent?${eventId}`
  console.log(device)
  const [audioinput, setAudioinput] = useState([])
  const [videoinput, setVideoinput] = useState([])
  console.log(audioinput)
  console.log(videoinput)
  async function publish(type) {
    setRestartDisable(false)
    setHaletDisabled(false)
    setScreenDisabled(true)
    setDisabled(true)
    const mediaInputSource = type
    console.log(type)
    console.log('publish--> device: ', device)
    const data = await socket.request('createProducerTransport', {
      forceTcp: false,
      rtpCapabilities: device.rtpCapabilities,
    })
    console.log(data)
    if (data.error) {
      console.error(data.error)
      return
    }
    transport = device.createSendTransport(data)
    console.log('transport: ', transport)
    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      socket
        .request('connectProducerTransport', {
          transportId: transport.id,
          dtlsParameters,
        })
        .then(callback)
        .catch(errback)
    })
    transport.on('produce', async (data, callback, errback) => {
      console.log('produce:: data: ', data)
      try {
        const { id } = await socket.request('produce', {
          transportId: transport.id,
          kind: data.kind,
          rtpParameters: data.rtpParameters,
        })
        console.log('producer id ', id)
        callback({ id })
      } catch (err) {
        errback(err)
      }
    })

    transport.on('connectionstatechange', async (state) => {
      console.log('connectionstatechange: ', state)
      switch (state) {
        case 'connecting':
          //   publish_status.innerHTML = `connectionstatechange --> ${state} `;

          //fs_publish.disabled = true;
          break
        case 'connected':
          myVideo.current.srcObject = media_stream
          myVideo.current.muted = true
          //  video_live_event.srcObject = media_stream;
          //
          // publish_status.innerHTML = `connectionstatechange --> ${state} transportId ${transport.id}`;
          if (videoProducer && audioProducer) {
            videoProducer.resume()

            audioProducer.resume()
          }
          break
        case 'disconnected':
          let transportId = transport.id
          let iceparameters = await socket.request('restartProducerIce', {
            transportId,
          })
          if (iceparameters) {
            console.log('restartIce::iceparameters ', { ...iceparameters })
            transport.restartIce({ iceParameters: { ...iceparameters } })
            // publish_status.innerHTML =  `connectionstatechange --> ${state} `;
          } else {
            flag = true
            transport.close()
          }
          break
        case 'failed':
          if (flag) {
            transport.close()
            //  publish_status.innerHTML =  `connectionstatechange --> ${state} `;
          } else {
            let transportId = transport.id
            let iceparams = await socket.request('restartProducerIce', {
              transportId,
            })
            if (iceparams) {
              console.log('restartIce::iceparameters ', { ...iceparameters })
              transport.restartIce({ iceParameters: { ...iceparams } })
            }
          }
          break

        default:
          break
      }
    })
    try {
      media_stream = await getUserMedia(mediaInputSource)
      console.log('media_stream :', media_stream)
      const track = media_stream.getVideoTracks()[0]
      if (media_stream) {
        handleSuccess(media_stream)
      }
      console.log('track --> ', track)
      const params = { track }
      /*  if (chk_Simulcast.checked) {
      params.encodings = [
        { maxBitrate: 100000 },
        { maxBitrate: 300000 },
        { maxBitrate: 900000 },
      ];
      params.codecOptions = {
        videoGoogleStartBitrate : 1000
      };
    }*/
      producer = await transport.produce(params)
      console.log(producer)
      const videoTrack = media_stream.getVideoTracks()[0] //video track
      const audioTrack = media_stream.getAudioTracks()[0] // audio track
      const videoParams = { videoTrack }
      const audioParams = { audioTrack }
      videoProducer = await transport.produce({
        track: media_stream.getVideoTracks()[0],
        encodings: [
          { maxBitrate: 100000 },
          { maxBitrate: 300000 },
          { maxBitrate: 900000 },
        ],
        codecOptions: {
          videoGoogleStartBitrate: 1000,
        },
      })
      /**
       * producing the audio
       */
      audioProducer = await transport.produce({
        track: media_stream.getAudioTracks()[0],
        codecOptions: {
          opusStereo: 1,
          opusDtx: 1,
        },
      })
    } catch (err) {}
  }
  function startRecordMediaStream() {
    console.log('hello startRecordMediaStream')

    if (recordType === 'Start Recording') {
      startRecording()
    } else {
      stopRecording()
    }
  }
  function getSupportedMimeTypes() {
    const possibleTypes = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus',
      'video/webm;codecs=h264,opus',
      'video/mp4;codecs=h264,aac',
    ]
    let supportedMiMeType = possibleTypes.filter((mimeType) => {
      return MediaRecorder.isTypeSupported(mimeType)
    })
    console.log('supportedMiMeType: ', supportedMiMeType)
    /**
     *
     */ let supported = []
    supportedMiMeType.forEach((device) => {
      console.log(device)
      supported.push(device)
    })
    setMimType(supported)
  }
  function handleSuccess(stream) {
    //recordButton.disabled = false;
    console.log('getUserMedia() got stream:', stream)
    window.stream = stream
    startRecordMediaStream()
  }
  console.log(mimType)
  function startRecording() {
    console.log('startRecording: ')
    recordedBlobs = []
    // const mimeType = mimType[0]
    //const options = mimType.split(';', 1)[0];
    //console.log(mimeType)
    const options = { mimeType: mimType[0] }
    try {
      console.log(options)
      mediaRecorder = new MediaRecorder(window.stream, options)
      console.log('mediaRecorder: ', mediaRecorder)
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e)
      // recordButton.innerH\TML = `Exception while creating MediaRecorder: ${JSON.stringify(e)}`;
      return
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options)
    setRecordType('')
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event)
      console.log('Recorded Blobs: ', recordedBlobs)
    }
    mediaRecorder.start()
    mediaRecorder.ondataavailable = function (event) {
      console.log('jlnjkbjhg')
      console.log('handleDataAvailable', event)
      recordedBlobs.push(event.data)
    }
    console.log(recordedBlobs)
    console.log('hello')
    console.log('MediaRecorder started', mediaRecorder)
  }
  function stopRecording() {
    console.log(mediaRecorder)
    mediaRecorder.stop()
  }
  function previewRecordedMediaStream() {
    console.log('helo previewRecordedMediaStream')
    console.log(mimType)
    const mimeType = mimType[0].split(';', 1)[0]
    console.log('mimeType: ', mimeType)
    const superBuffer = new Blob(recordedBlobs, { type: mimeType })
    console.log('superBuffer: ', superBuffer)
    // video_live_event.srcObject = null;
    liveEvent.src = window.URL.createObjectURL(superBuffer)
    liveEvent.controls = true
    liveEvent.play()
  }
  async function getUserMedia(mediaInputSource) {
    if (!device.canProduce('video')) {
      console.error('cannot produce video')
      return
    }
    let stream
    console.log('mediaInputSource@sw: ', mediaInputSource)
    console.log(stream)
    try {
      switch (mediaInputSource) {
        case 'webcam':
          console.log(mediaInputSource)
          stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { max: 1280 },
              height: { max: 720 },
              aspectRatio: { 12: 9 }, //{ideal: 1}
            },
            audio: {
              autoGainControl: false,
              googAutoGainControl: false,
              channelCount: 2,
              echoCancellation: false,
              latency: 0,
              noiseSuppression: false,
              sampleRate: 48000,
              sampleSize: 16,
              volume: 1.0,
            },
          })
          break
        case 'screen':
          console.log(mediaInputSource)
          stream = await navigator.mediaDevices.getDisplayMedia({
            video: {
              width: { max: 1280 },
              height: { max: 720 },
              aspectRatio: { ideal: 1 },
            },
            audio: {
              autoGainControl: false,
              googAutoGainControl: false,
              channelCount: 2,
              echoCancellation: false,
              latency: 0,
              noiseSuppression: false,
              sampleRate: 48000,
              sampleSize: 16,
              volume: 1.0,
            },
          })
          break
        case 'externalSource':
          stream = await getStream()
          break
        default:
          break
      }
    } catch (err) {
      console.error('getUserMedia(isWebcam) failed --> ', err.message)
      throw err
    }
    return stream
  }
  async function haltLivestream() {
    // username, eventname, id, event_type
    let isProducerTransportClosed = await socket.request('haltliveStream', {
      username,
      eventname,
      eventId,
      event_type,
    })
    console.log('isProducerTransportClosed: ', isProducerTransportClosed)
    if (isProducerTransportClosed) {
      console.log('live event is disabled')
      setScreenDisabled(true)
      setDisabled(true)
      setInputUserDeviecs(true)
      setRecordType(null)
      console.log(setRecordType)
      stopRecording()
      handleClickOpenLive()
    }
    // props.history.push('/creatLiveEvent');
  }
  console.log(recordType)
  function resolveAfterXSeconds(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(x)
      }, x * 10 ** 3)
    })
  }
  async function available_Devices() {
    await navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { max: 1280 },
          height: { max: 720 },
        },
        audio: {
          autoGainControl: false,
          googAutoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
          volume: 1.0,
        },
      })
      .then((p) => {
        navigator.mediaDevices
          .enumerateDevices()
          .then((deviceList) => {
            let audioinputDevice = []
            let videoInputDevice = []
            deviceList.forEach((device) => {
              if (device.kind === 'audioinput') {
                audioinputDevice.push(device)
                console.log(device.kind)
              }
              if (device.kind === 'videoinput') {
                videoInputDevice.push(device)
                console.log(device.kind)
              }
            })
            console.log(audioinputDevice)
            setAudioinput(audioinputDevice)
            setVideoinput(videoInputDevice)
            console.log('the avialable device is ', deviceList)
            console.log(
              deviceList[0].kind +
                ': ' +
                deviceList[0].label +
                ' id = ' +
                deviceList[0].deviceId,
            )
          })
          .catch((err) => {
            console.log('error getting MediaDeviceInfo list', err)
          })
      })
  }
  function downloadRecordedMediaStream() {
    const blob = new Blob(recordedBlobs, { type: 'video/webm' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${eventname}.webm`
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }, 100)
  }
  async function updateDevices() {
    setOpenAlert(true)
    await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: {
          autoGainControl: false,
          googAutoGainControl: false,
          channelCount: 2,
          echoCancellation: false,
          latency: 0,
          noiseSuppression: false,
          sampleRate: 48000,
          sampleSize: 16,
          volume: 1.0,
        },
      })
      .then((p) => {
        navigator.mediaDevices
          .enumerateDevices()
          .then((deviceList) => {
            let audioinputDevice = []
            let videoInputDevice = []
            deviceList.forEach((device) => {
              if (device.kind === 'audioinput') {
                audioinputDevice.push(device)
                console.log(device.kind)
              }
              if (device.kind === 'videoinput') {
                videoInputDevice.push(device)
                console.log(device.kind)
              }
            })
            console.log(audioinputDevice)
            setAudioinput(audioinputDevice)
            setVideoinput(videoInputDevice)
            console.log('the avialable device is ', deviceList)
            console.log(
              deviceList[0].kind +
                ': ' +
                deviceList[0].label +
                ' id = ' +
                deviceList[0].deviceId,
            )
          })
          .catch((err) => {
            console.log('error getting MediaDeviceInfo list', err)
          })
      })
  }
  navigator.mediaDevices.ondevicechange = function (event) {
    updateDevices()
  }
  function getStream() {
    let audioInput = inputAudieo
    let videoIn = inputVideo
    console.log(
      'external source: ' +
        ' audioInput Id:  ' +
        audioInput +
        '  videoInput Id: ' +
        videoIn,
    )
    let constraints = {
      audio: { deviceId: audioInput ? { exact: audioInput } : undefined },
      video: { deviceId: videoIn ? { exact: videoIn } : undefined },
    }
    try {
      let stream = navigator.mediaDevices.getUserMedia(constraints)
      return stream
    } catch (error) {
      console.log('external src: stream: ', error)
    }
  }
  let cameraPreview = document.getElementById('videoEvent')
  let liveEvent = document.getElementById('videoEvent')
  const [inputAudieo, setInputAudieo] = useState('')
  const [inputVideo, setInputVideo] = useState('')
  console.log(inputAudieo)
  const [openLiveVideo, setLiveVideo] = React.useState(false)
  const handleClickOpenLive = () => {
    setLiveVideo(true)
  }
  const handleCloseLive = () => {
    setLiveVideo(false)
  }

  console.log(messageList)
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
    socket.emit('chatMessage', { eventId, username, message })
  }
  const [openAlert, setOpenAlert] = React.useState(false)
  const handleClosedLive = () => {
    props.history.push('/creatLiveEvent')
  }

  const [copied, setCopied] = useState(false)
  function copy() {
    const el = document.createElement('input')
    el.value = `http://${host}/joinEvent?${eventId}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setCopied(true)
  }
  async function restart() {
    let transportId = transport.id

    let iceparameters = await socket.request('restartProducerIce', {
      transportId,
    })
    console.log('restartIce::iceparameters ', { ...iceparameters })
    transport.restartIce({ iceParameters: { ...iceparameters } })
  }
  const [users, setUsers] = React.useState([])

  const getAllUser = () => {
    axios.get(`${url}admin/getAllUser`).then((response) => {
      if (response) {
        //console.log(response.data.users);
        // console.log(response.data.success.thumbnialFilePath);
        console.log(response)
        setUsers(response.data.users)
        let userName = response.data.users.username
        let privateId = eventId
        axios
          .get(`${url}user/getAllPrivatUser/${userName}/${privateId}`)
          .then((response) => {})
      } else {
        console.log('field  to get the video data')
      }
    })
  }
  const user = useSelector((state) => state.login.userInformation)
  let exactUser = users.filter((element) => element.username !== user.username)
  console.log('vvv', exactUser)
  const [data, setData] = React.useState([])
  const getUserValue = (e) => {
    let isChecked = e.target.checked
    if (isChecked) {
      setData([...data, { name: e.target.value, eventIdd: eventId }])
    } else {
      setData(data.filter((element) => e.target.value !== element.name))
    }
  }

  const addNewUser = () => {
    setUserModal(true)
  }
  console.log(data)
  const [userModal, setUserModal] = useState(false)
  const handleCloseUserModal = () => {
    setUserModal(false)
  }
  const handleConfriem = () => {
    setUserModal(false)
    axios.post(`${url}user/createUser`, data).then((response) => {
      console.log(response)
    })
  }
  const [text, setText] = React.useState('')
  const handleSearch = (rows) => {
    console.log(rows)
    return rows.filter(
      (row) =>
        row.username.toString().toLowerCase().indexOf(text.toLowerCase()) > -1,
    )
  }

  const theme = useTheme()
  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
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
          onClick={() => restart()}
        >
          <RestoreIcon />
        </IconButton>
      </Tooltip>
      {event_type === 'Private' && (
        <Tooltip
          title="Add Newe User to this stream"
          color="secondary"
          classes={{
            tooltip: classes.customTooltip,
            arrow: classes.customArrow,
          }}
          aria-label="add"
          arrow
        >
          <IconButton
            className={classes.buttonRestart}
            onClick={() => {
              addNewUser()
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      <Container>
        <div>
          <Row>
            <div>
              <video ref={myVideo} controls autoplay playsinline></video>
            </div>
          </Row>
          <div className="liveStream">
            <Row>
              <Col lg={5}>
                <Button
                  disabled={webCameDisabled}
                  name="webcam"
                  size=""
                  className={classes.button}
                  value="webcam"
                  startIcon={<Camera />}
                  onClick={(e) => {
                    publish('webcam')
                  }}
                >
                  webcam
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={haletDisable}
                  styel={{ width: '70px' }}
                  size=""
                  className={classes.button}
                  startIcon={<StopScreenShareIcon />}
                  onClick={() => {
                    handleClickOpen()
                  }}
                >
                  Halt Stream
                </Button>
              </Col>
            </Row>
            <Row>
              <Col lg={5}>
                <Button
                  disabled={screenDisabled}
                  name="screen"
                  size=""
                  className={classes.button}
                  value="screen"
                  startIcon={<ScreenShareIcon />}
                  onClick={(e) => {
                    publish('screen')
                  }}
                >
                  ScreenShare
                </Button>
              </Col>
              <Col>
                <Button
                  size=""
                  disabled={publieshExternal}
                  className={classes.button}
                  startIcon={<HardwareIcon />}
                  onClick={() => {
                    handleClickOpenInput()
                  }}
                >
                  Use External Source
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <form
                  onSubmit={SendMessage}
                  style={{ marginLeft: '25px', display: 'flex' }}
                >
                  <textarea
                    className="text"
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
                  {messageList.username} {messageList.text}
                </div>
              </Col>
            </Row>
            <Col>
              {event_type === 'Private' && (
                <Button
                  className={classes.button}
                  startIcon={<AssignmentIcon />}
                  onClick={() => {
                    copy()
                  }}
                >
                  {!copied ? 'Copy link' : 'Copied!'}
                </Button>
              )}
            </Col>
          </div>
        </div>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={openInput}
          onClose={handleCloseInput}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={handleCloseInput}>
              <Close />
            </IconButton>
          </Box>
          <DialogContent>
            <Box sx={{ minWidth: 170 }}>
              <FormControl style={{ minWidth: 150, marginLeft: '32px' }}>
                <InputLabel style={{ marginTop: '20px', color: 'white' }}>
                  Video Source
                </InputLabel>
                <Select
                  value={inputVideo}
                  style={{
                    backgroundColor: 'teal',
                    color: 'white',
                    marginTop: '40px',
                  }}
                  onChange={(e) => setInputVideo(e.target.value)}
                >
                  {videoinput.map((iteam, index) => (
                    <MenuItem value={iteam.deviceId}>{iteam.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl style={{ minWidth: 150, marginLeft: '32px' }}>
                <InputLabel style={{ marginTop: '20px', color: 'white' }}>
                  Audieo Source
                </InputLabel>
                <Select
                  value={inputAudieo}
                  style={{
                    backgroundColor: 'teal',
                    color: 'white',
                    marginTop: '40px',
                  }}
                  onChange={(e) => setInputAudieo(e.target.value)}
                >
                  {audioinput.map((iteam, index) => (
                    <MenuItem value={iteam.deviceId}>{iteam.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseInput}
              className={classes.button}
              variant="contained"
            >
              No
            </Button>
            <Button
              onClick={() => {
                handleCloseInput()
                publish('externalSource')
              }}
              className={classes.button}
              variant="contained"
            >
              Publish
            </Button>
          </DialogActions>
        </Dialog>
        {isMatch ? (
          <Dialog
            classes={{
              paper: classes.dialogResponcieve,
            }}
            maxWidth="sm"
            open={userModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleCloseUserModal}>
                <Close />
              </IconButton>
            </Box>
            <DialogTitle style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                variant="outlined"
                className={classes.borderTextField}
                placeholder="Search Users"
                value={text}
                //   value={user.userName}
                onChange={(e) => setText(e.target.value)}
              />
            </DialogTitle>
            <DialogContent>
              {text && (
                <div>
                  {handleSearch(users).map((user, index) => {
                    return (
                      <List
                        sx={{
                          minWidth: 360,
                          bgcolor: 'background.paper',
                          position: 'relative',
                          overflow: 'auto',
                          minHeight: 300,
                          '& ul': { padding: 0 },
                        }}
                      >
                        <FormControlLabel
                          value={user.username}
                          onChange={(e) => getUserValue(e)}
                          control={<Checkbox />}
                          label={user.username}
                        />
                      </List>
                    )
                  })}
                  <Divider />
                </div>
              )}{' '}
              <List
                sx={{
                  minWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  minHeight: 300,
                  '& ul': { padding: 0 },
                }}
              >
                <FormGroup>
                  {users.map((item) => (
                    <FormControlLabel
                      value={item.username}
                      onChange={(e) => getUserValue(e)}
                      control={<Checkbox />}
                      label={item.username}
                    />
                  ))}
                </FormGroup>
              </List>
            </DialogContent>
            <Button
              className={classes.button}
              onClick={handleConfriem}
              endIcon={<AddIcon />}
            >
              Confirm & Continue
            </Button>
          </Dialog>
        ) : (
          <Dialog
            maxWidth="sm"
            open={userModal}
            classes={{
              paper: classes.dialog,
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleCloseUserModal}>
                <Close />
              </IconButton>
            </Box>
            <DialogTitle style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                variant="outlined"
                className={classes.borderTextField}
                placeholder="Search Users"
                value={text}
                //   value={user.userName}
                onChange={(e) => setText(e.target.value)}
              />
            </DialogTitle>
            <DialogContent>
              {text && (
                <div>
                  {handleSearch(exactUser).map((user, index) => {
                    return (
                      <List
                        sx={{
                          minWidth: 360,
                          bgcolor: 'background.paper',
                          position: 'relative',
                          overflow: 'auto',
                          minHeight: 300,
                          '& ul': { padding: 0 },
                        }}
                      >
                        <FormControlLabel
                          value={user.username}
                          onChange={(e) => getUserValue(e)}
                          control={<Checkbox />}
                          label={user.username}
                        />
                      </List>
                    )
                  })}
                  <Divider />
                </div>
              )}{' '}
              <List
                sx={{
                  minWidth: 360,
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  minHeight: 300,
                  '& ul': { padding: 0 },
                }}
              >
                <FormGroup>
                  {exactUser.map((item) => (
                    <FormControlLabel
                      value={item.username}
                      onChange={(e) => getUserValue(e)}
                      control={<Checkbox />}
                      label={item.username}
                    />
                  ))}
                </FormGroup>
              </List>
            </DialogContent>
            <Button
              className={classes.button}
              onClick={handleConfriem}
              endIcon={<AddIcon />}
            >
              Confirm & Continue
            </Button>
          </Dialog>
        )}
        <Dialog
          maxWidth="sm"
          fullWidth
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.dialogTitle}>
            <IconButton
              styel={{ marginLeft: '20px' }}
              disableRipple
              className={classes.titleIcon}
            >
              <NotListedLocationIcon />
            </IconButton>
          </DialogTitle>
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
              onClick={() => {
                handleClose()
           
              }}
              className={classes.button}
              variant="contained"
            >
              No
            </Button> 
            <Button
              onClick={() => {
                handleClose()
                haltLivestream()
              }}
              className={classes.button}
              variant="contained"
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          maxWidth="sm"
          fullWidth
          open={openLiveVideo}
          onClose={handleClosedLive}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className={classes.dialogTitle}>
            <IconButton
              styel={{ marginLeft: '20px' }}
              disableRipple
              className={classes.titleIcon}
            >
              <NotListedLocationIcon />
            </IconButton>
          </DialogTitle>

          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={handleCloseLive}>
              <Close />
            </IconButton>
          </Box>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              would you like to dowunload the live stream
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClosedLive}
              className={classes.button}
              variant="contained"
            >
              No
            </Button>

            <Button
              onClick={() => {
                downloadRecordedMediaStream()
                handleClosedLive()
              }}
              className={classes.button}
              variant="contained"
            >
              Dowunload
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <div>
        <Box sx={{ width: '30%' }}>
          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              New Devices is available
            </Alert>
          </Collapse>
        </Box>
      </div>
    </div>
  )
}

export default LiveEventOriginal
