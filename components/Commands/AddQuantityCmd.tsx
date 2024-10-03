import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import React, { useContext } from 'react'
import { formatter } from 'utils/scripts';

type PropsAddQuantityCmd = {
  item:any,
  innerIdx:Number,
  filtered_data:any,
  setGrandTotal:any}

const AddQuantityCmd:React.FC<PropsAddQuantityCmd> = ({item,innerIdx,filtered_data,setGrandTotal}) => {
  const { handleAddToCart } = useContext(ShoppingCartContext);

  const data = [{
    "item":item,
    "innerIdx":innerIdx,
    "filtered_data":filtered_data,
    "setGrandTotal":setGrandTotal
  }]

  console.log(data)
  const updateQuant = (e:any) =>{
    const id = e.target.getAttribute("data-current");
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
      let Total = QTY * (Price?Price:0);
      console.log("qty"+Price);
      grandTotal += Total;
    }
    setGrandTotal(grandTotal);
  }



  const Cart = (prodCode:any,number:number,e:any) => {
    const id = e.target.getAttribute("data-current");
    const Element:any = (document.getElementById('CurQuant'+id) as HTMLInputElement)
    const currValue:any = Element.value;
    Element.value = parseInt(currValue) + number;
    return filtered_data.filter(i => i.productCode === prodCode).map((item: any) => ({
      "productCode":item.productCode,
      "Thumbnail":item.thumbnail,
      "Name": item.name,
      "Price": item.price,
      "Size": item.size,
      "Color": item.color,
      "Quantity": number 
    }));
  };
  return (
    <div className='ShareQuantity'>
      <button data-current={innerIdx} 
              aria-label={item.Price} 
              onClick={(e:any)=>{handleAddToCart(Cart(item.productCode,1,e));updateQuant(e);}}>+
      </button>
      <input type='text' 
             id={"CurQuant"+innerIdx} 
             defaultValue={item.Quantity} 
             aria-valuenow={item.Price}/>
      <button data-current={innerIdx} 
              aria-label={item.Price} 
              onClick={(e:any)=>{
        handleAddToCart(Cart(item.productCode,(-1),e));
        updateQuant(e);}}>-
      </button>
  </div>
  )
}

export default AddQuantityCmd