import React, { useState ,Fragment} from 'react'
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useAlert } from 'react-alert'
import { CircularProgress } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip'
import { toast } from 'react-toastify';
import { url } from '../../../utils/url';
import { config } from '../../../utils/header';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {useHistory } from 'react-router';
import {

  ProgressBar,
  
} from "react-bootstrap"
//import alert from 'react-alert'
let imageFile,videoFile
const useStyles = makeStyles(theme => ({
	root: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '550px'
	},
	container: {
		opacity: '0.8',
		height: '90%',
    width:"70%",
//		marginTop: theme.spacing(3),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '90%',
			height: '100%'
		}
	},
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: 'rgba(220, 0, 78, 0.8)',
  },

  customNeweTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: 'teal',
  },
  //
  customArrow: {
    color: 'teal',
  },
  grow: {
    flexGrow: 1,
  },
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        marginBottom:"40px"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1)
	},
	button: {
		margin: theme.spacing(3, 0, 2),
    backgroundColor:'teal',
    color:'white',
    '&:hover': {
			backgroundColor: 'teal',
			color: 'white',
		},

	},
    butttonWith:{
        display:"flex",
        width:"100%",
    },
	formLabel: {
		color: '#000',
		'&.Mui-focused': {
		  color: '#000',
		  display:'none'
		}
	  },
	borderTextField: {                           // - The TextField-root
               // - Make the border more distinguishable

        // (Note: space or no space after & matters. See SASS "parent selector".)
        '& .MuiOutlinedInput-root': {  // - The Input-root, inside the TextField-root
            '& fieldset': {            // - The <fieldset> inside the Input-root
                borderColor: 'teal', 
				border: 'solid 3px ', 
				borderRadius:'30px'
			 // - Set the Input border
            },
            '&:hover fieldset': {
                borderColor: 'teal',
				border: 'solid 3px ', 
				borderRadius:'30px'
				 // - Set the Input border when parent has :hover
            },
            '&.Mui-focused fieldset': {
				label:{
display:'none'
				}, // - Set the Input border when parent is focused 
                borderColor: 'teal',
				border: 'solid 3px ',
            },
        },
    },
	hover:{
		'&:hover': {
			backgroundColor: 'brown',
			color: 'white',
		},
	},
	input: {
		'&::placeholder': {
		  fontStyle: 'italic',
		  textOverflow: "ellipsis !important",
		  color: "black",
		  fontSize: 16
		},
	  },
      input:{
display: 'none'
    },
    faceImage: {
        color: theme.palette.primary.light,
      },
      customHoverFocus: {
        "&:hover, &.Mui-focusVisible, &:active": {
            backgroundColor: "teal",
          },
          "&$buttonDisabled": {
            color: "brown"
          },
      }
}))
const UploadVideo = (props) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const isUserLogged = useSelector((state) => state.login.loggedUser);
 React.useEffect(() => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      console.log('no token')
    props.history.push('/');
      }
  }, []);
    const [form, setFormData] =React.useState({
        Title: '',
        Descrieption: '',
        video: null,
      });
     const[forVideo,setVideo]=React.useState({video:null})
      const [newData, setNewData] =React.useState({
        image: null,
      });
      const header= {headers: {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    }
    const[imageAlert,setOpenImageAlert]=useState(false)
    const[videoAlert,setVideoAlert]=useState(false)
      function imageUploadHandler(event) {
        imageFile=event.target.files[0]
        const inputValue =
          event.target.name === 'image' ? event.target.files[0] : event.target.value;
        setNewData({
          ...newData,
          [event.target.name]: inputValue,
        });
  setOpenImageAlert(true)
      }
      function videoHandler(event) {
        videoFile=event.target.files[0]
        console.log(videoFile)
        const inputValue = event.target.files[0];
        setVideo({
          ...forVideo,
          [event.target.name]: inputValue,
        });
        setVideoAlert(true)
      }
      function handleChange(event) {
      //  videoFile=event.target.files[0]
        const inputValue =event.target.value;
        setFormData({
          ...form,
          [event.target.name]: inputValue,
        });
      }
      const [open, setOpen] = React.useState(true);
      const [openScu, setOpenScu] = React.useState(true);
       const[isDOne,setIsDone]=useState(false)
      const user = useSelector((state) => state.login.userInformation);

 const [progressValue, setProgressVlue] = useState()
 const configProgress = {
  onUploadProgress: (progressEvent) => {
    let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log("the value of  oprogress is",progress)
    setProgressVlue({ progress });
  }
};
const history=useHistory();
 const[inValidIMage,setInvaliedImage]=useState(null)
      const [loading, setLoading] = useState(false);
      const validate = (e) => {
    
        e.preventDefault();
        	
		let isValid = true;
    if (!imageFile) {
      setInvaliedImage( "Please select image.")
      setOpen(true)
  
      isValid = false;
    }
    if(form.Title.length<0){
      setInvaliedImage("Title is required")
      isValid=false
      setOpen(true)
    }
    if (!videoFile) {
   
      setInvaliedImage( "Please select video.")
      isValid = false;
      setOpen(true)
    }//mp4|mkv|ts|mkv
    if(videoFile && !videoFile.name.match(/\.(mp4|mkv|ts|mkv)$/)){
      setInvaliedImage( "Please select valid video format.")
      isValid=false
      setOpen(true)
    }
  
    console.log(forVideo.video)
    if (imageFile && !imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setInvaliedImage( "Please select valid image.")
      isValid = false;
      setOpen(true)
    }
    if (isValid) {
		  onSubmit();
	
		}
      }
      let token = localStorage.getItem('token');
async  function onSubmit() {
  console.log('bbb')
  const username = user.username;
  setLoading(true)

    const imageAppend = new FormData();
    imageAppend.append('image', newData.image);
    console.log(newData.image)
    axios.post(`${url}video/thumbnail`, imageAppend).then((response) => {

      console.log(response.data);
      console.log(response.data.imageName)
      console.log(response.data.imagePath)
      const videoAppend = new FormData();
      videoAppend.append('Title', form.Title);
      videoAppend.append('Descrieption', form.Descrieption);

      videoAppend.append('video', forVideo.video);
    videoAppend.append('username', username);
      videoAppend.append('thumbnialFilePath',response.data.imagePath)
      videoAppend.append('thumbnialFileName',response.data.imageName)
      console.log(form.Title)
  
     // console.log(username)
      console.log(form.Descrieption)
      console.log(config)
      
   axios
        .post(`${url}video/uploadVideo`,videoAppend,{
          onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgressVlue(Math.round((100 * data.loaded) / data.total))
          },
                    headers: {
             "Authorization" : `Bearer ${token}`
           }
         },)
        .then((response) => {
     console.log(response)
          if (response.data.resualt) {
            setIsDone(true)
            setOpenScu(true)
            setLoading(false)
          } 
          if(response.data.msg==='Token is not valid'){
            history.push('/login')
            localStorage.clear();
            toast.info('token is expired! ', {
              position: 'top-right',
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
             pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          
          }
        })
      })
  }

  const classes=useStyles()
    const closedUpload=()=>{
      props.history.push('/')
    }
    
	return (
    <div>
       {!localStorage.getItem('user_id') || !localStorage.getItem('token')?(
      toast.info('Log to upload your video! ', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })):(
		<Grid container component='main' className={classes.root}>
 
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
      <CloseIcon onClick={closedUpload}/>
				<div className={classes.div}>
        {inValidIMage&&
					  <Collapse in={open}>
            <Alert severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                    <AlertTitle></AlertTitle>
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
           {inValidIMage}
            </Alert>
          </Collapse>
}  {isDOne && (
                  <Collapse in={openScu}>
                    <Alert
                      severity="success"
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setOpenScu(false)
                          }}
                        >
                          <AlertTitle></AlertTitle>
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      Your video is upload successfully
                    </Alert>
                  </Collapse>
                )}
					<form className={classes.form}>
                    <Fragment>
        <input
            accept="image/*"
            className={classes.input}
            id="icon-button-photo"
           // onChange={this.handleCapture}
            type="file"
            name='image'
            onChange={imageUploadHandler}
        />
             <Tooltip  
               classes={{

                tooltip: classes.customTooltip,
                arrow: classes.customArrow,
              }}
             style={{marginLeft:"130px"}} title="Select Image"
             color='secondary'>
        <label htmlFor="icon-button-photo">
            <IconButton 
            // className={classes.customHoverFocus}
         
            component="span"
            size="large"
            aria-label="upload picture"
        
            >
               {imageFile ?<PhotoCamera style={{color:'teal'}} /> :<PhotoCamera color="primary" />}
            </IconButton>
        </label>
</Tooltip>
        <input
            accept="video/*"
            capture="camcorder"
            className={classes.input}
            id="icon-button-video"
          //  onChange={this.handleCapture}
            type="file"
            size="large"
            onChange={videoHandler}
            name='video'
        />
         <Tooltip
       
           color='secondary'
           classes={{
            tooltip: classes.customTooltip,
            arrow: classes.customArrow,
          }}
          title="Select Video">
        <label htmlFor="icon-button-video">
            <IconButton 
       //  className={classes.customHoverFocus}
            component="span">
             {videoFile  ? <Videocam style={{color:'teal'}}/>:<Videocam color="primary" />}
            </IconButton>
        </label>
        </Tooltip>

    </Fragment>
    {imageFile&&
    	  <Collapse in={imageAlert}>
    <Alert severity="success" 
           action={
             <IconButton
               aria-label="close"
               color="inherit"
               size="small"
               onClick={() => {
                 setOpenImageAlert(false);
               }}
             >
                 <AlertTitle></AlertTitle>
               <CloseIcon fontSize="inherit" />
             </IconButton>
           }
           sx={{ mb: 2 }}>{imageFile.name}</Alert>
    </Collapse>
    }
    {videoFile&&
    	  <Collapse in={videoAlert}>
    <Alert severity="success" 
           action={
             <IconButton
               aria-label="close"
               color="inherit"
               size="small"
               onClick={() => {
                 setVideoAlert(false);
               }}
             >
               <CloseIcon fontSize="inherit" />
             </IconButton>
           }
           sx={{ mb: 2 }}>{videoFile.name}</Alert>
    </Collapse>
    }
						<TextField
							fullWidth
							autoFocus
							className={classes.borderTextField}
			 				color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Title'
						
                name='Title'
                            // value={}
                             //onChange={(e) => {setEmaileAdmin(e.target.value)   }}
                             onChange={handleChange}
                         />
						<TextField
							fullWidth
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Descrieption'
							className={classes.borderTextField}
						    name='Descrieption'
                onChange={handleChange}
						/>	
						<Button
							fullWidth
							variant='contained'
              style={{marginBottom:"20px"}}
							color='teal'
							className={classes.button}
              onClick={(event) => validate(event)}
						>
		Submit
						</Button>
       
          	</form>
            
        	</div>
          {isDOne ?(
          <span>
          { progressValue && (
              <ProgressBar striped animated variant="success" now={progressValue} label={`${progressValue}%`} />
            )}
            </span>
):(
  <span>
  { progressValue && (
      <ProgressBar striped animated variant="warning" now={progressValue} label={`${progressValue}%`} />
    )}
    </span>
)
          }
			</Container>
		</Grid>
      )}
    </div>
	)
}
export default UploadVideo
