'use client'
import { Icon } from '@iconify/react'
import Menu from 'components/Menu'
import Image from 'next/image'
import React,{useState,useEffect, useContext} from 'react'
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import Link from 'next/link'

const CartBody = () => {
  const [Storage,setStorage] = useState(null);
  const [useGrandTotal,setGrandTotal] = useState(0);
  const { handleAddToCart } = useContext(ShoppingCartContext);
  // const path = process.env.NEXT_PUBLIC_PATH
  const path = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
  });

useEffect(()=>{
  setStorage(localStorage.getItem("cartItems"))
},[])
  if(!Storage) return
  const data = JSON.parse(Storage);
  
  const extracted = () =>{
    const arrayData = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      arrayData.push(element);
    }
    return arrayData.sort((a,b)=>b.Quantity - a.Quantity).map((item:any,idx:any)=>{ return item[0]})
  }

  function filterAndSumQuantity(jsonData:any) {
    const uniqueEntries = [];
    const sumMap = new Map();
  
    jsonData.forEach((item:any) => {
      const productCode = item.productCode;
      const quantity = item.Quantity;
      const existingEntry = uniqueEntries.find(entry => entry.productCode === productCode);  
      if (existingEntry) {
        existingEntry.Quantity += quantity || 0;
      } else {
        const uniqueEntry = {
          productCode,
          Thumbnail: item.Thumbnail,
          Name: item.Name,
          Price: item.Price,
          Size: item.Size,
          Color: item.Color,
          Quantity: quantity || 0,
        };
  
        uniqueEntries.push(uniqueEntry);
      }
      const currentSum = sumMap.get(productCode) || 0;
      sumMap.set(productCode, currentSum + (quantity || 0));
    });
  
    return uniqueEntries;
  }
  const updateQuant = (e:any) =>{
    const id = e.target.getAttribute("aria-current");
    const Element = (document.getElementById('CurQuant'+id) as HTMLInputElement)
    const currValue:any = Element.value;

    if(currValue===1) return

    const Price:any = e.target.getAttribute("aria-label");


    const Subtotal:any = formatter.format(currValue * Price);
    
    document.getElementById("Subtotal"+id).innerHTML = Subtotal;

    let grandTotal = 0;

    for (let index = 0; index < filtered_data.length; index++) {
      let QTY: number = parseFloat((document.getElementById('CurQuant' + index) as HTMLInputElement).value);
      let Price: number = parseFloat((document.getElementById('CurQuant' + index)).getAttribute("aria-valuenow"));
      let Total = QTY * Price;
      
      grandTotal += Total;
    }
    setGrandTotal(grandTotal);
    console.log("Grand Total: ", grandTotal);
    
  }

const filtered_data = filterAndSumQuantity(extracted());

let sumAmount = 0;
console.log(filtered_data)
const Cart = (prodCode:any,number:any,e:any) => {
  if(number > 0){
    const id = e.target.getAttribute("aria-current");
    const Element = (document.getElementById('CurQuant'+id) as HTMLInputElement)
    const currValue:any = Element.value;
    Element.value = parseInt(currValue) + number;
    return filtered_data.filter((item:any)=>item.productCode===prodCode).map((item: any) => ({
      "productCode":item.productCode,
      "Thumbnail":item.thumbnail,
      "Name": item.name,
      "Price": item.price,
      "Size": item.size,
      "Color": item.color,
      "Quantity": number 
    }));
  }
};


  return (
    <div className='body'>
        <div className='dropdown openDrawer'>
          <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
        </div>
        <div className='LeftWing'>
            <Menu/>
        </div>
        <div className='middlecontainer'>
            <div>
              {/* <ThreeJS/> */}
            </div>
            <div className='carousel'>
              <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /> Cart</div>
              <div className='CartCols'>
                  <div className='CartColsHead'>Image</div>
                  <div className='CartColsHead'>Details</div>
                  <div className='CartColsHead'>Quantity</div>
                  <div className='CartColsHead'>Sub Total</div>
                  <div className='CartColsHead'>Action</div>
              </div>  
              {filtered_data.map((item:any, innerIdx:any) => (
                
                <div key={innerIdx} className='CartCols'>
                  <div className='CartImage'>
                    <Image className="CartImageImage" src={item.Thumbnail === "" || item.Thumbnail === null ? path + "image/Legitem-svg.svg" : path + item.Thumbnail} height='150' width='200' alt={innerIdx}></Image>
                  </div>
                  <div className='CartDetails'>
                    <span>Name: {item.Name}</span>
                    <span>Size: {item.Size}</span>
                    <span>Color: {item.Color}</span>
                    <span>Price: {formatter.format(item.Price)}</span>
                  </div>
                  <div className='CartDetails CartDetailsCenter'>
                    <div className='ShareQuantity'>
                          <button aria-current={innerIdx} aria-label={item.Price} onClick={(e:any)=>{handleAddToCart(Cart(item.productCode,1,e));updateQuant(e);}}>+</button>
                          <input type='text' id={"CurQuant"+innerIdx} defaultValue={item.Quantity} aria-valuenow={item.Price}/>
                          <button aria-current={innerIdx} aria-label={item.Price} onClick={(e:any)=>{handleAddToCart(Cart(item.productCode,-1,e));updateQuant(e);}}>-</button>
                    </div>
                  </div>
                  <div className='CartDetails CartDetailsCenter'>
                    <div className='CartDetailsCenter' id={"Subtotal"+innerIdx}>
                      {formatter.format(item.Price * item.Quantity)}              
                    </div>
                  </div>
                  <div className='CartDetails CartDetailsCenter' >
                    <input type='hidden' value={(sumAmount +=(item.Price * item.Quantity))}></input>
                    <Icon icon="clarity:trash-solid" aria-label={item.productCode} className='removeTocart'/>
                  </div>
                </div>
    ))}

          <div className='CartColsHeadSutotalInMB'>
                  <div className=''></div>
                  <div className=''></div>
                  <div className=''></div>
                  <div className='CartColsHeadSutotal'><span>Sub Total :</span><span id='TotalAmount'>{useGrandTotal===0?formatter.format(sumAmount):formatter.format(useGrandTotal)}</span>
                                                <span>VAT :</span><span>{formatter.format((sumAmount / 100)*10)}</span>
                                                <span>Shipping Fee :</span><span>{formatter.format(10)}</span>                                                
                                                <span>Total Amount :</span><span>{formatter.format(sumAmount)}</span>
                                                <span></span><span><Link href='/Cart/Checkout/'>Checkout</Link></span>


                  </div>
          </div> 
            </div>
        </div>
        <div className='RightWing'></div>
    </div>
  )
}

export default CartBody