import React from 'react'
type PropsPrice = {
    item:any
}
const Name:React.FC<PropsPrice> = ({item}) => {
  return (
    <div className="prodName">
    <span className='thumbElements'>Name :</span>
    <span className="thumbElements">{item.name ? item.name : 'Untitled'}</span>
  </div>
  )
}

export default Name