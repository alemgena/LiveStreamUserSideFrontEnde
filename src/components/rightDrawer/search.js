import SearchOutlined from "@material-ui/icons/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../utils/url";
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { rightDrawerSlice } from "../../slices/rightDrawer";
import {imageVideoUrl} from '../../utils/url'
const Search = () => {
  const user = useSelector((state) => state.login.loggedUser);
    const dispatch = useDispatch();
  const rightDrawerActions = rightDrawerSlice.actions;
  const [text, setText] = useState("");
  const [data,setaData]=useState([])
  const[videos,setVideos]=useState([])
  useEffect(() => {
    axios.get(`${url}video/getAllTitle`).then((response) => {
      if (response) {
        console.log(response.data.video);
        // console.log(response.data.success.thumbnialFilePath);
        setVideos(response.data.video);
      } else {
        console.log('field to get the video data');
      }
    });
  }, []);
  const handleSearch = (rows) => {
    console.log(rows)
      return rows.filter(
        (row) => row.Title.toString().toLowerCase().indexOf(text.toLowerCase()) > -1
      );
    };
  const hideDrawer = () => {
    dispatch(rightDrawerActions.hideDrawer());
    document.body.style.overflow = "visible";
  };
  const openProduct = () => {
    hideDrawer();
  };
  return (
    <div className="search">
      <div className="search-inner">
        <input
          type="text"
          value={text}
        onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="search-results">
        <div className="search-results-header">Search results :</div>
        <div className="search-results-content">
        { text &&
      <div>
      {handleSearch(videos).map((video, index) => {
return(
  <div>
  <Link onClick={openProduct} style={{ textDecoration: 'none'}} key={index} to= {{
     pathname:`/search/${video.Title}`,
     state:{title:video.Title}
      }}>
  <div className='textTitle'>{video.Title}</div>
  </Link>
  </div>
)
})}
      </div>
}
        </div>
      </div>
    </div>
  );
};
export default Search;
