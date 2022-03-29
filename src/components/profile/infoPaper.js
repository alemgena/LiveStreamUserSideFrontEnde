import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { url } from '../../utils/url';
import { useSelector } from 'react-redux';
export default function SimplePaper() {
    
    const[data,setData]=React.useState([]);
    const userId = localStorage.getItem('user_id')
  React.useEffect(() => {
        getAllDatas();
        getGetAllSubscrieb();
        getGetAllSubscriebb();
      }, []);
      const[countSub,setCountSub]=React.useState([])
      const[countSubb,setCountSubb]=React.useState([])
      const getGetAllSubscrieb=()=>{
        axios.get(`${url}user/getAllUserSubscriebe/${userId}`).then((response)=>{
          console.log(response)
          setCountSub(response.data.subscrieb)
        })
      }
      const getGetAllSubscriebb=()=>{
        axios.get(`${url}user/getAllUserSubscriebeed/${userId}`).then((response)=>{
          console.log(response)
          setCountSubb(response.data.subscrieb)
        })
      }
      const getAllDatas = () => {
        axios.get(`${url}user/getUserbyVideo/${userId}`).then((response) => {
       
          setData(response.data.users.count)
        });
      };
      console.log(data)
  return (
      <div style={{marginLeft:"150px"}}>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
          color:"teal"
    
        },
      }}
    >
      <Paper elevation={0}>
        <div>You  are upload</div> 
      <div>  {data} videos </div> </Paper>
      <Paper>
    <div>Your follower is</div>
    <div>{countSub.length}</div>
      </Paper>
      <Paper elevation={3} >
        <div> You follwe
        </div>
    <div>{countSubb.length}</div>
      </Paper>
    </Box>
    </div>
  );
}