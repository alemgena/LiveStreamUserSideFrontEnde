import { rightDrawerSlice } from '../../slices/rightDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { registerSlice } from '../../slices/register';
import axios from 'axios';
import { url } from '../../utils/url';
import { CircularProgress } from '@material-ui/core';
import './hedder.css';
const Register = () => {
  const rightDrawerActions = rightDrawerSlice.actions;
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
    ageErr,
  } = useSelector((state) => state.register.inputErrors);
  const isLoading = useSelector((state) => state.register.isLoading);
  const dispatch = useDispatch();
  const showRightDrawer = (type) => {
    dispatch(rightDrawerActions.showDrawer());
    dispatch(rightDrawerActions.setType(type));
    document.body.style.overflow = 'hidden';
  };
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
    dispatch(registerAction.setAgeErr(''));
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
    if (phone.replaceAll(' ', ' ').length != 13) {
      dispatch(registerAction.setPhoneErr(' Invalid phone number'));
      isValid = false;
    }
    if (username.length < 2) {
      dispatch(
        registerAction.setUserNameErr(
          'user name must be atleast twov characeter'
        )
      );
    }
    if (password1 != password2) {
      dispatch(registerAction.setPassword2Err('password must be much'));
      isValid = false;
    } else if (password1.length < 6) {
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
          age: age,
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
            dispatch(rightDrawerActions.hideDrawer());
            document.body.style.overflow = 'visible';
            console.log('1');
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
  return (
    <div className='register'>
      <form onSubmit={validate}>
        <div className='re'>register</div>
        <div className='form-grp'>
          <label htmlFor='FirstName'>First Name</label>
          <input
            className='input'
            type='text'
            id='FirstName'
            required
            value={FirstName}
            onChange={(e) => {
              dispatch(registerAction.setFirstName(e.target.value));
            }}
          />
          <div className='form-error'>{firstNameErr}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='MiddleName'>Middle Name</label>
          <input
            className='input'
            type='text'
            id='MiddleName'
            required
            value={MiddleName}
            onChange={(e) => {
              dispatch(registerAction.setMiddleName(e.target.value));
            }}
          />
          <div className='form-error'>{middleNameErr}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='LastName'>Last Name</label>
          <input
            className='input'
            type='text'
            id='LastName'
            required
            value={LastName}
            onChange={(e) => {
              dispatch(registerAction.setLastName(e.target.value));
            }}
          />
          <div className='form-error'>{lastNameErr}</div>
        </div>
        <label>Gender</label>
        <label className='containe'>
          Male
          <input
            type='radio'
            onChange={(e) => {
              dispatch(registerAction.setSex(e.target.value));
            }}
            value='Male'
            name='radio'
            checked='checked'
          />
          <span
            style={{ marginLeft: '130px', marginTop: '8px' }}
            className='checkmark'
          ></span>
        </label>
        <label className='containe'>
          Female
          <input
            onChange={(e) => {
              dispatch(registerAction.setSex(e.target.value));
            }}
            value='Female'
            type='radio'
            name='radio'
          />
          <span
            style={{ marginLeft: '130px', marginTop: '8px' }}
            className='checkmark'
          ></span>
        </label>

        <div className='form-grp'>
          <label htmlFor='username'>User Name</label>
          <input
            className='input'
            type='text'
            id='username'
            required
            value={username}
            onChange={(e) => {
              dispatch(registerAction.setUserName(e.target.value));
            }}
          />
          <div className='form-error'>{userNameErr}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='phone'>Phone</label>
          <input
            className='input'
            type='tel'
            id='phone'
            required
            value={phone}
            onChange={(e) => {
              dispatch(registerAction.setPhone(e.target.value));
            }}
          />
          <div className='form-error'>{phoneErr}</div>
        </div>

        <div className='form-grp'>
          <label htmlFor='email'>Email</label>
          <input
            className='input'
            type='email'
            id='email'
            required
            value={email}
            onChange={(e) => {
              dispatch(registerAction.setEmail(e.target.value));
            }}
          />
          <div className='form-error'>{emailErr}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='age'>Age</label>
          <input
            className='input'
            type='number'
            id='age'
            required
            value={age}
            onChange={(e) => {
              dispatch(registerAction.setAge(e.target.value));
            }}
          />
          <div className='form-error'>{ageErr}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='password1'>Password</label>
          <input
            className='input'
            type='password'
            id='password1'
            value={password1}
            required
            onChange={(e) => {
              dispatch(registerAction.setPassword1(e.target.value));
            }}
          />
          <div className='form-error'>{password1Err}</div>
        </div>
        <div className='form-grp'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            className='input'
            type='password'
            id='password2'
            required
            value={password2}
            onChange={(e) => {
              dispatch(registerAction.setPassword2(e.target.value));
            }}
          />
          <div className='form-error'>{password2Err}</div>
        </div>

        <div className='form-grp'>
          {' '}
          <div className='loading'>{isLoading && <CircularProgress />}</div>
          <input type='submit' value='sign up' className='btn btn-block' />
        </div>
      </form>
      <div className='login-bottom'>
        <div className='login-bottom-item'>
          <div className='text'>Already registered?</div>
          <div
            className='link'
            onClick={() => {
              showRightDrawer('login');
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
