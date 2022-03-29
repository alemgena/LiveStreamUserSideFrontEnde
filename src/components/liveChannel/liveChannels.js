import React from 'react'
import data from '../../utils/data'
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
  Breadcrumbs,
} from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from 'react-responsive'
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    backgroundColor: ' #111',

    fontWeight: 100,
    fontSize: [40, '!important'],
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
    maxHeight: 250,
  },
  card: {
    maxWidth: 300,
    objectFit:'contain !important',
  },
  image: {
    objectFit: 'cover !important',
    //:"fit-content !important",
    //  width: '100%',
    //  backgroundSize: 'contain',
    // backgroundRepeat: 'no-repeat',
  },
}))
function LiveChannels() {
  const md = useMediaQuery({ query: '(max-width: 576px)' })
  const classes = useStyles()
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
          style={{ marginRight: '20px', textDecoration: 'none' }}
        >
          Liv Channels
        </Link>
      </Breadcrumbs>

      <div className="liveChannels">
        <Grid container spacing={4}>
          {data.liveChannels.map((channaels) => (
            <Grid item md={2} key={channaels.name}>
              <Card
                className={md ? classes.cardRes : classes.card}
                style={{ backgroundColor: 'transparent' }}
              >
                <Link
                  to={`/single-channel/${channaels.name}`}
                  style={{ textDecoration: 'none' }}
                >
                  <CardActionArea className={classes.image}>
                    <CardMedia
                      className={classes.image}
                      component="img"
                      height={200}
                      image={channaels.image}
                      title={channaels.name}
                    />
                    <CardContent>
                      <Typography style={{ color: 'white' }}>
                        {channaels.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default LiveChannels
/*
<Grid container spacing={4}>
        {data.products.map((product) => (
          <Grid item md={3} key={product.name}>
            <Card>
        
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
         
              <CardActions>
                <Typography>${product.price}</Typography>
                <Button size="small" color="primary">
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>


*/
