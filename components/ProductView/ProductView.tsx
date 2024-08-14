'use client'
import React, { useState, useContext, Suspense, useEffect } from 'react'
import Share from 'components/Share/Share';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useRouter } from 'next/navigation'
import Loading from 'components/LoadingAnimation/Loading';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import ProductTabs from './ProductTabs';
import {  GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import { formatter } from 'utils/scripts';
import RelatedProducts from './RelatedProducts';
const path = process.env.NEXT_PUBLIC_PATH

const Manager = new DataManager();

const ProductView = () => {
  const router = useRouter()
  const [searchParameter,setSearchParameter] = useState([]);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = JSON.parse(params.get('data'));
    setSearchParameter(dataParam);
  }, []);
  const viewedProd = Array.isArray(searchParameter) ? searchParameter : [searchParameter];
  
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const [take, settake] = useState(10);
  const [quantity, setquantity] = useState(1);

  const { data: Products, loading } = useQuery(GET_RELATED_PRODUCTS);
  if (loading) return;

  const Cart = () => {
    Manager.Success("Added to cart!");
    return viewedProd.map((item: any) => ({
      "productCode": item.productCode,
      "Thumbnail": item.thumbnail,
      "Name": item.name,
      "Price": item.price,
      "Size": item.size,
      "Color": item.color,
      "Model": item.model,
      "Quantity": quantity  // Assuming there's a quantity property in your item object
    }));
  };
 
  return (
    <Suspense fallback={<Loading />}>
      {viewedProd.length > 0 ?viewedProd.map((viewItem: any, idx: any) =>(
        <div className='MainView' key={idx}>
        <div className='MainView_Lchild'>
          <div className='LabelHead'>Product Data</div>
          <div className='LabelBack' onClick={() => router.push(path + `Products`)}>
            <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
          </div>
          <div className='MainView_LchildGallery'>
            <ProductTabs data={viewedProd}/>
            <div className='MainView_LchildGalleryDetails'>
              <div className='MainView_LchildGalleryDetails_labels'><span>Name:</span><span>{viewItem.name}</span></div>
              <div className='MainView_LchildGalleryDetails_labels'><span>Price :</span><span>{formatter.format(viewItem.price)}</span></div>
              <div className='MainView_LchildGalleryDetails_labels'><span>Size :</span><span>{viewItem.size}</span></div>
              <div className='MainView_LchildGalleryDetails_labels'><span>Color :</span><span>{viewItem.color}</span></div>
              <div>Available Size </div>
              <div>Available Colors of Size:</div>
              <div>Quantity :</div>
              <div className='ShareQuantity'>
                <button onClick={() => setquantity(quantity + 1)}>+</button>
                <input type='text' value={quantity} onChange={() => setquantity(quantity)} />
                <button onClick={() => setquantity(quantity - 1)}>-</button>
              </div>
              <div>
                <button onClick={() => handleAddToCart(Cart())} className='addCart'><Icon icon="mdi:cart" /> Add to Cart</button>
              </div>
              <div className='ShareContainer'>
                <Share></Share>
              </div>
              <div></div>
            </div>
          </div>
          <div className='LabelHead'>Store Details</div>
          <div className='longtext'>
  
          </div>
          <div className='LabelHead'>Product Details</div>
          <div className='longtext'>

          </div>
          <div className='LabelHead'>Product Review</div>
          <div className='longtext'>
          </div>
        </div>
        <div className='MainView_Rchild'>
          <div className='LabelHead'>Related Product</div>
          <div className='MainView_RelatedProducts'>
            {loading ? <Loading /> : <RelatedProducts data={Products?.getRelatedProduct.slice(0, take)}></RelatedProducts>}
            <div className='viewmore'>
              {loading ? (
                <button onClick={() => settake(take + 5)}>
                  Load More
                  <Icon icon='eos-icons:bubble-loading' />
                </button>) : (
                <button onClick={() => settake(take + 5)}>
                  Load More
                </button>
              )}
            </div>
          </div>
  
        </div>
        <div className='popNotification' id="popNotification">Item Successfuly Added!</div>
      </div>
      )):""}
    </Suspense>
    
  )
}

export default ProductView