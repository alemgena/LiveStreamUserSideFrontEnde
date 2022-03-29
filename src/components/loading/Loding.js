import { CircularProgress } from '@material-ui/core';

import TableContainer from '@mui/material/TableContainer';
const Loading = ({ style }) => {
  return (
    <div className='loading'>
  
          <TableContainer 
      className='tableConitener'
          sx={{
        height:"250px",
        backgroundColor: " #111",
        borderBottom: "2px solid black",
           color:"white",
      }}
  
      >
          <i className='fa fa-spinner fa-spin'></i> Loading...
          </TableContainer>  
    </div>
  );
};
export default Loading;
