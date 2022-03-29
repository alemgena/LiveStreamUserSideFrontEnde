import React from 'react';
import './liveChannel.scss'
import { Link } from 'react-router-dom'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Breadcrumbs
} from '@mui/material'
import data from '../../utils/data'
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from 'react-responsive'
const useStyles = makeStyles((theme) => ({
 breadcrumb: {
    backgroundColor: ' #111',
    fontWeight: 100,
    fontSize: [40, '!important'],
  },
  bre: {
    marginLeft: '75px',
  },
  breRes: {
    marginLeft: '35px',
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
  }))
function LiveChannelDetail(props) {
const name = props.match.params.name
console.log(name)
 const product = data.liveChannels.find((a) => a.name === name)
 const notInclude=data.liveChannels.find((a)=>a.name!==name)
 console.log(notInclude.name)
const classes = useStyles()
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  return (
    <div>
<Breadcrumbs
        separator=" "
        aria-label="breadcrumb"
        style={{ color: 'white' }}
        className={classes.breadcrumb}
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
          to='/liveChannels'
          style={{ marginRight: '20px', textDecoration: 'none' }}
        >
          Liv Channels <span style={{ }}>/</span>
        </Link>
  
          <Link
          className={classes.breadcrumbLink}
          style={{textDecoration: 'none' }}
        >
         <span style={{marginRight:"20px"}}>{product.name}</span> 
        </Link>
      </Breadcrumbs>
    
  <div className="liveChannels"> 
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
        <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.image}
                    title={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography>{product.name}</Typography>
                  </CardContent>
                </CardActionArea>
        </Grid>
      <Paper    sx={{
          m: 1,
          width:600,
          height: 128,
      
      }}  >{product.description}</Paper>
        </Grid>
    
  </div>
  </div>
  )
}

export default LiveChannelDetail;
