import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from '@material-ui/core'
//import Drawer from '@mui/material/Drawer'
import NeweListCategory from './newCatagoryeList'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import HomeIcon from '@material-ui/icons/Home'
import MovieIcon from '@material-ui/icons/Movie'
import SearchIcon from '@material-ui/icons/Search'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import TvIcon from '@material-ui/icons/Tv'
import MenuIcon from '@material-ui/icons/Menu'
import { useHistory } from 'react-router'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { loginSlice } from '../../slices/login'
import ListItemButton from '@mui/material/ListItemButton'
import { FixedSizeList } from 'react-window'
import { url } from '../../utils/url'
import axios from 'axios'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { rightDrawerSlice } from '../../slices/rightDrawer'

const DrawerComponent = () => {
  const actions = rightDrawerSlice.actions
  const dispatch = useDispatch()
  const showRightDrawer = (type) => {
    dispatch(actions.showDrawer())
    dispatch(actions.setType(type))
    document.body.style.overflow = 'hidden'
  }
  const history = useHistory()
  const useStyles = makeStyles((theme) => ({
    drawerContainer: {
      background: 'black',
      width: 249,
    },
    iconButtonContainer: {
      marginRight: '100px',
      color: 'white',
    height:10,
      fontSize: '2rem',
    },
    drawerPaper: {
      position: 'relative',
    },
    menuIconToggle: {
      fontSize: '2rem',
      left: 0,
    },
    list: {
      backgroundColor: 'black',
    },
  }))
  const [openDrawer, setOpenDrawer] = useState(false)
  const loginActions = loginSlice.actions

  const Home = () => {
    setOpenDrawer(false)
    history.push('/')
  }
  const Movies = () => {
    setOpenDrawer(false)
    history.push('/contact_us')
  }
  const Treanding = () => {
    setOpenDrawer(false)
    history.push('/about_us')
  }
  const TV_Serious = () => {
    setOpenDrawer(false)
    history.push('/privacypolicy')
  }
  const LiveChannels=()=>{
    setOpenDrawer(false)
    history.push('/liveChannels')
  }
 

  const Upload = () => {
    setOpenDrawer(false)
    history.push('/termsandconditions')
  }
  const CreateLiveStream = () => {
    setOpenDrawer(false)
    history.push('/creatLiveEvent')
  }
  const Login = () => {
    setOpenDrawer(false)
    history.push('/login')
  }
  //Profile
  const Profile = () => {
    setOpenDrawer(false)
    history.push('/profile')
  }
  const Search = () => {
    setOpenDrawer(false)
    showRightDrawer('search')
  }
  const Logout = () => {
    setOpenDrawer(false)
    localStorage.clear()
    dispatch(loginActions.setIsUserLogged(false))
    dispatch(loginActions.setLoggedUser([]))
    dispatch(loginActions.setUserInformation([]))
    history.push('/')
  }
  const JoinEvent = () => {
    setOpenDrawer(false)
    history.push({
      pathname: '/joinEvent',
      search: '?id',
    })
  }

  const [text, setText] = useState('')
  const classes = useStyles()
  return (
    <>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerContainer }}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        onOpen={() => setOpenDrawer(true)}
      >
      
        <List style={{marginTop:"20px"}}>
          <ListItem button onClick={Home}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white' }}>
            Home
              </ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem button onClick={Treanding}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
           About Ethio Live
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={TV_Serious}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
            Privacy Policy
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={Movies}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
      Contact Us
              </ListItemText>
            </ListItemIcon>
          </ListItem>

          <ListItem button onClick={Upload}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                {' '}
             Terms and conditions
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={CreateLiveStream}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                {' '}
              Create LiveStream
              </ListItemText>
            </ListItemIcon>
          </ListItem>
            <ListItem button onClick={LiveChannels}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                {' '}
               Live Channels
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={JoinEvent}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                {' '}
           Join Events
              </ListItemText>
            </ListItemIcon>
          </ListItem>
          <ListItem button onClick={Search}>
            <ListItemIcon>
              <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                {' '}
                <SearchIcon /> Search
              </ListItemText>
            </ListItemIcon>
          </ListItem>

          {(localStorage.getItem('user_id') ||
            localStorage.getItem('token')) && (
            <ListItem button onClick={Profile}>
              <ListItemIcon>
                <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                  {' '}
                 Profile
                </ListItemText>
              </ListItemIcon>
            </ListItem>
          )}
          {(localStorage.getItem('user_id') ||
            localStorage.getItem('token')) && (
            <ListItem button onClick={Logout}>
              <ListItemIcon>
                <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                  {' '}
                 Logout
                </ListItemText>
              </ListItemIcon>
            </ListItem>
          )}
          {(!localStorage.getItem('user_id') ||
            !localStorage.getItem('token')) && (
            <ListItem button onClick={Login}>
              <ListItemIcon>
                <ListItemText style={{ color: 'white', marginTop: '10px' }}>
                  {' '}
            Login
                </ListItemText>
              </ListItemIcon>
            </ListItem>
          )}
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
    </>
  )
}

export default DrawerComponent
/*
  <NeweListCategory passedFunction={setOpenDrawer} />
  */