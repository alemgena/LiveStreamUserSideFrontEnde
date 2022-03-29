import { rightDrawerSlice } from '../../slices/rightDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { loginSlice } from '../../slices/login';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';
import { url } from '../../utils/url';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { LinkedInLoginButton } from 'react-social-login-buttons';
import { recoverPasswordSlice } from '../../slices/recover_password';
import './login.scss';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
const Login = (props) => {
  const rightDrawerActions = rightDrawerSlice.actions;
  const loginActions = loginSlice.actions;
  const recoverPasswowrdActions = recoverPasswordSlice.actions;
  // const recoverPasswowrdActions = recoverPasswordSlice.actions;
  const dispatch = useDispatch();
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
  const userSignin = useSelector((state) => state.login.loggedUser);
  // const { userInfo } = userSignin;
  //  console.log(userInfo);
  const [isDataStored, setIsDataStored] = useState(false)

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
            dispatch(loginActions.setEmailErr('Email address not verified !'));
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
            dispatch(loginActions.setIsUserLogged(true));
            dispatch(loginActions.setLoggedUser(response.data));
            dispatch(rightDrawerActions.setType('profile'));
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
  const linkedinAuth = () => {
    window.location.href = `${url}auth/linkedin`;
  };
  
    return (
      <div >
        <form className="form">
          <div>
            <h1>Sign In</h1>
          </div>
          <div>
            <label htmlFor="email">Email address</label>
            <input
            style={{width:'70%'}}
            className='inputData'
              type="email"
              id="email"
              placeholder="Enter email"
              required
             // onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
                className='inputData'
              type="password"
              id="password"
              placeholder="Enter password"
              required
           //   onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div>
            <label />
            <button   className='inputData' type="submit">
              Sign In
            </button>
          </div>
          <div>
            <label />
            <div>
              New customer?{' '}
              <Link to={`/register?redirect`}>
                Create your account
              </Link>
            </div>
          </div>
        </form>
      </div>
  )
  /*
  return (
    <div className='login'>
      <form onSubmit={validate}>
        <div className='lo'>Login</div>
        <div className='form-grp'>
          <label className='lable' htmlFor='email'>
            Email or UserName
          </label>
          <input
            className='input'
            type='email'
            id='user_identifier'
            required
            value={user_identifier}
            onChange={(e) => {
              dispatch(loginActions.setUser_Identifier(e.target.value));
            }}
          />
          <div className='form-error'>{user_IdentifierErr}</div>
        </div>
        <div className='form-grp'>
          <label className='lable' htmlFor='password'>
            Password
          </label>
          <input
            className='input'
            type='password'
            id='password'
            required
            value={password}
            onChange={(e) => {
              dispatch(loginActions.setPassword(e.target.value));
            }}
          />
          <div className='form-error'>{passwordErr}</div>
        </div>
        <div className='form-grp'>
          {' '}
          <div className='loading'>{isLoading && <CircularProgress />}</div>
          <input type='submit' value='sign in' className='btn btn-block' />
        </div>
      </form>
      <div className='login-bottom'>
        <div className='login-bottom-item'>
          <div className='text'>New customer?</div>
          <div
            className='link'
            style={{ background: '39445a' }}
            onClick={() => {
            
            }}
          >
            Create your account
          </div>
        </div>
        <div className='login-bottom-item'>
          <div className='text'>Lost password?</div>
          <div className='link' onClick={showRecoverPassword}>
            {' '}
            Recover password
          </div>
        </div>
      </div>
      <div className='login-with'>
        <GoogleLoginButton
          style={{ margin: '.71em 0 ', width: '100%' }}
          size='40px'
          onClick={() => googleAuth()}
        />
        <FacebookLoginButton
          style={{ margin: '.71em 0 ', width: '100%' }}
          size='40px'
          onClick={() => facebookAuth()}
        />
        <LinkedInLoginButton
          style={{ margin: '.71em 0 ', width: '100%' }}
          size='40px'
          onClick={() => linkedinAuth()}
        />
      </div>
    </div>
  );
  */
};
export default Login;
