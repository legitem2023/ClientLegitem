import { Icon } from '@iconify/react';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import React, { useContext } from 'react'
import DataManager from 'utils/DataManager';
import { Cart } from 'utils/scripts';

type PropsAddCartCmdView = {
    viewedProduct:any
    quantity:any
}
const AddCartCmdView:React.FC<PropsAddCartCmdView> = ({viewedProduct,quantity}) => {
    const { handleAddToCart } = useContext(ShoppingCartContext);
    const Manager = new DataManager();
    return (
    <button onClick={() => handleAddToCart(Cart(viewedProduct, Manager, quantity))} className='addCart universalButtonStyle'>
        <Icon icon="mdi:cart" /> Add to Cart
    </button>
  )
}

export default AddCartCmdView