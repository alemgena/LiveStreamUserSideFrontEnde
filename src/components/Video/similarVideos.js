import React,{useEffect} from 'react';
import axios from 'axios'
import { url } from '../../utils/url'
import { Col, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  media: {           // this is the`className` passed to `CardMedia` later
    height: 200,     // as an example I am modifying width and height
    //width: 200,

  },
  card:{
    width:130
  },
   mediaRes: {           // this is the`className` passed to `CardMedia` later
   // height: 200,     // as an example I am modifying width and height
    //width: 200,

  },
  cardRes:{
 maxWidth:115,
  }
  }))
export default function SimilarVideos(props) {
    const md = useMediaQuery({ query: '(max-width: 576px)' })
      const md4 = useMediaQuery({ query: '(max-width: 1043px)' })
const classes=useStyles()
    const route=props
    console.log(route)
    const route1="Trading"
  const[data,setData]=React.useState([])
    const [loadingT, setLoadingT] = React.useState(false);
useEffect(() => {
 if(!props.data) return;
    axios.get(`${url}user/getVideoByCategoriey/${props.data}`).then(responce=>{
  setLoadingT(false)
    console.log(responce)

    setData(responce.data.data)
    
})
    console.log("the route is:",route)
    console.log(route1)
    //window.scrol
    // eslint-disable-next-line
  }, [props.data])
  const clickMe=()=>{
console.log('card is click')
   window.location.reload();
  }
  return <div>
    {md4?
    
    <Grid container spacing={4}>
            {data.map((item, index) => {
          
              return(
           <Grid item md={3} key={item.video_id}>

              <Card 
                 style={{ backgroundColor: 'transparent' }}
               className={md?classes.cardRes: classes.card} onClick={(event) => 
          {clickMe(event)}}>
               <Link
               
              to={`/video/${item.video_id}`}
              style={{ textDecoration: 'none' }}
            >
               <CardActionArea>
                  <CardMedia
             className={md? classes.mediaRes: classes.media}
                         component="img"
   image={`${url}images/${item.thumbnialFileName}`}
                  >
                  </CardMedia>
                   <CardContent>
                    <Typography style={{marginRight:'10px',color:"white"}}>{props.data}</Typography>
                  </CardContent>
                  </CardActionArea>
                </Link>
             </Card>
         </Grid>   )})}
         </Grid>
  :
    <Grid container spacing={10}>
            {data.map((item, index) => {
          
              return(
           <Grid item md={4} key={item.video_id}>
              <Card  
                               style={{ backgroundColor: 'transparent' }}
              className={md?classes.cardRes: classes.card} onClick={(event) => 
          {clickMe(event)}}>
               <Link
               
              to={`/video/${item.video_id}`}
              style={{ textDecoration: 'none' }}
            >
               <CardActionArea>
                  <CardMedia
             className={md? classes.mediaRes: classes.media}
                         component="img"
   image={`${url}images/${item.thumbnialFileName}`}
                  >
                  </CardMedia>
                   <CardContent>
                    <Typography style={{marginRight:'10px',color:"white"}}>{props.data}</Typography>
                  </CardContent>
                  </CardActionArea>
                </Link>
             </Card>
         </Grid>   )})}
         </Grid>
}
  </div>
}
