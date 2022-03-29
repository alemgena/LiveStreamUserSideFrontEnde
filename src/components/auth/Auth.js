import { useEffect ,useState} from 'react';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { profileSlice } from '../../slices/profile';
import { useDispatch } from 'react-redux';
import {url } from '../../utils/url'
import axios from 'axios'
import { loginSlice } from '../../slices/login';
const Auth = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const profileActions = profileSlice.actions;
	const loginActions = loginSlice.actions;
  const[userInfo,setUserInfo]=useState('')
  useEffect(() => {
    const value = queryString.parse(props.location.search);
    const token = value.token;
    const user_id = value.user_id;
    if (token && user_id) {
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      //JSON.parse(localStorage.getItem('userInfo'))
      axios.get(`${url}user/getProfileCheckAuth/${user_id}`).then(response=>{
       setUserInfo(response.data.resualt)//resualt: "user is Exist"
       })
       console.log(userInfo)
     
          dispatch(profileActions.setShowEditProfile(true));
          dispatch(loginActions.setIsUserLogged(true));
          console.log(JSON.parse(localStorage.getItem('userInfo')))
          history.push('/profile')
          /*  if (!localStorage.getItem('user_id') || !localStorage.getItem('token')) {
        dispatch(profileActions.setShowEditProfile(true));
        history.push('/profile');
        dispatch(loginActions.setIsUserLogged(true));
        console.log(JSON.parse(localStorage.getItem('userInfo')))
        dispatch(loginActions.setLoggedUser(JSON.parse(localStorage.getItem('userInfo'))));
        localStorage.setItem('loginInfo', JSON.parse(localStorage.getItem('userInfo')));
      
        }*/
    }
  }, []);
  return '';
};
export default Auth;
