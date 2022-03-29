import React, { useEffect, useState } from 'react';

import Table from '../components/Table/Table';

import customerList from '../assets/JsonData/customers-list.json';
import { url } from '../utils/url';
import axios from 'axios';

import { toast } from 'react-toastify';

const customerTableHead = [
  'id',
  'First Name',
  'Middle Name',
  'Last Name',
  'Account Type',
  'Email',
  'Phone',
  'Action',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const Customers = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios.get(`${url}admin/getAllUser`).then((response) => {
      if (response) {
        //console.log(response.data.users);
        // console.log(response.data.success.thumbnialFilePath);

        setUser(response.data.users);
      } else {
        console.log('field  to get the video data');
      }
      deleteUser();
    });

  }, []);
  console.log(user);
  //videos.map((video, index)
  const deleteUser = (id) => {
    console.log(id);
      axios.delete(`${url}admin/${id}`).then((response) => {
      console.log(response);
      if (response) {
        toast('user is delete  successfully', {
          position: 'top-right',
          autoClose: 3500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  const Body = user.map((item, index) => (
    <tr key={index}>
      <td>{item.userId}</td>
      <td>{item.FirstName}</td>
      <td>{item.MiddleName}</td>
      <td>{item.LastName}</td>
      <td>{item.usersAccountType.account_type}</td>
      <td>{item.usersAddress.email}</td>
      <td>{item.usersAddress.phone}</td>
      <td>
        <button
          type='button'
          onClick={(e)=>deleteUser(item.userId)}
          className='btn btn-danger'
        >
          <i className='fas fa-times'></i>
        </button>
      </td>
    </tr>
  ));
  console.log(Body);
  return (
    <div>
      <h2 className='page-header'>customers</h2>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card__body'>
              <Table
                limit='10'
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                renderBody={Body}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
