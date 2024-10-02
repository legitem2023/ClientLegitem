import React from 'react'

type Props = {
    Paragraph :string
}
const Paragraph:React.FC = ({Paragraph}:Props) => {
  return (
    <div className='p-2'>{Paragraph}</div>
  )
}

export default Paragraph