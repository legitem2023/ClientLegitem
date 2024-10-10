import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function Ratings({ data,count }) {
  // Use state to control the rating value
  const [ratingValue, setRatingValue] = useState(data); // Initialize with passed data
 
  return (
    <div className="Ratings">
      <Stack spacing={1}>
        <Rating
          name={`rating-${data}`}
          value={data} // Controlled value
          precision={0.1}
          readOnly
          sx={{ fontSize: '20px' }} // Change the fontSize to resize the stars
          // onChange={(event, newValue) => setRatingValue(newValue)} // Update state when rating changes
          // onChangeActive={(event, newHover) => {
          //   console.log(`Hover rating:`, newHover);
          // }}
        />
      </Stack>
    </div>
  );
}
