import React from 'react'
import { formatter } from 'utils/scripts'

type PropsPrice = {
    item:any
}
const Discounted:React.FC<PropsPrice> = ({item}) => {
  return (
    <div>
    <span className='thumbElements'>Discounted :</span>
    <span className='Price'>{formatter.format(item.price * item.discount)}</span>
  </div>
  )
}

export default Discounted