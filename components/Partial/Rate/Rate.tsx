import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Rate(feedBack:any) {
  // console.log(feedBack.feedBack)
  const feedBackState = feedBack.feedBack;
  return (
    <div className='Ratings'>
    <Stack spacing={1}>
      <Rating 
        name="Ratings" 
        defaultValue={0} 
        precision={0.1} 
        sx={{ fontSize: '30px' }} // Change the fontSize to resize the stars
        onChangeActive={(event:any, newHover) => {
          console.log(event.target.name)
          feedBackState((prev)=>({
            ...prev,
            "Ratings":newHover
          }))
        }}/>
    </Stack>
    </div>
  );
}
