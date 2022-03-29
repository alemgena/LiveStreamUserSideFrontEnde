/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './step.scss'
import TableContainer from '@mui/material/TableContainer';
import { url } from '../../utils/url'
import Paper from '@mui/material/Paper';
import NoData from './2953962.jpg'
export default function NoDataa() {
  return (
           <div>
      <TableContainer 
      className='tableConitener'
          sx={{
        height:"250px",
        backgroundColor: " #111",
        borderBottom: "2px solid black",
           color:"white",
      }}
  
      >
        <img className='noData' src={NoData}></img>
          </TableContainer>  
          </div>
  )
}
