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
import { useMediaQuery } from 'react-responsive'

const useStyles = makeStyles((theme) => ({
  cardRes: {
maxWidth:130,
maxHeight:280
  },
  card: {
maxWidth:300
  },
  cardAction: {
    position: 'relative',
  },
  media: {
   height:0, 
    // some styles
    paddingTop: '56.25%'
  },
      imageRes:{

    maxHeight:190
    },
    contentRes:{
      minHeight:90
    },
    content:{

    },

  overlay: {
    position: 'absolute',
    top: '85px',
  },
  arrowUp: {
    fontSize: '100px',
  },
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
    bre:{
    marginLeft:"75px"

  },
    breRes:{
    marginLeft:"30px"

  },
}))
function SeriesVideos(props) {
    const md = useMediaQuery({ query: '(max-width: 576px)' })
  const [show, setShow] = React.useState(false)
  const handleMouseOver = () => {
    setShow(true)
  }
  const handleMouseOut = () => {
    setShow(false)
  }
  const classes = useStyles()
  const [videos, setVideos] = useState([])
  useEffect(() => {
    const route = 'Tv_series'
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
        className={md? classes.breadcrumRes: classes.breadcrumb}
      >
        <div className={md? classes.breRes: classes.bre}>
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
     
          style={{ marginRight: '20px', textDecoration: 'none'  }}
        >
          Tv_series
        </Link>
      </Breadcrumbs>
    
    <div className="liveChannels">
      <Grid container spacing={4}>
        {videos.map((video) => (
          <Grid item md={2} key={video.video_id}>
              <Card  className={md?classes.cardRes:classes.card}
                 style={{ backgroundColor: 'transparent' }}
              >
              <Link
                to={`/video/${video.video_id}`}
                style={{ textDecoration: 'none' }}
              >
                <CardActionArea
                  style={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    display: 'flex',
                  }}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <CardMedia 
                    component="img"
                      className={md?classes.imageRes:classes.image}
                    image={`${url}/images/${video.thumbnialFileName}`}
                  ></CardMedia>
               
                </CardActionArea>
              <CardContent className={md?classes.contentRes:classes.content}>
                  <Typography style={{ color: 'white' }}>
                    {video.video_title.Title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    </div>
  )
}
export default SeriesVideos
