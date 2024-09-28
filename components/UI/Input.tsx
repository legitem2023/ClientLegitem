import React from 'react'

const Input = ({type,placeholder,value,name,func}) => {
  return (
    <input type={type} defaultValue={value}  name={name} placeholder={placeholder} onChange={(e)=>func(e)} className='uniInput'/>
  )
}

export default Input