import React, { useState } from 'react';
import { url } from '../../utils/url';
import axios from 'axios';
import CheckoutSteps from './VideoUploadStep/ChekoutStep';
import { toast } from 'react-toastify';
function AccountUpgread(props) {
  const [userName, setUserName] = useState('');
  const [periemum, setPriemum] = useState('');

  console.log(userName);
  console.log(periemum);
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${url}admin/upgread`, {
        username: userName,
        remark: periemum,
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          toast('Your account is upgread successfully to Perimum User', {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.history.push('/uploadVideo');
        }
      });
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <h1 style={{ color: 'brown' }}>Upgread Into Perimum User</h1>
      <form className='for' onSubmit={submitHandler}>
        <div>
          <label  htmlFor='fullName'>
            User Name
          </label>
          <input
            className='inputData'
            style={{ width: '100%' }}
            type='text'
            id='userName'
            placeholder='Enter User Name'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label
            style={{marginRight: '120px' }}
            className='containe'
          >
            Enable Premium
            <input
              type='radio'
              onChange={(e) => setPriemum(e.target.value)}
              value='Premium'
              name='radio'
            />
            <span
              style={{ marginLeft: '230px', marginTop: '5px' }}
              className='checkmark'
            ></span>
          </label>
          {}
        </div>
        <div>
          <label />
          <input type='submit' className='btCart' value='submit '></input>
        </div>
      </form>
    </div>
  );
}

export default AccountUpgread;
