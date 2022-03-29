import React, { useState } from 'react'
import { Grid, Container, Paper, Avatar, Typography, Button, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { registerSlice } from '../../slices/register';
import TextField from'@material-ui/core/TextField'
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { url } from '../../utils/url';
import CloseIcon from '@mui/icons-material/Close';
import { Helmet } from "react-helmet-async";
const useStyles = makeStyles(theme => ({
	root: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '1190px',
		marginBottom:"40px"
	
	},
	container: {
		opacity: '0.8',
		height: '100%',
     
		marginTop: theme.spacing(3),
		[theme.breakpoints.down(400 + theme.spacing(2) + 2)]: {
			marginTop: 0,
			width: '600px',
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

	formLabel: {
		color: '#000',
		'&.Mui-focused': {
		  color: '#000',
		  display:'none'
		}
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
	error:{
color:"brown"
	},
	cssLabel: {
		color: "green"
	  },
	
	  cssLabelHide: {
		display: "none"
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
	input: {
		'&::placeholder': {
		  fontStyle: 'italic',
		  textOverflow: "ellipsis !important",
		  color: "black",
		  fontSize: 16
		},
	  },
	  date: {
		marginTop: 0,
		"& .MuiInputBase-root": {
		  border: "1px solid grey",
		  borderRadius: "0.25rem",
		  padding: "0.375rem 0.75rem",
		  "&:focus": { //added here
			borderColor: "#86b7f",
			boxShadow: "0 0 0 0.25rem red"
		  },
		  "&:before": {
			borderBottom: "none"
		  },
		  "&:after": {
			borderBottom: "none"
		  },
		  "&:hover:hover:not(.Mui-disabled):before": {
			borderBottom: "none"
		  },
		  "& .MuiButtonBase-root": {
			padding: 0
		  }
		}
	  }
}))

const Register = (props) => {
	const dispatch = useDispatch();
	const registerAction = registerSlice.actions;

	const {
		FirstName,
		MiddleName,
		LastName,
		email,
		phone,
		age,
		sex,
		password1,
		password2,
		username,
	  } = useSelector((state) => state.register.inputValues);
	const [body, setBody] = useState({ nickname: '', password: '' })
	const classes = useStyles()
    const [date, setDate] = React.useState(new Date());
	const handleChange = e => {
		setBody({
			...body,
			[e.target.name]: e.target.value
		})
	}
	const {
		firstNameErr,
		middleNameErr,
		lastNameErr,
		emailErr,
		phoneErr,
		addressErr,
		password1Err,
		password2Err,
		sexErr,
		userNameErr,
		BirthDateErr,
	  } = useSelector((state) => state.register.inputErrors);
	  const isLoading = useSelector((state) => state.register.isLoading);
	const validate = (e) => {
		e.preventDefault();
		dispatch(registerAction.setFirstNameErr(''));
		dispatch(registerAction.setMiddleNameErr(''));
		dispatch(registerAction.setLastNameErr(''));
		dispatch(registerAction.setEmailErr(''));
		dispatch(registerAction.setPhoneErr(''));
		dispatch(registerAction.setPassword1Err(''));
		dispatch(registerAction.setPassword2Err(''));
		dispatch(registerAction.setUserNameErr(''));
	
		let isValid = true;
		if (FirstName.length < 2) {
		  dispatch(
			registerAction.setFirstNameErr(
			  'first name must be at leas two character'
			)
		  );
		  isValid = false;
		}
		if (MiddleName.length < 2) {
		  dispatch(
			registerAction.setMiddleNameErr(
			  'middle name name must be at leas two character'
			)
		  );
		  isValid = false;
		}	
		if (LastName.length < 2) {
		  dispatch(
			registerAction.setLastNameErr('last name must be at leas two character')
		  );
		  isValid = false;
		}
	    if (phone.replaceAll(' ','').length !== 13) {
      
			dispatch(
				registerAction.setPhoneErr(
				"Invalid phone number"
			  )
			);
			isValid = false;
		  }
	/*	if (phone.replaceAll(' ', ' ').length !== 13) {
		  dispatch(registerAction.setPhoneErr(' Invalid phone number'));
		  isValid = false;
		}*/
		if (username.length < 2) {
		  dispatch(
			registerAction.setUserNameErr(
			  'user name must be atleast two characeter'
			)
		  );
		}
		if (password1 !== password2) {
		  dispatch(registerAction.setPassword2Err('password must be much'));
		  isValid = false;
		}	
		
		 else if (password1.length < 6) {
		  dispatch(
			registerAction.setPassword1Err('password must be atleast 6 character')
		  );
		  isValid = false;
		}
		if (isValid) {
		  sendRequest();
	
		}

	  };
	  const sendRequest = () => {
		const config = {
		  headers: {
			'Content-Type': 'application/json',
			mode: 'cors',
		  },
		};
		dispatch(registerAction.setIsLoading(true));
		dispatch(registerAction.setRegistrationSuccessful(false));
		axios
		  .post(
			`${url}user/register`,
			{
			  FirstName: FirstName,
			  MiddleName: MiddleName,
			  LastName: LastName,
			  phone: phone.replaceAll(' ', ' '),
			  email: email,
			  username: username,
			  password: password1,
			  BirthDate: date,
			  sex: sex,
			},
			config
		  )
		  .then(
			(response) => {
			  dispatch(registerAction.setIsLoading(false));
			  if (response.data.data) {
				console.log(response.data);

				dispatch(registerAction.setRegistrationSuccessful(true));
				document.body.style.overflow = 'visible';
				console.log('1');
				dispatch(registerAction.setPhone(""));
			  }
			  if (response.data.message === 'email already exists') {
				dispatch(
				  registerAction.setEmailErr('email  or user name already exist')
				);
				console.log('2');
			  }
			  if (response.data.message === 'user name already exists') {
				console.log('3');
				dispatch(registerAction.setEmailErr('user name already exist'));
			  }
			},
			(error) => {
			  console.log(error);
			  dispatch(registerAction.setIsLoading(false));
			}
		  );
	  };
	
const habdleClosed=()=>{
	props.history.push('/')
}
	return (
		<>
		 <Helmet>
        <title>register</title>
        <meta name="description" content="register in to the system now products now." />
        <link rel="canonical" href="/register" />
      </Helmet>
		<Grid container component='main' className={classes.root}>
			<CssBaseline />
			<Container component={Paper} elevation={5} maxWidth='xs' className={classes.container}>
				<CloseIcon onClick={habdleClosed}/>
				<div className={classes.div}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>Sign Up</Typography>
					<form className={classes.form}>
						
						<TextField
							InputProps={{
								classes: { input: classes.input}
							  }}
							fullWidth
							autoFocus
							className={classes.borderTextField}
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='First Name'
							name='FirstName'
							value={FirstName}
							id="outlined-name"
					
							onChange={(e) => {
								dispatch(registerAction.setFirstName(e.target.value));
							  }}
						
						/>        <div className={classes.error}>{firstNameErr}</div>
                        	<TextField
								InputProps={{
									classes: { input: classes.input}
								  }}
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Middle Name'
							className={classes.borderTextField}
							name='MiddleName'
							value={MiddleName}
							onChange={(e) => {
								dispatch(registerAction.setMiddleName(e.target.value));
							  }}
						/>    <div className={classes.error}>{middleNameErr}</div>
                        	<TextField
							fullWidth
							InputProps={{
								classes: { input: classes.input}
							  }}
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Last Name'
							name='lastName'
							className={classes.borderTextField}
							value={LastName}
							onChange={(e) => {
								dispatch(registerAction.setLastName(e.target.value));
							  }}
						/>       <div className={classes.error}>{lastNameErr}</div>
                        	<TextField
							InputLabelProps={{
								
								className: classes.formLabel 
							  }}
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							className={classes.borderTextField}
							variant='outlined'
							placeholder='emaile'
							name='nickname'
							value={email}
							onChange={(e) => {
								dispatch(registerAction.setEmail(e.target.value));
							  }}
						/>
						          <div className={classes.error}>{emailErr}</div>
                         	<TextField
							fullWidth
							InputLabelProps={{
								className: classes.formLabel ,
								shrink: true 
							  }}
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							className={classes.borderTextField}
							placeholder='UserName'
							name='nickname'
							value={username}
						    onChange={(e) => {
								dispatch(registerAction.setUserName(e.target.value));
							  }}
						/>  <div className={classes.error}>{userNameErr}</div>
							<TextField
							InputLabelProps={{
								className: classes.formLabel 
							  }}
							fullWidth
							autoFocus
							color='primary'
							margin='normal'
							variant='outlined'
							placeholder='Phone Number'
							className={classes.borderTextField}
							name='phone'
							value={phone}
							onChange={(e) => {
								dispatch(registerAction.setPhone(e.target.value));
							  }}
						/> <div className={classes.error}>{phoneErr}</div>
						<TextField
						InputLabelProps={{
							className: classes.formLabel 
						  }}
							fullWidth
							type='password'
							color='primary'
							className={classes.borderTextField}
							margin='normal'
							variant='outlined'
							placeholder='Password'
							name='password'
							value={password1}
							onChange={(e) => {
								dispatch(registerAction.setPassword1(e.target.value));
							  }}
          
						/>	   <div className={classes.error}>{password1Err}</div>
						<TextField
						InputLabelProps={{
							className: classes.formLabel 
						  }}
						fullWidth
						type='password'
						color='primary'
						margin='normal'
						variant='outlined'
						placeholder='Confirm Password' 
						className={classes.borderTextField}
						name='password'
						value={password2}
						onChange={(e) => {
							dispatch(registerAction.setPassword2(e.target.value));
						  }}
	  
					/>    <div className={classes.error}>{password2Err}</div>
     <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row aria-label="gender" name="row-radio-buttons-group"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          aria-label="gender"
          value={sex}
		  onChange={(e) => {
			dispatch(registerAction.setSex(e.target.value));
		  }}
      >

        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl>
		  <div className='loading'>{isLoading && <CircularProgress />}</div>
						<Button
							fullWidth
							variant='contained'
                            style={{marginBottom:"20px"}}
							color='teal'
							className={classes.button}
							onClick={(event) => validate(event)}
						>
						Sign Up
						</Button>
                       
					</form>
                   
<div > Have an Account?
<Link to='/login' style={{marginLeft:"10px",textDecoration:'none'}} >Login</Link>
</div>

				</div>
			</Container>
		</Grid>
		</>
	)
}

export default Register
