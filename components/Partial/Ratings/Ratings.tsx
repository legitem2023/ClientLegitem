import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Ratings() {
  return (
    <div className='Ratings'>
    <Stack spacing={1}>
      <Rating 
        name="size-large" 
        defaultValue={5} 
        precision={0.1} 
        readOnly
        sx={{ fontSize: '20px' }} // Change the fontSize to resize the stars
        onChangeActive={(event, newHover) => {
        console.log(newHover)
        }}/>
    </Stack>
    </div>
  );
}
