import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { GridList, GridListTile } from "@material-ui/core";

import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import axios from 'axios'
import { url } from '../../utils/url';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'wrap'
  },
  image:{
    width:300
  }
}));

export default function TitlebarGridList() {
  const classes = useStyles();
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
  return (
    <div>
      <div>Favoriet List</div>
    <GridList cellHeight={200} cols={3} style={{ marginLeft:"20px", width: 900, height: 600 }}>
        {data.map((item) => (
          <GridListTile >
            <img src={`${url}images/${item.videoInfo.thumbnialFileName}`}  alt={item.videoInfo.video_title.Title} />
          </GridListTile>
        ))}
      </GridList>
  </div>
  );
            }