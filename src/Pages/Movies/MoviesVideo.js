import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url } from '../../utils/url'
import { Link } from 'react-router-dom'

import {
  Breadcrumbs,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
} from '@mui/material'
import data from '../../utils/data'
import { teal, pink } from '@mui/material/colors'
import Paper from '@mui/material/Paper'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router'
import { useMediaQuery } from 'react-responsive'
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    backgroundColor: ' #111',

    fontWeight: 100,
    fontSize: [40, '!important'],
  },
     breadcrumRes: {
    backgroundColor: ' #111',

    fontWeight: 100,
    fontSize: [20, '!important'],
  },
  breadcrumbLink: {
    color: '#BBBBBB',
    marginBottom: '60px',
    fontWeight: 600,
    fontSize: [17, '!important'],
    '&:hover': {
      color: '#BBBBBB',
      textDecoration: 'underline #000000',
    },
  },
  bre: {
    marginLeft: '75px',
  },
  breRes: {
    marginLeft: '30px',
  },
  cardRes: {
    maxWidth: 130,
    maxHeight: 280,
  },
  card: {
    maxWidth: 190,
  },
  cardAction: {
    position: 'relative',
  },
  media: {
    // some styles
  },
  image: {
    maxHeight: 300,
    // some styles

    //width: 'fit-cover !important',
    // backgroundColor: "transparent",
  },
  imageRes: {
    maxHeight: 190,
  },
  contentRes: {
    minHeight: 90,
    backgroundColor: 'transparent',
  },
  content: {},

  overlay: {
    position: 'absolute',
    top: '85px',
  },
  arrowUp: {
    fontSize: '100px',
  },
}))
function MoviesVideos(props) {
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const history = useHistory()
  const [show, setShow] = React.useState(false)
  const handleMouseOver = () => {
    setShow(true)
  }
  const handleMouseOut = () => {
    setShow(false)
  }
  /* const PlayVideo=(id)=>{
        history.push(`/video/${}`)

  }*/
  const classes = useStyles()
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const route = 'Movies'
    axios.get(`${url}user/getVideoByCategoriey/${route}`).then((response) => {
      if (response) {
        console.log(response.data.data)
        // console.log(response.data.success.thumbnialFilePath);
        setVideos(response.data.data)
      }
    })
  }, [])
  return (
    <div>
      <Breadcrumbs
        separator=" "
        aria-label="breadcrumb"
        style={{ color: 'white' }}
        className={md? classes.breadcrumRes:classes.breadcrumb}
      >
        <div className={md ? classes.breRes : classes.bre}>
          <Link
            className={classes.breadcrumbLink}
              style={{ textDecoration: 'none' }}
              to={`/`}
          >
            Home <span style={{ marginLeft: '5px' }}>/</span>
          </Link>
        </div>
        <Link
          className={classes.breadcrumbLink}
          style={{ marginRight: '20px', textDecoration: 'none' }}
        >
          Movies
        </Link>
      </Breadcrumbs>
      <div className="liveChannels">
        <Grid container spacing={4}>
          {videos.map((video) => (
            <Grid item md={2} key={video.video_id}>
              <Card
                style={{ backgroundColor: 'transparent' }}
                className={md ? classes.cardRes : classes.card}
              >
                <Link
                  to={`/video/${video.video_id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardActionArea>
                    <CardMedia
                      style={{ backgroundColor: 'transparent' }}
                      component="img"
                      className={md ? classes.imageRes : classes.image}
                      image={`${url}/images/${video.thumbnialFileName}`}
                    ></CardMedia>
                  </CardActionArea>
                  <div>
                    <CardContent
                      className={md ? classes.contentRes : classes.content}
                    >
                      <Typography style={{ color: 'white' }}>
                        {video.video_title.Title}
                      </Typography>
                    </CardContent>
                  </div>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
export default MoviesVideos
