import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import {url} from '../../utils/url'
import axios from 'axios'
import { useHistory } from "react-router-dom";
export default function PinnedSubheaderList(props) {
    console.log(props.passedFunction)
function CLosedDrawer(){
    return 
}
    let history = useHistory();
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
           // eslint-disable-next-line no-unused-expressions
           props.passedFunction(false)
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
                  props.passedFunction(false)
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
      sx={{
        minWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        minHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={
        <ListSubheader style={{backgroundColor:"teal",color:"white"}} component="div" id="nested-list-subheader">
    All Category
        </ListSubheader>
      }
    >
           <div style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
   <div>
        {CategorieInfo.map((item,index)=>(

      <ListItemButton  onClick={(e)=>
            {
              getSubCategory(item.id,item.catagory_Name,'one')
            }}>
              
        <ListItemText primary={item.catagory_Name} />
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