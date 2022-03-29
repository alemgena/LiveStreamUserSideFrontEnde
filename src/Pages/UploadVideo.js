import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { MDBCardHeader } from 'mdbreact';
import { toast } from 'react-toastify';
import { url } from '../utils/url';
import { config } from '../utils/header';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './select.scss';
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
const UploadVideo = () => {
  const user = useSelector((state) => state.login.loggedUser);
  const username = user.userName;
  //console.log(username);
  const moreIcon = <FontAwesomeIcon icon={faEllipsisH} />;
  const [CategorieInfo, setCategorieInfo] = useState([]);
  const [categorey, setCategorie] = useState('');
  console.log(categorey);
  const [subscrieptionType, setSubscrieptionType] = useState('');
  const [form, setFormData] = useState({
    Title: '',
    Descrieption: ' ',
    video: null,
  });
  const [newData, setNewData] = useState({
    image: null,
  });
  const [thumbnialFilePath, setThumbinal] = useState('');
  const [imageName, setImageName] = useState('');
  const [previewImage, setPrevieweImage] = useState('');
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
  const handleCategorieChange = (e) => {
    setCategorie(e.target.value);
  };

  function imageUploadHandler(event) {
    const inputValue =
      event.target.name == 'image' ? event.target.files[0] : event.target.value;
    setNewData({
      ...newData,
      [event.target.name]: inputValue,
    });
    setPrevieweImage(URL.createObjectURL(event.target.files[0]));
  }
  function handleChange(event) {
    const inputValue =
      event.target.name === 'video'
        ? event.target.files[0]
        : event.target.value;
    setFormData({
      ...form,
      [event.target.name]: inputValue,
    });
  }
  function onSubmit(event) {
    event.preventDefault();
    const imageAppend = new FormData();
    imageAppend.append('image', newData.image);
    console.log(imageAppend);

    axios
      .post(`${url}video/thumbnail`, imageAppend)
      .then((response) => {
        console.log(response.data.imagePath);
        setThumbinal(response.data.imagePath);
        setImageName(response.data.imageName);
        const videoAppend = new FormData();
        videoAppend.append('Title', form.Title);
        videoAppend.append('Descrieption', form.Descrieption);
        videoAppend.append('video', form.video);
        videoAppend.append('username', username);
        videoAppend.append('thumbnialFilePath', thumbnialFilePath);
        console.log(imageName);
        videoAppend.append('imageName', imageName);
       videoAppend.append9('subscrieptionType',subscrieptionType)
        console.log(categorey);
        axios
          .post(`${url}video/uploadVideo`, videoAppend, config)
          .then((response) => {
            console.log(response.data);
            if (response.data) {
              toast('Your video upload successfully', {
                position: 'top-right',
                autoClose: 3500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              toast('Your video is not upload successfully', {
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
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const classes = useStyles();
  return (
    <div className='register'>
      <h3 style={{ color: ' 349eff' }}>Write something about your Video</h3>

      <form onSubmit={onSubmit}>
        <div>
          <div>
            {' '}
            <label style={{ marginTop: '5px', color: ' 349eff' }}>Title</label>
          </div>
          <input
            onChange={handleChange}
            className='in'
            type='text'
            name='Title'
            required
            style={{ marginBottom: '10px', marginTop: '5px' }}
            // value={FirstName}
          />
        </div>
        <div>
          <label style={{ color: ' 349eff' }}>Descrieption</label>
        </div>
        <div>
          <textarea
            onChange={handleChange}
            className='textarea'
            name='Descrieption'
            placeholder='Descrieption'
            style={{ marginTop: '5px' }}
            // value={text}
            // onChange={(e) => onChange(e)}
            required
          ></textarea>
        </div>
        <div>
          {' '}
          <label style={{ marginTop: '5px', color: ' 349eff' }}>
            SubscrieptionType
          </label>
        </div>

        <div style={{ marginTop: '5px' }} class='wrapper'>
          <input
            type='radio'
            value='Paied'
            name='select'
            id='option-1'
            checked
            onClick={() => setSubscrieptionType('Paied')}
          />
          <input
            type='radio'
            value='Free'
            name='select'
            id='option-2'
            onClick={() => setSubscrieptionType('Free')}
          />
          <label for='option-1' class='option option-1'>
            <div class='dot'></div>
            <span>Paied</span>
          </label>
          <label for='option-2' class='option option-2'>
            <div class='dot'></div>
            <span>Free</span>
          </label>
        </div>

        {subscrieptionType === 'Paied' ? (
          <div>
            <input type='number' placeholder='price in ETB' min='1' />
          </div>
        ) : (
          <div>this video is free so it can not add the price</div>
        )}
        <label styel={{ color: '349eff' }}> Select Categoriey</label>
        <div style={{ marginTop: '5px' }} className='select'>
          <select id='standard-select' onChange={handleCategorieChange}>
            {CategorieInfo.map((catagorey, index) => (
              <option key={index} value={catagorey.catagory_Name}>
                {catagorey.catagory_Name}
              </option>
            ))}
          </select>
          <span class='focus'></span>
        </div>
        <br></br>
        <div className={classes.root}>
          <input
            accept='video/mp4'
            onChange={handleChange}
            className={classes.input}
            id='contained-button-videofile'
            type='file'
            name='video'
            placeholder='Add viedeo file'
          />
          <input
            type='file'
            className={classes.input}
            id='contained-button-imagefile'
            name='image'
            onChange={imageUploadHandler}
          />
          <label htmlFor='contained-button-imagefile'>
            <Button
              variant='contained'
              color='secondary'
              style={{ width: '300px', fontSize: '15px' }}
              component='span'
            >
              Choose thumbinial File
            </Button>
          </label>

          <label htmlFor='contained-button-videofile'>
            <Button
              variant='contained'
              color='secondary'
              style={{ width: '300px', fontSize: '15px' }}
              component='span'
            >
              Choose video File
            </Button>
          </label>
        </div>
        <input
          type='submit'
          style={{ width: '300px', marginLeft: '8px' }}
          className='btn btn-dark my-1'
          value='Submit'
        />
      </form>
      <img
        style={{
          marginTop: '30px',
          width: '30%',
          height: '30%',
          background: 'white',
        }}
        src={previewImage}
        alt=''
      />
    </div>
  );
};

export default UploadVideo;
