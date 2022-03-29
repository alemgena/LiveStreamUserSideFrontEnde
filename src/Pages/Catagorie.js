import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Table from '../components/Table/Table';
import { toast } from 'react-toastify';
import { url } from '../utils/url';
import { config } from '../utils/header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    width: '50px',
  },
  input: {
    display: 'none',
  },
}));
const customerTableHead = [
  'id',
  'Name',
  ' Descrieption',
  'createdAt',
  'Action',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;
const UploadVideo = () => {
  const [catagorey_name, setName] = useState('');
  const [Description, setDescrieption] = useState('');
  const [CategorieInfo, setCategorieInfo] = useState([]);
  useEffect(() => {
    getAllDatas();
  }, []);
  const getAllDatas = () => {
    axios.get(`${url}catagorey/getAllCatagory`).then((response) => {
      if (response.data.data) {
        console.log(response.data);
        setCategorieInfo(response.data.data);
      } else {
        console.log('error to get categoriey');
      }
    });
  };
  function onSubmit(event) {
    event.preventDefault();
    console.log(catagorey_name);
    console.log(Description);
    axios
      .post(`${url}catagorey/createCatagory`, {
        catagorey_name: catagorey_name,
        Description: Description,
      })
      .then((response) => {
        console.log(response);
        getAllDatas();
      });
  }
  console.log(CategorieInfo);

  const catagorieInformation = CategorieInfo.map((item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.catagory_Name}</td>
      <td>{item.Description}</td>
      <td>{item.createdAt}</td>
      <td>
        <button type='button' className='btn btn-danger'>
          <i className='fas fa-times'></i>
        </button>
      </td>
    </tr>
  ));
  const classes = useStyles();
  return (
    <div>
      <h2 className='page-header'>Add Categorie</h2>
      <form onSubmit={onSubmit}>
        <label>Categorey Name</label>
        <div>
          {' '}
          <input
            placeholder='Catagorie Name'
            className='in'
            type='text'
            name='catagore_name'
            id='catagorey_name'
            onChange={(e) => setName(e.target.value)}
            required
            // value={FirstName}
          />
        </div>
        <label style={{ marginTop: '20px' }}>Categorey Descrieption</label>
        <div>
          <textarea
            className='textarea'
            id='Description'
            name='Description'
            onChange={(e) => setDescrieption(e.target.value)}
            placeholder=' Catagorie Descrieption'
            // value={text}
            // onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div>
          <input
            type='submit'
            style={{ width: '300px', marginLeft: '8px' }}
            className='btn btn-dark my-1'
            value='Submit'
          />
        </div>
      </form>
      <div>
        <h2 className='page-header'>All Categorie</h2>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card__body'>
                <Table
                  limit='10'
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  renderBody={catagorieInformation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
