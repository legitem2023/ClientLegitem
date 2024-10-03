'use client'
import { Icon } from '@iconify/react'
import Menu from 'components/Partial/Menu'
import Image from 'next/image'
import React,{useState,useEffect, useContext, useRef, use} from 'react'
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { extracted, filterAndSumQuantity, formatter, handleError, imageSource, imageSource_cart } from 'utils/scripts'
import Thumbnails from 'components/Products/Products'
import CartCols from './CartCols'
import AddQuantityCmd from 'components/Commands/AddQuantityCmd'

const CartBody = () => {
  const path = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const [Storage,setStorage] = useState(null);
  const [useFilteredStorage,setFilteredStorage] = useState([]);
  const [useGrandTotal,setGrandTotal] = useState(0);
  const reload = useRouter();
  const [loadingState,setLoading] = useState(false)
  console.log(useGrandTotal,"total")
  const { handleAddToCart, handleRemoveFromCart } = useContext(ShoppingCartContext);
  useEffect(() => {
    // Ensure the code runs on the client only
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('cartItems');
        if (storedData) {
          setStorage(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Failed to load cart items from localStorage', error);
      }
    }
  }, []);

  if(Storage < 1 || Storage ===null){
    return (
      <div className='body'>
      <div className='LeftWing'>
          {/* <Menu/> */}
      </div>
        <div className='middlecontainer'>
        <div className='carousel'>
        <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" />Empty Cart</div>
        <CartCols/>
        <div className='game-icons--shopping-cart'>
          <div>
            <h2>Your cart is Empty</h2>
            <p>Looks like you have not added anything to your cart Go ahead and explore the shop</p>
            {/* <button className='universalButtonStyle'>Explore</button> */}
          </div>
  
        </div>
  
        </div>
        <div>
          <div className='LabelHead carouselLabel'><Icon icon="bi:tags-fill" /> Products</div>
              <Thumbnails/>
          </div>
        </div>
      </div>
    )
  }


const filtered_data = filterAndSumQuantity(extracted(Storage));

let sumAmount = 0;

  const handleRemoveFromCartAndUpdate = (productCode: string) => {
    handleRemoveFromCart(productCode);
  
    // Update localStorage after removing the item
    const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]').filter(
      (item: any) => item.productCode !== productCode
    );
  
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setStorage(updatedCart); // Trigger re-render by updating state
  };
  


return(
    <div className='body'>
        <div className='LeftWing'>
            <Menu/>
        </div>
        <div className='middlecontainer'>
            <div>
              {/* <ThreeJS/> */}
            </div>
            <div className='carousel'>
              <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /> Cart</div>
                <CartCols/>
              {filtered_data.map((item:any, innerIdx:any) => (
                
                <div key={innerIdx} className='CartCols'>
                  <div className='CartImage'>
                    <Image 
                          className="CartImageImage"                 
                          onError={handleError}
                          src={imageSource_cart(item)}
                          height="156"
                          width="200"
                          quality={1} 
                          alt={innerIdx}></Image>
                  </div>
                  <div className='CartDetails'>
                    <span>Name: {item.Name}</span>
                    <span>Size: {item.Size}</span>
                    <span>Color: {item.Color}</span>
                    <span>Price: {formatter.format(item.Price)}</span>
                  </div>
                  <div className='CartDetails CartDetailsCenter'>
                  <AddQuantityCmd item = {item}
                                  innerIdx={innerIdx}
                                  filtered_data={filtered_data}
                                  setGrandTotal={setGrandTotal}/>
                  </div>
                  <div className='CartDetails CartDetailsCenter'>
                    <div className='CartDetailsCenter' id={"Subtotal"+innerIdx}>
                      {formatter.format(item.Price * item.Quantity)}              
                    </div>
                  </div>
                  <div className='CartDetails CartDetailsCenter' >
                    <input type='hidden' value={(sumAmount +=(item.Price * item.Quantity))}></input>
                    <Icon icon="clarity:trash-solid" aria-label={item.productCode} className='removeTocart' onClick={(e:any) =>handleRemoveFromCartAndUpdate(item.productCode)}/>
                  </div>
                </div>
    ))}

          <div className='CartColsHeadSutotalInMB'>
                  <div className=''></div>
                  <div className=''></div>
                  <div className=''></div>
                  <div className='CartColsHeadSutotal'>
                    <span>Sub Total :</span>
                    <span id='TotalAmount'>{useGrandTotal===0?formatter.format(sumAmount):formatter.format(useGrandTotal)}</span>
                    <span>VAT :</span><span>10%</span>
                    <span>Shipping Fee :</span><span>{formatter.format(10)}</span>                                                
                    <span>Total Amount :</span><span>{formatter.format(sumAmount)}</span>
                    <span></span>
                    <span><Link href='/Checkout/' className='checkoutLink' onClick={()=>setLoading(true)}>
                            {loadingState ? (
                              <>
                                <Icon icon="material-symbols:shopping-cart-checkout" /> Loading <Icon icon="eos-icons:loading" />
                              </>
                            ) : (
                              <>
                                <Icon icon="material-symbols:shopping-cart-checkout" /> Checkout
                              </>
                            )}
                          </Link>
                    </span>
                  </div>
            </div>
            
            <div>
            <div className='LabelHead carouselLabel'><Icon icon="bi:tags-fill" /> Products</div>
            <Thumbnails/>
            </div>
            </div>
        </div>
        
        <div className='RightWing'></div>
    </div>
  )
}

export default CartBody