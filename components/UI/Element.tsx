import React from 'react'

type PropsElement = {
    "Label":string,
    "value":any,
}
const Element:React.FC<PropsElement> = ({Label,value}) => {
  return (
    <div className="UniversalLabels">
      <span className='thumbElements'>{Label} :</span>
      <span className='thumbElements'>{value}</span>
    </div>
  )
}

export default Element