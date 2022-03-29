import profileIcon from '../../icons/profile.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { rightDrawerSlice } from '../../slices/rightDrawer';
import { useEffect } from 'react';
import axios from 'axios';
import { config } from '../../utils/header';
import { url } from '../../utils/url';
import { loginSlice } from '../../slices/login';
import './hedder.css';

const Profile = () => {
  useEffect(() => {
    if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
      console.log('no token');
      dispatch(rightDrawerActions.setType('login'));

    } else {
      let token = localStorage.getItem('token');
      console.log(token);
      let userId = localStorage.getItem('user_id');
      axios.get(`${url}user/getProfile/${userId}`, config).then(
        (response) => {
          if (response.data.User) {
            console.log(response.data.User);
            dispatch(loginActions.setUserInformation(response.data.User));
            localStorage.setItem(
              'userInfo',
              JSON.stringify(response.data.User)
            );
          }
        },
        (error) => {
          console.log(error);
          dispatch(loginActions.setIsLoading(false));
        }
      );
    }
  }, []);
  const dispatch = useDispatch();
  const actions = rightDrawerSlice.actions;
  const loginActions = loginSlice.actions;
  const rightDrawerActions = rightDrawerSlice.actions;
  const user = useSelector((state) => state.login.loggedUser);
  //console.log(user);
  const userInfo = useSelector((state) => state.login.userInformation);
  //loggedUser
  //console.log(user);
  const logout = () => {
    dispatch(rightDrawerActions.setType('login'));
    localStorage.clear();
    dispatch(loginActions.setIsUserLogged(false));
    dispatch(loginActions.setLoggedUser([]));
    dispatch(loginActions.setUserInformation([]));
  };
  const closeDrawer = () => {
    dispatch(actions.hideDrawer());
    document.body.style.overflow = 'visible';
  };
  return (

    <div className='mini-profile'>
      <div className='pro'>profile</div>
      <hr style={{ width: '400px', height: '3px', color: 'brown' }} />
      <div className='name'>
        <i className='fas fa-user'> </i> Welcome {user.FirstName}
      </div>
      <div className='buttons'>
        <Link
          style={{ textDecoration: 'none' }}
          to='/profile'
          onClick={() => {
            closeDrawer();
          }}
        >
          {' '}
          <div className='go'>go to your profile</div>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          to='/favorietList'
          onClick={() => {
            closeDrawer();
          }}
        >
          {' '}
          <div className='go'>your favorite list</div>
        </Link>
        <Link
          style={{ textDecoration: 'none' }}
          // to='/playe'
          to='/viedeoHome'
          onClick={() => {
            closeDrawer();
          }}
        >
          {' '}
          <div className='go'>your order</div>
        </Link>

        <input
          type='submit'
          style={{ width: '100%' }}
          value='log out'
          className='go'
          onClick={logout}
        ></input>
      </div>
    </div>
  );
};

export default Profile;
