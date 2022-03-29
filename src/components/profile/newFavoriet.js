
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import {useState} from 'react'
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios'

import {imageVideoUrl} from '../../utils/url'
import { url } from '../../utils/url';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
 
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

export default function TitlebarGridList() {
  const[data,setData]=useState([]);
  const userId=localStorage.getItem('user_id')
React.useEffect(() => {
      getAllDatas();
    }, []);
    const getAllDatas = () => {
      axios.get(`${url}user/getFavorietList/${userId}`).then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      });
    };
  const classes = useStyles();
  return (
    <div>
      {data.length>0?(
        <ImageList sx={{ width: 500, height: 450 }}>
    <ImageListItem key="Subheader" cols={2}>
      <ListSubheader styele={{ backgroundColor:"red", color:"white"}} component="div">December</ListSubheader>
    </ImageListItem>

    {data.map((iteam) => (

      <ImageListItem>
        <Link to={`/video/${iteam.videoInfo.video_id}`} style={{ textDecoration: 'none'}}>
        <img
style={{
  width: '200px',
  height: '200px',
 
}}
        src={`${url}images/${iteam.videoInfo.thumbnialFileName}`} 
        alt={iteam.videoInfo.video_title.Title} 
          loading="lazy"
        />
        </Link>
        <ImageListItemBar
           title={iteam.videoInfo.video_title.Title}  
         
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
              aria-label={`info about ${iteam.videoInfo.video_title.Title}`}
            >
              <InfoIcon />
            </IconButton>
          }
        />
      </ImageListItem>
    ))}
  </ImageList>
      ):(
        <div>No Favoriet List </div>
      )
      
      }
    
  </div>
);
}

                       
          

/*
    <div>
      <div className="headerFavoriet">YOUR FAVORIET LIST</div>
      /*

    <div className={classes.root}>
      <GridList cellHeight={300} spacing={30} className={classes.gridList}>
  
        {data.map((iteam) => (
          <GridListTile >
 <Link to={`/video/${iteam.videoInfo.video_id}`} style={{ textDecoration: 'none'}}>
            <img  src={`${url}images/${iteam.videoInfo.thumbnialFileName}`} 
            alt={iteam.videoInfo.video_title.Title} />
            </Link>
            <GridListTileBar
              title=  {iteam.videoInfo.video_title.Title}  
         
              actionIcon={
                <IconButton aria-label={`info about ${iteam.videoInfo.video_title.Title}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </div>
    */
