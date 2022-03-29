import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import TvIcon from "@material-ui/icons/Tv";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { useHistory } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
const useStyles = makeStyles({
  root: {
    
    width: "100%",
    position: "fixed",
    bottom: 0,
    backgroundColor: "#111",
    zIndex: 100,
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const history = useHistory();

  useEffect(() => {
    if (value === 0) {
      history.push("/Trending");
    } else if (value === 1) {
      history.push("/movies");
    } else if (value === 2) {
      history.push("/series");
    } else if (value === 3) {
      history.push("/uploadVideo");
    }
  }, [value, history]);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        style={{color: "white" }}
        label="Trending"
        icon={<WhatshotIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="Movies"
        icon={<MovieIcon />}
      />
      <BottomNavigationAction
        style={{ color: "white" }}
        label="TV Series"
        icon={<TvIcon />}
      />
      <BottomNavigationAction
        style={{ width:"2px", color: "white" }}
        label="UploadVideo"
        icon={<FileUploadIcon />}
      />
    </BottomNavigation>
  );
}