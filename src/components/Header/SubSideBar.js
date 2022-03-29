import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import NeweListCategory from './newCatagoryeList'
import LiveTvIcon from '@material-ui/icons/LiveTv';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TvIcon from '@material-ui/icons/Tv';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';

import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList } from 'react-window';
import {url} from '../../utils/url'
import axios from 'axios'
import AccountCircle from '@material-ui/icons/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SubSideBar = () => {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    drawerContainer: {
      background: '#111',
      boxShadow: '0px 1px 1px red',
    },
    iconButtonContainer: {
      marginRight: '100px',
      color: 'white',
    },

    menuIconToggle: {
      fontSize: '3rem',
      left:0
    },
    list: {
      backgroundColor: '#111',
      marginTop:"20px"
    },
  }));
  const [openDrawer, setOpenDrawer] = useState(false);
  const Home = () => {
    setOpenDrawer(false);
    history.push('/');
  };
  const Movies = () => {
    setOpenDrawer(false);
    history.push('/movies');
  };
  const Treanding = () => {
    setOpenDrawer(false);
    history.push('/Trending');
  };
  const TV_Serious = () => {
    setOpenDrawer(false);
    history.push('/series');
  };
  const classes = useStyles();
  return (
    <>
      <Drawer
        style={{ width: '50%' }}
        elevation={4} 
        anchor='left'
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{ elevation: 20}}
      >
        <List>
          <ListItem divider button onClick={Home}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white' }}>
                <HomeIcon /> Home
              </ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem divider button onClick={Treanding}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop:'10px' }}>
                <WhatshotIcon /> Treanding
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={TV_Serious}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop:'10px'}}>
                <TvIcon /> TV_Serious{' '}
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem divider button onClick={Movies}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white' , marginTop:'10px'}}>
                <MovieIcon /> Movies
              </ListItemText>
            </ListItemIcon>
          </ListItem> 
        </List>
      </Drawer>
      {/* Since this is inside our toolbar we can push it to the end of the toolbar */}
      <IconButton
        className={classes.iconButtonContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.menuIconToggle} />
      </IconButton>
      <div styel={{display:"flex", marginRight:"60px",
      flex:"1",
      border: "none",
      padding: '10px',
      color: 'white',
      backgroundColor: '#090909'

    }}>  </div>
    </>
  );
};

export default SubSideBar;
