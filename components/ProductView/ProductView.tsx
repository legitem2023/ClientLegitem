'use client'
import React, { useState, useContext, Suspense, useEffect } from 'react'
import Share from 'components/Share/Share';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState } from 'state';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import ProductTabs from './ProductTabs';
import {  GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
const path = process.env.NEXT_PUBLIC_PATH
const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

const Manager = new DataManager();

const ProductView = () => {
  const router = useRouter()
  const [searchParameter,setSearchParameter] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = JSON.parse(params.get('data'));
    setSearchParameter(dataParam);
  }, []);

  // const parameter:any = useSearchParams();
  const parsedData = searchParameter;//JSON.parse(parameter.get('data'));
  const viewedProd = Array.isArray(parsedData) ? parsedData : [parsedData];
  const { handleAddToCart } = useContext(ShoppingCartContext);
  /************ Related Product ************/
  const [take, settake] = useState(10);
  const [quantity, setquantity] = useState(1);

  const { data: Products, loading } = useQuery(GET_RELATED_PRODUCTS);
  if (loading) return;
  /************ Related Product ************/
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

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
            {loading ? <Loading /> : Products.getRelatedProduct?.slice(0, take).map((item: any, idx: any) => (
              <div key={idx} className='MainView_RelatedProductsThumbs'>
                <Image
                  src={item.thumbnail === '' || item.thumbnail === null ? imgPath + 'Product-2024-0-5-22-47034.webp' : imgPath + item.thumbnail}
                  height='200' width='200' alt={idx} onClick={() => { router.push(path + `Products/${item.id}?data=${encodeURIComponent(JSON.stringify(item))}`); setGlobalState("urlData", item.id); setGlobalState("activeModel", item.model); console.log("--->" + item.model) }}></Image>
                <div className='thumbnailTextContainer'>
                  <div>
                    <span>Price :</span><span>{formatter.format(item.price)}</span>
                  </div>
                  <div>
                    <span>Name :</span><span>{item.name}</span>
                  </div>
                  <div>
                    <span>Ratings :</span><span></span>
                  </div>
                  <div>
                    <span>Size :</span><span></span>
                  </div>
                  <div className='Rates'>
                    <div className='Rates_values'>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                    </div>
                    <div className='ViewsLikes'>
                      <span>Views :</span>
                      {/* <span>{useNumberOfviews.filter((numbitem: any) => { return numbitem.productCode === relatedProd[0].productCode }).length}</span> */}
                      <span>Likes :</span>
                      {/* <span>{NumberOFViews.getNumberOfViews.filter((numbitem:any)=>{return numbitem.productCode===items.productCode}).length}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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