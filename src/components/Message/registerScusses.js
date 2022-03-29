import Dimmer from '../utils/dimmer';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { registerSlice } from '../../slices/register';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
const RegistrationSuccess = () => {
  const xs = useMediaQuery({ query: '(max-width: 576px' });
  const sm = useMediaQuery({ query: '(min-width: 576px)' });
  const md = useMediaQuery({ query: '(min-width: 768px)' });
  const lg = useMediaQuery({ query: '(min-width: 992px)' });
  const xl = useMediaQuery({ query: '(min-width: 1200px)' });
  let width = 'inherit';

  if (xl) width = '35%';
  else if (lg) width = '40%';
  else if (md) width = '50%';
  else if (sm) width = '60%';
  else if (xs) width = '70%';

  const style = {
    width: width,
    height: '85%',
  };

  const history = useHistory();
  const successIcon = <FontAwesomeIcon icon={faCheckCircle} size='5x' />;
  const registrationActions = registerSlice.actions;
  const dispatch = useDispatch();
  const closeModal = () => {
    history.push('/login')
    dispatch(registrationActions.setRegistrationSuccessful(false));
  };

  return (
    <>
      <Dimmer />
      <div className='registration-success' style={style}>
        <div className='top'>
          <div className='icon'>{successIcon}</div>
          <div className='textt'>SUCCESS</div>
        </div>
        <div className='bottom'>
          <div className='textt'>
            <h4>
              {' '}
              Congratulations, Your account has been successfully created.
            </h4>
            <p>
              {' '}
              Go to your email inbox and click the activation link to activate
              your account!
            </p>
          </div>
          <div className='continue'>
            <div className='btn' onClick={closeModal}>
              Continue
            </div>
          </div>
        </div>
      </div>{' '}
    </>
  );
};

export default RegistrationSuccess;
