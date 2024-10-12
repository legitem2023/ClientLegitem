import React from 'react'

type PropsPrice = {
    item:any
}
const Sold:React.FC<PropsPrice> = ({item}) => {
  return (
    <div className="prodName">
    <span className='thumbElements'>Sold :</span>
    <span className="thumbElements">{item.TotalSoldItems ? item.TotalSoldItems : '0'}</span>
  </div>
  )
}

export default Sold