import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async";
import TextField from'@material-ui/core/TextField'
import { CircularProgress } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { recoverPasswordSlice } from '../../slices/recover_password';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { loginSlice } from '../../slices/login';
import axios from 'axios';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { url } from '../../utils/url';
const useStyles = makeStyles(theme => ({
	root: {
		marginBottom:"50px",
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '400px',

	},
	container: {
		opacity: '0.8',
		height: '90%',
		width:"50%",
	
		//marginTop: theme.spacing(3),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '100%',
			height: '100%'
		}
	},
	div: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
        marginBottom:"40px"
	},
	avatar: {
		
	//	margin: theme.spacing(1),
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
}))

const Register = (props) => {
	const [progress, setProgress] = React.useState(0);

	React.useEffect(() => {
	  const timer = setInterval(() => {
		setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
	  }, 800);
  
	  return () => {
		clearInterval(timer);
	  };
	}, []);
    const recoverPasswowrdActions = recoverPasswordSlice.actions;
	const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()
    const dispatch = useDispatch();
	const loginActions = loginSlice.actions;

	// const recoverPasswowrdActions = recoverPasswordSlice.actions;

	const { user_identifier, password } = useSelector(
	  (state) => state.login.inputValues
	);
	const { user_IdentifierErr, passwordErr } = useSelector(
	  (state) => state.login.inputErrors
	);
	const isLoading = useSelector((state) => state.login.isLoading);
    const showRecoverPassword = () => {
        dispatch(recoverPasswowrdActions.setIsOpen(true));
        document.body.style.overflow = 'hidden';
      };

	const validate = (e) => {
		e.preventDefault();
		// Resetting input errors to default
		dispatch(loginActions.setPasswordErr(''));
		dispatch(loginActions.setEmailErr(''));
	
		let isValid = true;
		if (password.length < 6) {
		  dispatch(
			loginActions.setPasswordErr('Password should be atleast 6 characters!')
		  );
		  isValid = false;
		}
	
		if (isValid) {
		 requestLogin();
		}
	  };

	  const requestLogin = () => {
		dispatch(loginActions.setIsLoading(true));
		axios
		  .post(`${url}login/`, {
			user_identifier: user_identifier,
			password: password,
		  })
		  .then(
			(response) => {
			  if (response.data.emailFailure) {
				dispatch(loginActions.setEmailErr('Email address does not exist!'));
			  } else if (response.data.passwordFailure) {
				dispatch(loginActions.setPasswordErr('Incorrect password!'));
			  } else if (response.data.Notverified) {
				dispatch(loginActions.setEmailErr('Email Address not verified !'));
			  } else if (response.data.emailOrUserNameFailure) {
				dispatch(
				  loginActions.setEmailErr('user name or email is not correct')
				);
			  }
			  else if (response.data) {
				console.log(response.data.token)
				
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('user_id', response.data.id);
				localStorage.setItem('loginInfo', JSON.stringify(response.data));
				localStorage.setItem(
					'userInfo',
					JSON.stringify(response.data))
				dispatch(loginActions.setIsUserLogged(true));
				dispatch(loginActions.setLoggedUser(response.data));
				dispatch(loginActions.setUserInformation(response.data));
			props.history.push(`/`);
			  }
			  dispatch(loginActions.setIsLoading(false));
			},
			(error) => {
			  console.log(error);
			  dispatch(loginActions.setIsLoading(false));
			}
		  );
	  };
	  
	  const googleAuth = () => {
		window.location.href = `${url}auth/google`;
	  };
	  const facebookAuth = () => {
		window.location.href = `${url}auth/facebook`;
	  };

	  const handleClosed=()=>{
		props.history.push('/')
	  }

	return (
		<>
		     <Helmet>
        <title>Login</title>
        <meta name="description" content="Login in to the system now products now." />
        <link rel="canonical" href="/login" />
      </Helmet>
		<Grid container component='main'  className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
			<IconButton style={{float:"right"}}><CloseIcon color="action" onClick={handleClosed}/></IconButton>
				<div className={classes.div}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Sign In</Typography>
				
					<form className={classes.form}>
						<TextField
							fullWidth
							autoFocus
							className={classes.borderTextField}
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Email or User Name'
							name='nickname'
							InputLabelProps={{
								className: classes.formLabel 
							  }}
							value={user_identifier}
							onChange={(e) => {
								dispatch(loginActions.setUser_Identifier(e.target.value));
							  }}
							  InputProps={{
								classes: { input: classes.input}
							  }}
						/>
						    <div style={{color:"brown"}}>{user_IdentifierErr}</div>
						<TextField
							fullWidth
							type='password'
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Password'
							name='password'
							className={classes.borderTextField}
					
							InputProps={{
								classes: { input: classes.input}
							  }}
							  		value={password}
							onChange={(e) => {
							  dispatch(loginActions.setPassword(e.target.value));
							}}
          
						/>
						  <div style={{color:"brown"}}>{passwordErr}</div>
						  <div className='loading'>{isLoading &&<CircularProgress variant="determinate" value={progress} />}</div>
						<Button
							fullWidth
							variant='contained'
                            style={{marginBottom:"20px"}}
							color='teal'
							className={classes.button}
							onClick={(event) => validate(event)}
						>
							Sign In
						</Button>
                       
					</form>
                    <div style={{marginBottom:"20px"}}> Or  Login With</div>
                    <div className={classes.butttonWith}>
                        <Button
							fullWidth
							variant='contained'
							color='teal'
							className={classes.button}
							onClick={() => facebookAuth()}
                                   style={{width:"200px",marginTop:"1px",marginRight:"40px"}}
						>
						<FacebookIcon/>
						</Button>
                        <Button
							fullWidth
                            style={{width:"200px",marginTop:"1px"}}
							variant='contained'
							color='teal'
							className={classes.button}
							onClick={() => googleAuth()}
						>
					<GoogleIcon/>
						</Button>
                       
                        </div>
<div >Don't have an account?
<Link to='/register' style={{marginLeft:"10px",textDecoration:'none'}} >Register here</Link>
</div>
<div style={{marginRight:"19px", marginTop:"15px"}} className='login-bottom-item'>
          <div className='text'>Lost password?
          <button style={{marginLeft:"10px"}} className='link' onClick={showRecoverPassword}>
          
            Recover password</button>
          </div>
          </div>

				</div>
			</Container>
		</Grid>
		</>
	)
}

export default Register
