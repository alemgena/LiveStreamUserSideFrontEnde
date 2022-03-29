import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {url} from '../../utils/'
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';

function RenderRow(props) {

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
 
  let history = useHistory();
  const [sub, setSub] = React.useState([]);
  const [CategorieInfo, setCategorieInfo] =React.useState([]);

  const [subsubCategories,setSubsubcategories]=React.useState([])
  const [subsubsubCategories,setSubsubsubcategories]=React.useState([])
  const [showSubSubSubcategories,setShowSubSubSubcategories]=React.useState(false);
  const [showSubcategories,setShowSubcategories]=React.useState(false);
  const [showSubSubcategories,setShowSubSubcategories]=React.useState(false);
  const { index, style } = props;

  return (

    <ListItem style={style}  component="div" disablePadding>
    {CategorieInfo.map((item,index)=>(
      <ListItemButton>
        <ListItemText primary={item.catagory_Name} />
      </ListItemButton>
             ))}
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={200}
        overscanCount={5}
      >
        {RenderRow}
      </FixedSizeList>
    </Box>
  );
}