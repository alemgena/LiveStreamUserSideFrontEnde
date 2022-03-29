import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
//import "./Search.css";
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
import './Search.css';
import { url } from '../../utils/url';
import {imageVideoUrl} from'../../utils/url'
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingBox'
import SearchNotFound from '../../components/utils/searchNotFound'
const Search = (props) => {
  const dataEvent= props.location.state
  const route=dataEvent.title
  const location = props.location.pathname;

  console.log(route)
  const user = useSelector((state) => state.login.loggedUser);
  const [type, setType] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
const[videoCOntent,setVideoContent]=useState([]);
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });
  const fetchSearch = async () => {
    try {
    
        console.log('err')
        console.log(searchText)
       await axios.get(`${url}user/searchVideoByTitle/${route}`).then(responce=>{
        setLoading(false);
          console.log(responce)
        setVideoContent(responce.data.users)
        axios.post(`${url}user/createSearchHistory`,{searchName:searchText,userID:user.id}).then(responce=>{
          console.log(responce)
        })
        })
      /*
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);*/
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window.scroll(0, 0);
    fetchSearch();
 
    // eslint-disable-next-line
  }, []);
console.log(type)
console.log(videoCOntent)
return(
  <div className='trending'>

{loading ? (
        <Loading style={{ padding: "8em" }} />
      ):
     <div className="search-title">Search results for "{route}"
    {videoCOntent.length!==0 ? (
      <div>
  {videoCOntent.map((video)=>{
    return(
      <Link to={`/video/${video.videoInfo.video_id}`} style={{ textDecoration: 'none'}}>
      <div className='images'>
      <img             
        style={{
          width: '200px',
          height: '300px',
        }}
        alt='hello'
        src={`${url}images/${video.videoInfo.thumbnialFileName}`}
      ></img>
      </div>
      <div style={{textAlign:'center'}} className='text-team'>{video.Title}</div>
      </Link>
    )
  })} </div>)
 :(

<SearchNotFound/>


  )}
  </div>
}
</div>

/*
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div className='search'>
          <TextField
            style={{ flex: 1 }}
            className='searchBox'
            label='Search'
            variant='filled'
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant='contained'
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize='large' />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor='primary'
          textColor='primary'
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label='disabled tabs example'
        >
          <Tab style={{ width: '33%' }} label='Search Movies' />
          <Tab style={{ width: '33%' }} label='Search TV Series' />
          <Tab style={{ width: '34%' }} label='Videos' />
        </Tabs>
      </ThemeProvider>
      <div className='trending'>
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? 'tv' : 'movie'}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&!videoCOntent &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      <div className='trending'>
        {videoCOntent&&videoCOntent.map((video)=>{
          return(
            <Link to={`/video/${video.videoInfo.video_id}`} style={{ textDecoration: 'none'}}>
            <div className='images'>
            <img             
              style={{
                width: '200px',
                height: '300px',
              }}
              alt='hello'
              src={`${url}images/${video.videoInfo.thumbnialFileName}`}
            ></img>
            </div>
            <div className='text-team'>{video.Title}</div>
            </Link>
          )
        })}
        {searchText&&!videoCOntent&&
          <h2>No viedeo found</h2>
        }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
  */
)
};

export default Search;
