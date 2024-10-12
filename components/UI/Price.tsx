import React from 'react'
import { formatter } from 'utils/scripts'

type PropsPrice = {
    item:any
}
const Price:React.FC<PropsPrice> = ({item}) => {
  return (
    <div>
    <span className='thumbElements'>Price :</span>
    <span className='thumbElements'>{formatter.format(item.price)}</span>
  </div>
  )
}

export default Price