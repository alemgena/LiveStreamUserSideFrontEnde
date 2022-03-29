import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifySlice } from '../../slices/verify';
import { url } from '../../utils/url';

const Verify = (props) => {
  const location = props.location.pathname;
  const route = location.substring(location.lastIndexOf('/') + 1);
  const isLoading = useSelector((state) => state.verify.isLoading);
  const text = useSelector((state) => state.verify.text);
  const verifyActions = verifySlice.actions;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyActions.setIsLoading(true));

    axios.get(`${url}user/verify/${route}`).then(
      (response) => {
        if (response.data.verify) {
          dispatch(verifyActions.setIsLoading(false));
          dispatch(verifyActions.setText('Account verified successfully ! '));
        }
        console.log(response);
      },
      (error) => {}
    );
  }, []);
  return (
    <div className='verify'>
      <div className='loading'>{isLoading && <CircularProgress />}</div>
      <div className='text'> {text}</div>
      {text === 'Account verified successfully ! ' && (
        <Link  style={{ textDecoration: 'none' }} to={'/'}>
          {' '}
          <div className=' adimera-btn '>go to homepage</div>{' '}
        </Link>
      )}
    </div>
  );
};

export default Verify;
