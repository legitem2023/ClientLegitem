import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
const Disclaimer = () => {
  return (
    <div>
        <div>{DisclaimerJson['General_Disclaimer'].content}</div>
        <div>{DisclaimerJson['External_Links_Disclaimer'].content}</div>
        <div>{DisclaimerJson['Professional_Advice_Disclaimer'].content}</div>
        <div>{DisclaimerJson['Limitation_of_Liability'].content}</div>
        <div>{DisclaimerJson['Changes_to_This_Disclaimer'].content}</div>
    </div>
  )
}

export default Disclaimer