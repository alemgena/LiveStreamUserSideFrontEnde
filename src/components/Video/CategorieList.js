import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import axios from 'axios'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles';
import Table from 'react-bootstrap/Table';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//import customerList from '../assets/JsonData/customers-list.json'
import { url } from '../../utils/url';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  listWrap: {
    "&:hover": {
   //   border: "1px solid teal",
      color: "teal"
    },
    "&:active": {
      background: "#6c757d",
      color: "brown"
    }
  }
}))

export default function Categoriey(props) {
  let history = useHistory();
  const classes=useStyles()
  const [sub, setSub] = React.useState([]);
  const [CategorieInfo, setCategorieInfo] =React.useState([]);

  const [subsubCategories,setSubsubcategories]=React.useState([])
  const [subsubsubCategories,setSubsubsubcategories]=React.useState([])
  const [showSubSubSubcategories,setShowSubSubSubcategories]=React.useState(false);
  const [showSubcategories,setShowSubcategories]=React.useState(false);
  const [showSubSubcategories,setShowSubSubcategories]=React.useState(false);
  React.useEffect(() => {
    getAllDatas();
    }, []);
  const getAllDatas = () => {
    axios.get(`${url}catagorey/getMainCategorie`).then((response) => {
      if (response.data.data) {
        console.log(response.data.data);
        setCategorieInfo(response.data.data);
        
      } else {
        console.log('error to get categoriey');
      }
    });
  };
  const getSubCategory=(id,categorieName,type)=> {
    console.log(id)
    axios.get(`${url}catagorey/getAllSubCatagory/${id}`).then((response) => {
      if (response.data.data) {
        console.log(response.data.data);
        if(type==="one"){
        setSub(response.data.data);

        if(response.data.data.length < 1)
        {
          setShowSubcategories(false)
          console.log(categorieName)
          history.push(`/categorie/${categorieName}`);
        }
        else
        {
          setShowSubcategories(true)
          setShowSubSubcategories(false)
        }
      }
      if(type==="two")
            { 
              setSubsubcategories(response.data.data)
              if(response.data.data.length < 1)
              {
                setShowSubSubcategories(false)
                history.push(`/categorie/${categorieName}`); 
              }
              else
              {
                setShowSubSubcategories(true)
              }
            }
            if(type==="three")
            {
              setSubsubsubcategories(response.data.data)
        
              if(response.data.data.length < 1)
              {
                history.push(`/categorie/${categorieName}`); 
              }
            }
    }
    });
  }
  return (
    <List 
      sx={{ width: '100%', maxWidth: 360 ,marginLeft:"40px"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader style={{backgroundColor:"teal",color:"white"}} component="div" id="nested-list-subheader">
    All Category
        </ListSubheader>
      }
    >
        <div style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
        <div>
        {CategorieInfo.map((item,index)=>(

      <ListItemButton className={classes.listWrap} onClick={(e)=>
            {
              getSubCategory(item.id,item.catagory_Name,'one')
            }}>
              
        <ListItemText primary={item.catagory_Name} />
        <ArrowRightIcon />
      </ListItemButton>
        ))}
        </div>
        {showSubcategories &&
 <div  onClickOutside={()=>
  {
    setShowSubcategories(false)
  }}>  
 {sub && sub.map((item,index)=>(

<ListItemButton onClick={(e)=>
            {
              getSubCategory(item.id,item.catagory_Name,'two')
            }}
     >
    
 <ListItemText primary={item.catagory_Name} />

</ListItemButton>
 ))}
 </div> }
 {showSubSubcategories &&
 <div onClickOutside={()=>
  {
    setShowSubSubcategories(false)
  }
  } >
 {subsubCategories && subsubCategories.map((item,index)=>(

<ListItemButton onClick={(e)=>
            {
              getSubCategory(item.id,item.catagory_Name,'three')
            }}
     >
    
 <ListItemText primary={item.catagory_Name} />

</ListItemButton>
 ))}
 </div> }
        </div>
      
    </List>
  );
}