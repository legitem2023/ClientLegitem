'use client'
import React from 'react'
import menuList from '../../../json/menu.json'
import { Icon } from '@iconify/react';
import { setGlobalState } from 'state';
const Menu = () => {
  const sortEngine = ((e: any) => {
    console.log(e.target.getAttribute("value"));
    setGlobalState("thumbnailCategory", e.target.getAttribute("value"));
  })
  return (
    <ul className='Menu'><li className='Menu_label'>Menu</li>{menuList.map((item: any, index: any) => (
      <li key={index} className={item.Name === 'Category' ? 'category_li' : 'menu_li'}>{item.Name === 'Category' ? <label htmlFor={"collapsecategory" + index} className={item.Name === 'Category' ? 'categorylabel' : 'menulabel'}>
        <Icon icon={item.icon} /><span>{item.Name}</span>
        <Icon icon='bxs:chevron-down' /></label> : <label className={item.Name === 'Category' ? 'categorylabel' : 'menulabel'}><Icon icon={item.icon} />{item.Name}</label>}
        <input type='checkbox' id={"collapsecategory" + index} className='hidden' /><span></span>
        <ul className='category_list'>
          <br />
          {
            item.branch !== "" ? item.branch.map((items: any, indexes: any) => (<li className='category_list_div' onClick={(e: any) => sortEngine(e)} value={items.Name} key={indexes}><Icon icon={items.icon} />{items.Name}</li>)) : ""}
        </ul>
      </li>
    ))
    }</ul>
  )
}

export default Menu