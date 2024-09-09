import React from 'react'
import useNewsNotification from 'components/Hooks/useNewsNotification'
const NewsNotification = () => {
    const { updateNews } = useNewsNotification();
  return (
    <div style={{display:updateNews===0?"none":"flex",width:"25px",height:"25px",borderRadius:"50%",backgroundColor:"red",color:"white",justifyContent:"center",alignItems:"center",fontSize:"10px",position:"absolute",top:"0px"}}>{updateNews}</div>
  )
}

export default NewsNotification