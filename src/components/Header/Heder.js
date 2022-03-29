import './Header.scss'
import './search.css'
import DrawerComponent from './DrawerCommponen'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SubSideBar from './SubSideBar'
import WhatshotIcon from '@material-ui/icons/Whatshot'
import TvIcon from '@material-ui/icons/Tv'
import MovieIcon from '@material-ui/icons/Movie'
import SearchIcon from '@material-ui/icons/Search'
import Tooltip from '@material-ui/core/Tooltip'
import { alpha, makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {
  faSearch,
  faUser,
  faShoppingCart,
  faHeart,
} from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  AppBar,
  useTheme,
  Tab,
  Tabs,
  Typography,
  MenuList,
  Popper,
  Paper,
  Toolbar,
} from '@material-ui/core'
import { rightDrawerSlice } from '../../slices/rightDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { loginSlice } from '../../slices/login'
import { useHistory } from 'react-router'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import LiveTvIcon from '@material-ui/icons/LiveTv'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import HomeIcon from '@mui/icons-material/Home'
import ScrollableTab from './ScrollebleTab'
import axios from 'axios'
import { styled } from '@mui/material/styles'
import { url } from '../../utils/url'
import SearchBar from 'material-ui-search-bar'
import Logo from './RCNDC.png'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: '30px',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '23ch',
      },
    },
  },
}))
const useStyles = makeStyles((theme) => ({
  MenuItem: {
    color: 'teal',
  },
  tr: {
    '&:hover': {
      color: '#f1f1f1',
    },
  },
    menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#111"
    }
  },
  tabs: {},
  tab: {
    minWidth: 20,
    paddingLeft: 12,
    paddingRight: 12,
  },
  searchBar: {
    marginTop:"17px",
    marginLeft: '110px',
  },
  searchBarRes: {
    marginLeft: '40px',
  },
  customTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: 'rgba(220, 0, 78, 0.8)',
  },
  customNeweTooltip: {
    // I used the rgba color for the standard "secondary" color
    backgroundColor: '#ff6a6a',
  },
  //
  customArrow: {
    color: '#f1f1f1',
  },
  grow: {
    marginLeft: '90px',
    marginTop:"7px"
  },
  growRes: {
    marginLeft: '30px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo:{
    maxWidth:50,
    maxHeight:50
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}))
const Header = () => {
  const history = useHistory()
  const [value, setValue] = useState(0)
  const handleClickTab = (e, newValue) => {
    setValue(newValue)
  }
  const classes = useStyles()
  const menuId = 'primary-search-account-menu'
  const rightDrawerActions = rightDrawerSlice.actions
  const loginActions = loginSlice.actions
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClickLive = (event) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleCloseLive = () => {
    setAnchorEl2(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleProfile = () => {
    setAnchorEl(null)
    history.push('/profile')
  }
  const handleClickHome = () => {
    history.push('/')
  }
  const handleCreatLive = () => {
    setAnchorEl2(null)
    history.push('/creatLiveEvent')
  } //creatLiveEvent
  const handleJoinEvent = () => {
    setAnchorEl2(null)
    history.push({
      pathname: '/joinEvent',
      search: '?id',
    })
  }
  const handleLogout = () => {
    setAnchorEl(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    localStorage.removeItem('loginInfo')
    localStorage.removeItem('userInfo')
    dispatch(loginActions.setIsUserLogged(false))
    dispatch(loginActions.setLoggedUser([]))
    //dispatch(loginActions.initialState(''));

    dispatch(loginActions.setUserInformation([]))
    history.push('/login')
  }
  const handleSubmit = (e) => {
    e && e.preventDefault()

    text && history.push(`/search/${text}`)
  }

  const [videos, setVideos] = useState([])
  useEffect(() => {
    axios.get(`${url}video/getAllTitle`).then((response) => {
      if (response) {
        console.log(response.data.video)
        // console.log(response.data.success.thumbnialFilePath);
        setVideos(response.data.video)
      } else {
        console.log('field to get the video data')
      }
    })
  }, [])

  const [text, setText] = useState('')

  const theme = useTheme() //Get a copy of our default theme in our component so that we can access the breakpoints and pass the useMediaQuery
  //  const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
  const handleSearch = (rows) => {
    console.log(rows)
    return rows.filter(
      (row) =>
        row.Title.toString().toLowerCase().indexOf(text.toLowerCase()) > -1,
    )
  }
  const openProduct = () => {
    setText('')
  }
  //Functions
  const [openHover, setOpenHover] = useState(false)
  const [anchorEl3, setAnchorEl3] = React.useState(null)
  const handleHoverOPen = (event) => {
    if (anchorEl3 !== event.currentTarget) {
      setAnchorEl3(event.currentTarget)
    }
    setOpenHover(true)
  }
  const handleHoverClose = () => {
    setOpenHover(false)
    setAnchorEl3(null)
    history.push('/creatLiveEvent')
  }
  const handleHoverJoin = () => {
    setOpenHover(false)
    setAnchorEl3(null)
    history.push({
      pathname: '/joinEvent',
      search: '?id',
    })
  }
  const handleHoverCloseAll = () => {
    setAnchorEl3(null)
  }
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const md2 = useMediaQuery({ query: '(min-width: 577px)' })
  const md3 = useMediaQuery({ query: '(max-width: 1043px)' })
  const md4 = useMediaQuery({ query: '(max-width: 1043px)' })
  return (
    <div className={classes.grow}>
      <AppBar
        color="teal"
        elevation={10}
        style={{ height: '', background: ' #111' }}
      >
        <Toolbar style={{ color: 'white' }}>
          <div>
            {md3 && md2 ? (
              <div style={{marginTop:"20px", display: 'flex' }}>
                  <Typography>
                        <IconButton
                          onClick={handleClickHome}
                          style={{marginBottom:"20px", color: 'white' }}
                        >
                      <img src={Logo} alt="logo" className={classes.logo} />
                        </IconButton>
                      </Typography>{' '}
                <ScrollableTab />
                <div>
                  <Tabs>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        value={text}
                        onChange={(e) => {
                          setText(e.target.value)
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Search>
                  </Tabs>
                </div>
                <div>
                  {!localStorage.getItem('user_id') ||
                  !localStorage.getItem('token') ? (
                    <IconButton
                      edge="end"
                        disableRipple
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={() => {
                        history.push('/login')
                      }}
                      color="inherit"
                  
                      style={{ backgroundColor:'transprent',color: 'white' }}
                    >
                      <AccountCircle />
                    </IconButton>
                  ) : (
                    <div>
                      <IconButton
                        color="inherit"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        style={{ backgroundColor:'transparent',color: 'white' }}
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <AccountCircle />
                      </IconButton>
                      <div>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            className={classes.MenuItem}
                            onClick={handleProfile}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            className={classes.MenuItem}
                            onClick={handleLogout}
                          >
                            Logout
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                {md ? (
                  <>
                    <DrawerComponent />
                  </>
                ) : (
                  <>
                    <Tabs
                      onChange={handleClickTab}
                      indicatorColor="secondary"
                      value={value}
                      className={classes.tabs}
                    >
                      <Typography>
                        <IconButton
                          onClick={handleClickHome}
                          style={{ color: 'white' }}
                        >
                      <img src={Logo} alt="logo" className={classes.logo} />
                        </IconButton>
                      </Typography>{' '}
                      <Tab
                        className={classes.tab}
                        style={{
                          marginLeft: '10px',
                          color: 'white',
                        }}
                        label="Trading"
                        component={Link}
                        to="/Trending"
                      ></Tab>
                      <Tab
                        className={classes.tab}
                        style={{ color: 'white' }}
                        label="TV Series"
                        component={Link}
                        to="/series"
                      ></Tab>
                      <Tab
                        className={classes.tab}
                        style={{ color: 'white' }}
                        label="Moves"
                        component={Link}
                        to="/movies"
                      ></Tab>
                      <Tab
                        className={classes.tab}
                        style={{ color: 'white' }}
                        label="Upload Video"
                        component={Link}
                        to="/uploadVideo"
                      ></Tab>
                      <Tab
                        className={classes.tab}
                        label=" Live Stream"
                        style={{ color: 'white' }}
                        aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleHoverOPen}
                        onMouseOver={handleHoverOPen}
                      ></Tab>
                           <Tab
                        className={classes.tab}
                        label="Live Channels"
                        style={{ color: 'white' }}
                   component={Link}
                     to="/liveChannels"
                      ></Tab>
                      <div
                        className={
                          md4 ? classes.searchBarRes : classes.searchBar
                        }
                      >
                        <Search>
                          <SearchIconWrapper>
                            <SearchIcon />
                          </SearchIconWrapper>
                          <StyledInputBase
                            placeholder="Search…"
                            value={text}
                            onChange={(e) => {
                              setText(e.target.value)
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </Search>
                      </div>
                      <div className={md4 ? classes.growRes : classes.grow}>
                        {!localStorage.getItem('user_id') ||
                        !localStorage.getItem('token') ? (
                          <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={() => {
                              history.push('/login')
                            }}
                            color="inherit"
                            style={{ color: 'white' }}
                          >
                            <AccountCircle />
                          </IconButton>
                        ) : (
                          <div>
                            <IconButton
                              color="inherit"
                              edge="end"
                              aria-label="account of current user"
                              aria-controls={menuId}
                              style={{ color: 'white' }}
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <AccountCircle />
                            </IconButton>
                            <div>
                              <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                              >
                                <MenuItem
                                  className={classes.MenuItem}
                                  onClick={handleProfile}
                                >
                                  Profile
                                </MenuItem>
                                <MenuItem
                                  className={classes.MenuItem}
                                  onClick={handleLogout}
                                >
                                  Logout
                                </MenuItem>
                              </Menu>
                            </div>
                          </div>
                        )}
                      </div>
                    </Tabs>
                  </>
                )}
              </div>
            )}
          </div>
<div style={{ backgroulor: '#111' }}>
          <Menu
            id="simple-menu"

  className={classes.menu}
            anchorEl={anchorEl3}
            open={Boolean(anchorEl3)}
            onClose={handleHoverCloseAll}
            MenuListProps={{ onMouseLeave: handleHoverCloseAll }}
    
          >
            <MenuItem
              style={{ backgroundColor: '#111' ,color:"white"}}
              onClick={handleHoverClose}
            >
              Create LiveStream
            </MenuItem>
            <MenuItem  style={{ backgroundColor: '#111' ,color:"white"}} onClick={handleHoverJoin}>Join LiveEvent</MenuItem>
          </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {text && (
        <div>
          {handleSearch(videos).map((video, index) => {
            return (
              <div className="searchResualt">
                <Link
                  onClick={openProduct}
                  style={{ textDecoration: 'none' }}
                  key={index}
                  to={{
                    pathname: `/search/${video.Title}`,
                    state: { title: video.Title },
                  }}
                >
                  <div className="titleVideo">{video.Title}</div>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Header
