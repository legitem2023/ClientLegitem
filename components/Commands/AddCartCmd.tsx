import { Icon } from '@iconify/react'
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import React, { useContext } from 'react'
import { setGlobalState } from 'state';
import DataManager from 'utils/DataManager';
import { Cart } from 'utils/scripts';

type PropsAddCartCmd = {
    item: any
}
const AddCartCmd:React.FC<PropsAddCartCmd> = (item) => {
    const { handleAddToCart } = useContext(ShoppingCartContext);
    const Manager = new DataManager();
    const HandleAddtoCartThumbs = (item) =>{
        handleAddToCart(Cart([item], Manager, 1))
      }
    
  return (
    <Icon 
    icon='mdi:cart' 
    className='iconify_cart' 
    onClick={() => HandleAddtoCartThumbs(item.item)}
  />
  )
}

export default AddCartCmd