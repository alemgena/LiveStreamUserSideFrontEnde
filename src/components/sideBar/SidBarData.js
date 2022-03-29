
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import TvIcon from '@material-ui/icons/Tv';
import MovieIcon from '@material-ui/icons/Movie';
export const SideBar=[
    {
title:"Home",
icon:<HomeIcon/>,
path:"/",
cName: 'nav-text'

    },
    {
 title:"Trending",
 icon:<WhatshotIcon/>,
 path:"/Trending",
cName: 'nav-text'
  },
 {
 title:"Movies",
icon:<MovieIcon/>,
path:"/movies",
cName: 'nav-text'
                
 },
 {
 title:"TV_Serious",
 icon:<TvIcon/>,
 path:"/series",
 cName: 'nav-text'
                 
  }
]