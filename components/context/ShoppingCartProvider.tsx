"use client"
import { Console } from 'console';
import { createContext, ReactNode, useState, useContext } from 'react';

interface ShoppingCartProviderProps {
  children: ReactNode;
}

interface ContextProps {
  cartItems: any[];
  handleAddToCart: (getCurrentItem: any) => void;
  handleRemoveFromCart: (itemId: any) => void;
}

export const ShoppingCartContext = createContext<ContextProps | undefined>(undefined);

export function useCartGlobalState() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}

export const getCartData = () => {
  const cartData = localStorage.getItem('cartItems');
  return cartData ? JSON.parse(cartData) : [];
};

export const setCartData = (cart) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  function handleAddToCart(getCurrentItem: any) {
    let cpyCartItems = getCartData();

    console.log(getCurrentItem);
    // Find the index of the item with the same productCode
    const existingItemIndex = cpyCartItems.findIndex(itemArray => itemArray[0].productCode === getCurrentItem[0].productCode);

    if (existingItemIndex !== -1) {
        // If the item exists, update its quantity
        cpyCartItems[existingItemIndex][0].Quantity += parseInt(getCurrentItem[0].Quantity);
    } else {
        // If the item doesn't exist, add it to the cart
        cpyCartItems.push(getCurrentItem);
    }

    // Update state and localStorage
    setCartItems(cpyCartItems);
    setCartData(cpyCartItems);
}
  function handleRemoveFromCart(itemId: any) {
    let getCurrentItem = getCartData();
    console.log(getCurrentItem)
    let cpyCartItems = getCurrentItem.filter(item => item[0].productCode !== itemId);
    setCartItems(cpyCartItems);
    setCartData(cpyCartItems);
  }

  const contextValue: ContextProps = {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>)
}

