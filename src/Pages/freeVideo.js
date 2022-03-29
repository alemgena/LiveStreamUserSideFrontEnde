import React, { useEffect, useState } from 'react';

import Table from '../components/Table/Table';
import { url } from '../utils/url';
import axios from 'axios';

import { toast } from 'react-toastify';

const customerTableHead = [
  'id',
  'filePath',
  'fileName',
  'thumbinialFileName',
  'createdAt',
  'title',
  'Descriepiton',
  'Action',
  'uploadedBy',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const FreeVideo = () => {
  const [videoInfo, setVideoInfo] = useState([]);
  useEffect(() => {
    axios.get(`${url}video/getAllVideo`).then((response) => {
      if (response) {
        console.log(response.data.video);
        setVideoInfo(response.data.video);
      } else {
        console.log('field  to get the video data');
      }
    });
    deleteUser();
  }, []);
  console.log(videoInfo);
  //videos.map((video, index)
  const deleteUser = (id) => {
    console.log(id);
    /*  axios.delete(`${url}admin/${id}`).then((response) => {
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
    });*/
  };

  const Body = videoInfo.map((item, index) => (
    <tr key={index}>
      <td>{item.video_id}</td>
      <td>{item.filePath}</td>
      <td>{item.fileName}</td>
      <td>{item.thumbnialFileName}</td>
      <td>{item.createdAt}</td>
      <td>{item.video_title.Title}</td>
      <td>{item.video_title.Descrieption}</td>
      <td>
        <button
          type='button'
          onClick={deleteUser(item.video_id)}
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
      <h2 style={{ textAlign: 'center' }} className='page-header'>
        free video
      </h2>
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

export default FreeVideo;
