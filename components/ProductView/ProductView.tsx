'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Gallery } from 'components/Gallery/Gallery';
import Share from 'components/Share/Share';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Loading from 'components/LoadingAnimation/Loading';
import { setGlobalState, useGlobalState } from 'state';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import ProductTabs from './ProductTabs';
import { GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useQuery } from '@apollo/client';
const path = process.env.NEXT_PUBLIC_PATH
const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

const Manager = new DataManager();

const ProductView = () => {
  const router = useRouter()
  const { handleAddToCart } = useContext(ShoppingCartContext);

  /************ Related Product ************/
  useEffect(() => {
    const windata = typeof window !== undefined ? window.location.search : "";
    const urlParams = new URLSearchParams(windata);
    const id: any = parseInt(urlParams.get('id'));
    setGlobalState("urlData", id);
  }, [])


  const [take, settake] = useState(10);
  const [quantity, setquantity] = useState(1);
  const [useUrl]: any = useGlobalState("urlData");
  const [useIPaddress, setIPaddress] = useState(null);
  const { data: Products, loading, error } = useQuery(GET_RELATED_PRODUCTS);//Manager.productRelated();
  /************ Viewed Product ************/

  const { ViewedProducts, Viewedloading, Viewederror } = Manager.viewedProduct(useUrl);
  const { NumberOFViews, LoadingNumberOFViews } = Manager.NumberOfViews();

  const insertviewcount = Manager.InsertViews();
  // const {Location_Data,LocationDataLoading,LocationDataError} =  Manager.LocationData(useIPaddress);
  // if(LocationDataLoading) return
  if (LoadingNumberOFViews) return
  if (Viewedloading) return
  if (!ViewedProducts) return;
  /************ Viewed Product ************/
  if (loading) return;
  if (error) return;
  /************ Related Product ************/

  let viewedData = ViewedProducts.getToviewProduct
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'PHP',
  });

  console.log(viewedData[0].model);
  if (viewedData[0].model === "" || viewedData[0].model === null) {
    setGlobalState("activeModel", 'http://192.168.100.86:3000/models/NoModel.glb');
  } else {
    setGlobalState("activeModel", viewedData[0].model);
  }

  const Cart = () => {
    Manager.Success("Added to cart!");
    return viewedData.map((item: any) => ({
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
    <div className='MainView'>
      <div className='MainView_Lchild'>
        <div className='LabelHead'>Product Data</div>
        <div className='LabelBack' onClick={() => router.push(path + `Products`)}>
          <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
        </div>
        <div className='MainView_LchildGallery'>
          <ProductTabs />
          <div className='MainView_LchildGalleryDetails'>
            <div className='MainView_LchildGalleryDetails_labels'><span>Name:</span><span>{viewedData[0].name}</span></div>
            <div className='MainView_LchildGalleryDetails_labels'><span>Price :</span><span>{formatter.format(viewedData[0].price)}</span></div>
            <div className='MainView_LchildGalleryDetails_labels'><span>Size :</span><span>{viewedData[0].size}</span></div>
            <div className='MainView_LchildGalleryDetails_labels'><span>Color :</span><span>{viewedData[0].color}</span></div>
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
            <div className='ShareContainer'><Share></Share></div>
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
          {loading ? <Loading /> : Products.getRelatedProduct.slice(0, take).map((item: any, idx: any) => (
            <div key={idx} className='MainView_RelatedProductsThumbs'>
              <Image
                src={item.thumbnail === '' || item.thumbnail === null ? imgPath + 'Product-2024-0-5-22-47034.webp' : imgPath + item.thumbnail}

                height='200' width='200' alt={idx} onClick={() => { router.push(path + `ProductView/?id=` + item.id); setGlobalState("urlData", item.id); setGlobalState("activeModel", item.model); console.log("--->" + item.model) }}></Image>
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
                <div className='Rates'>
                  <Image src={path + "/image/Fivestarss-svg.svg"} width="100" height="100" alt={idx} priority={true} />
                  <div className='Rates_values'>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                    <span>0</span>
                  </div>
                  <div className='ViewsLikes'>
                    <span>Views :</span>
                    <span>{NumberOFViews.getNumberOfViews.filter((numbitem: any) => { return numbitem.productCode === viewedData[0].productCode }).length}</span>
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
  )
}

export default ProductView