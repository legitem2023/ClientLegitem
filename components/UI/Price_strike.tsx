import React from 'react'
import { formatter } from 'utils/scripts'

type PropsPrice = {
    item:any
}
const Price_strike:React.FC<PropsPrice> = ({item}) => {
  return (
    <div>
        <span className='thumbElements'>Price :
            {item.discount > 0?(<span className='thumbElements_tag'>Less {100 - (item.discount * 100)}%</span>):""}
        </span>          
        <s className='thumbElements'>{formatter.format(item.price)}</s>
  </div>
  )
}

export default Price_strike