/*

*/
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Divider from '@mui/material/Divider'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@mui/icons-material/Close'
import TextField from '@material-ui/core/TextField'
import { useSelector } from 'react-redux'
import ForwardIcon from '@mui/icons-material/Forward'
import LiveTvIcon from '@mui/icons-material/LiveTv'
import { url } from '../../utils/url'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import { toast } from 'react-toastify'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { useHistory } from 'react-router-dom'
import FormLabel from '@mui/material/FormLabel'
import jwt_decode from 'jwt-decode'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import CheckIcon from '@mui/icons-material/Check'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { List, ListItem, ListItemText } from '@material-ui/core/'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import Box from '@mui/material/Box'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import Paper from '@mui/material/Paper'
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: 'teal',
    '&:hover': {
      backgroundColor: 'teal',
    },
  },
  buttonRes: {
    margin: theme.spacing(1),
    marginRight: '30px',
    marginTop: '80px',
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
  TeaxtArea: {
    width: 800,
  },
  hiddenScroll: {
    overflow: 'hidden',
  },
  chip: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '& .MuiAvatar-root': {
      margin: '4px 0px',
    },
    '& .MuiChip-label': {
      wordWrap: 'break-word',
      whiteSpace: 'normal',
      textOverflow: 'clip',
      textAlign: 'center',
      fontSize: 16,
      width: 12,
    },
    '& .MuiChip-deleteIcon': {
      margin: '8px 0px',
    },
  },
  title: {
    top: 0,
  },
}))
let eventId
export default function SimpleModal(props) {
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  let history = useHistory()
  const user = useSelector((state) => state.login.userInformation)

  const [Descrieption, setDescrieption] = React.useState('')
  const [Prievielage, setPrievleige] = React.useState('')
  const [username, setUserName] = React.useState('')
  const [event_name, setEventName] = React.useState('')
  const [testUser, setTestUser] = React.useState([])
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(true)
  const [modalOne, setModalOne] = React.useState(false)
  const [openConfirem, setConfirem] = React.useState(false)
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
  function generate_eventId() {
    return uuidv4()
  }
  eventId = generate_eventId()
  React.useEffect(() => {
    checkTokenExpirationMiddleware()
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      console.log('no token')
      history.push('/')
    } else {
      setUserName(user.username)
    }
    getAllUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClose = () => {
    setOpen(false)
    setModalOne(false)
    props.history.push('/')
  }

  const handleModalOne = () => {
    setOpen(false)
    setModalOne(true)
  }
  const handleCloseConfriem = () => {
    setConfirem(false)
    setOpenScrolle(true)
  }
  const [error, setError] = React.useState('')
  const [userError, setUserError] = React.useState(false)
  const validate = (e) => {
    e.preventDefault()
    let isValid = true
    if (event_name.length < 1) {
      setError('Event Name Is Required')
      isValid = false
    }
    if (Prievielage === 'Private')
      if (data.length === 0) {
        isValid = false
        toast.info(
          'Please Select At Least One User That Follow This Private Event! ',
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
    if (isValid) {
      testUserLive()
    }
  }
  const [data, setData] = React.useState([])
  const [box, setBox] = React.useState('')
  const [checked, setChecked] = React.useState(false)
  const [eventidddddd] = React.useState(eventId)
  const getUserValue = (e) => {
    console.log(eventId)
    let isChecked = e.target.checked
    if (isChecked) {
      setChecked(true)
      setData([...data, { name: e.target.value, eventIdd: eventidddddd }])
    } else {
      setChecked(false)
      setData(data.filter((element) => e.target.value !== element.name))
    }
  }
  console.log(data)
  const testUserLive = () => {
    axios.get(`${url}admin/getLiveUserByName/${username}`).then((responce) => {
      console.log(responce.data.data)
      setTestUser(responce.data.data)
      console.log(responce.data.data.status)
      if (responce.data.data.status === 'live') {
        console.log('user is get privielage from admin')
        setConfirem(true)
        setModalOne(false)
        setOpenScrolle(false)
        const config = {
          headers: {
            'Content-Type': 'application/json',
            mode: 'cors',
          },
        }
        if (Prievielage === 'Public') {
          axios
            .post(
              `${url}user/createEvent`,
              {
                Producer: username,
                EventName: event_name,
                Prievielage: Prievielage,
                Descrieption: Descrieption,
                eventId: eventId,
              },
              config,
            )
            .then((response) => {
              console.log(response)
              console.log(eventId)
              console.log(data.eventIdd)
            })
        } else {
          axios
            .post(
              `${url}user/createEvent`,
              {
                Producer: username,
                EventName: event_name,
                Prievielage: Prievielage,
                Descrieption: Descrieption,
                eventId: data[0].eventIdd,
              },
              config,
            )
            .then((response) => {
              console.log(response)
              console.log(eventId)
              console.log(data.eventIdd)
            })
        }
        axios.post(`${url}user/createUser`, data).then((response) => {
          console.log(response)
        })

        //    props.history.push(`/liveEvent/${username}/${event}/${Prievielage}`);
      } else {
        toast.info('first get from admin to create the livestream! ', {
          position: 'top-right',
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
  }
  const [users, setUsers] = React.useState([])

  const getAllUser = () => {
    axios.get(`${url}admin/getAllUser`).then((response) => {
      if (response) {
        //console.log(response.data.users);
        // console.log(response.data.success.thumbnialFilePath);
        console.log(response)
        setUsers(response.data.users)
      } else {
        console.log('field  to get the video data')
      }
    })
  }
  let exactUser = users.filter((element) => element.username !== user.username)
  console.log('vvv', exactUser)

  const handleConfriem = () => {
    axios.get(`${url}user/EventUser/${event_name}`).then((response) => {
      console.log(response)
      if (response.data.resualt.status === 'Live') {
        const event = event_name.replace(/ /g, '_')
        if (Prievielage === 'Public') {
          props.history.push({
            pathname: '/liveEvent',
            state: {
              username: username,
              Prievielage: Prievielage,
              event: event,
              eventId: eventId,
            },
            //${username}/${event}/${Prievielage})
          })
        } else {
          props.history.push({
            pathname: '/liveEvent',
            state: {
              username: username,
              Prievielage: Prievielage,
              event: event,
              eventId: data[0].eventIdd,
            },
            //${username}/${event}/${Prievielage})
          })
        }
      } else {
        toast.info('for this event you are not get a permistions', {
          position: 'top-right',
          autoClose: 6000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
  }
  console.log(username)
  const handleReques = () => {
    console.log(username)
    ///${videoId}`
    axios.post(`${url}admin/creatStreamUser/${username}`).then((response) => {
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
  console.log(box)
  const handleDelete = (name) => {
    setData(data.filter((element) => name !== element.name))
    setChecked(false)
  }
  const handleCloseOpenScrolle = () => {
    setOpenScrolle(false)
    setOpen(true)
  }
  console.log(checked)
  const out = data.map((d) => d.name)
  console.log(out)
  console.log(data)
  const [openScrolle, setOpenScrolle] = React.useState(false)
  const [scroll, setScroll] = React.useState('paper')
  const descriptionElementRef = React.useRef(null)
  const handleClickOpen = (scrollType) => {
    setOpenScrolle(true)
    setScroll(scrollType)
    setOpen(false)
  }
  return (
    <div>
      {!localStorage.getItem('user_id') || !localStorage.getItem('token') ? (
        toast.info('Login to  creat livestream! ', {
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
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {' '}
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent style={{ marginTop: '20px' }}>
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                variant="outlined"
                className={classes.borderTextField}
                placeholder="UserName"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                className={classes.borderTextField}
                variant="outlined"
                placeholder="Descrieption"
                value={Descrieption}
                onChange={(e) => setDescrieption(e.target.value)}
              />
            </DialogContent>
            <Button
              className={classes.button}
              onClick={() => {
                handleClickOpen('paper')
                handleReques()
              }}
              endIcon={<ForwardIcon />}
            >
              Continue
            </Button>
          </Dialog>
          <MuiThemeProvider>
            <>
              <Dialog open={openConfirem} fullWidth maxWidth="sm">
                <Box position="absolute" top={0} right={0}>
                  <IconButton onClick={handleCloseConfriem}>
                    <Close />
                  </IconButton>
                </Box>
                <DialogTitle
                  id="scroll-dialog-title"
                  style={{ marginTop: '20px' }}
                >
                  Confirm The Event Data
                </DialogTitle>
                <DialogContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="Uesr Name" secondary={username} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Event Name"
                        secondary={event_name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="prievlage"
                        secondary={Prievielage}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Descrieption"
                        secondary={Descrieption}
                      />
                    </ListItem>
                  </List>
                </DialogContent>
                <br />
                <Button
                  className={classes.button}
                  onClick={handleConfriem}
                  endIcon={<CheckIcon />}
                >
                  Confirm & Continue
                </Button>
              </Dialog>
            </>
          </MuiThemeProvider>

          <Dialog
            maxWidth="sm"
            fullWidth
            open={openScrolle}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              <TextField
                fullWidth
                autoFocus
                color="primary"
                margin="normal"
                variant="outlined"
                className={classes.borderTextField}
                placeholder="Enter LiveEvent Name"
                value={event_name}
                //   value={user.userName}
                onChange={(e) => setEventName(e.target.value)}
              />
              <div style={{ color: 'red' }}>{error}</div>
              <div style={{ display: 'flex' }}>
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="Prievielage"
                    name="row-radio-buttons-group"
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    aria-label="Prievielage"
                    value={Prievielage}
                    onChange={(e) => setPrievleige(e.target.value)}
                  >
                    Prievielage
                    <FormControlLabel
                      style={{ marginLeft: '10px' }}
                      value="Public"
                      control={<Radio />}
                      label="Public"
                    />
                    <FormControlLabel
                      value="Private"
                      control={<Radio />}
                      label="Private"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {Prievielage === 'Private' && (
                <div>
                  <Paper
                    sx={{
                      width: '100%',

                      display: 'flex',
                      justifyContent: 'center',
                      flexWrap: 'wrap',
                      border: '3px solid teal',
                      listStyle: 'none',
                      p: 0.5,
                      m: 0,
                    }}
                    component="ul"
                  >
                    <div style={{ padding: '6px 0' }}>
                      {out.length ? (
                        <div>
                          {data.map((iteam, index) => {
                            return (
                              <Chip
                                style={{ margin: 2 }}
                                label={iteam.name}
                                className={classes.chip}
                                onDelete={() => {
                                  handleDelete(iteam.name)
                                }}
                              />
                            )
                          })}
                        </div>
                      ) : (
                        <div style={{ fontSize: '14px', marginLeft: '5px' }}>
                          List Of User That Get Prievielage For This Private
                          Event{' '}
                        </div>
                      )}
                    </div>
                  </Paper>
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
                </div>
              )}
            </DialogTitle>
            {Prievielage === 'Private' && (
              <DialogContent
                style={{ minHeight: '130px', overflow: 'auto' }}
                dividers={scroll === 'paper'}
              >
                <DialogContentText
                  minHeight="80vh"
                  id="scroll-dialog-description"
                  ref={descriptionElementRef}
                  tabIndex={-1}
                >
                  <div style={{ height: '600px' }}>
                    {text && (
                      <div>
                        {handleSearch(exactUser).map((user, index) => {
                          return (
                            <FormControlLabel
                              value={user.username}
                              onChange={(e) => getUserValue(e)}
                              control={<Checkbox />}
                              label={user.username}
                            />
                          )
                        })}
                        <Divider />
                      </div>
                    )}
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
                  </div>
                </DialogContentText>
              </DialogContent>
            )}
            {Prievielage === 'Private' ? (
              <DialogActions
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  height: '20px',
                  paddingBottom: '30px',
                  marginBottom: '30px',
                }}
              >
                <Button
                  onClick={handleCloseOpenScrolle}
                  className={md ? classes.button : classes.buttonRes}
                  endIcon={<LiveTvIcon />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(event) => validate(event)}
                  className={md ? classes.button : classes.buttonRes}
                  endIcon={<LiveTvIcon />}
                >
                  Start Live
                </Button>
              </DialogActions>
            ) : (
              <DialogActions
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  // alignItems: 'center',
                  height: '20px',

                  marginBottom: '20px',
                }}
              >
                <Button
                  onClick={handleCloseOpenScrolle}
                  className={classes.button}
                  endIcon={<LiveTvIcon />}
                >
                  Cancel
                </Button>
                <Button
                  onClick={(event) => validate(event)}
                  className={classes.button}
                  endIcon={<LiveTvIcon />}
                >
                  Start Live
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </div>
      )}
    </div>
  )
}
