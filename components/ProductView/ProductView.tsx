'use client'
import React, { useState, useContext, Suspense, useEffect } from 'react';
import Share from 'components/Partial/Share/Share';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useRouter } from 'next/navigation';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import ProductTabs from './ProductTabs';
import { GET_RELATED_PRODUCTS } from 'graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Cart, formatter, replaceOembedWithIframe } from 'utils/scripts';
import RelatedProducts from './RelatedProducts';
import Notification from 'components/Notification/Notification';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import { decode } from 'js-base64';
import InsertView from './useInsertView';
import { setGlobalState, useGlobalState } from 'state';
import useInsertView from './useInsertView';
import { INSERT_VIEWS_COUNT } from 'graphql/mutation';
import useProductView from './useProductView';

const path = process.env.NEXT_PUBLIC_PATH;
const Manager = new DataManager();

const ProductView: React.FC = () => {
  const [searchParameter, setSearchParameter] = useState<any[]>([]);
  const [take, setTake] = useState(10);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { handleAddToCart } = useContext(ShoppingCartContext);
  const { data: Products, loading, error } = useQuery(GET_RELATED_PRODUCTS);
  const [userEmail] = useGlobalState("cookieEmailAddress");

  const [insertNumberOfViews] = useMutation(INSERT_VIEWS_COUNT, {
    onCompleted: (data) => {
      console.log("View inserted:", data);
    },
    onError: (error) => {
      console.error("Error inserting view:", error);
    }
  });


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dataParam = JSON.parse(atob(params.get('data') || '[]'));
    setSearchParameter(dataParam);
    return () => {
      // Clean up any subscriptions or listeners here
    };
  }, []);



  const viewedProd = Array.isArray(searchParameter) ? searchParameter : [searchParameter];

  // const { insert_views_count } = useInsertView();
console.log(viewedProd)


  useEffect(() => {
    insertNumberOfViews({
      variables:{
        "count": "1",
        "productCode": viewedProd[0]?.productCode,
        "emailAddress": userEmail,
        "ipAddress": "ipaddresses",
        "country": "PH"
      }
    });
    return () => {
      // Clean up any subscriptions or listeners here
    }
  }, [viewedProd,userEmail]); // Re-run if 'data' changes
  if (loading) return <Loading />;
  if (error) return <h1>Connection Error</h1>;
  return (
    <Suspense fallback={<Loading />}>
      {viewedProd.length > 0 ? viewedProd.map((viewItem: any, idx: any) => (
        <div className='MainView' key={idx}>
          <div className='MainView_Lchild'>
            <div className='LabelHead'>Product Data</div>

            <div className='LabelBack' onClick={() => router.push(path + `Products`)}>
              <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
            </div>
            <div className='MainView_LchildGallery'>
              <ProductTabs data={viewedProd} />
              <div className='MainView_LchildGalleryDetails'>
                <div className='MainView_LchildGalleryDetails_labels'><span>Name:</span><span>{viewItem.name}</span></div>
                <div className='MainView_LchildGalleryDetails_labels'><span>Price :</span><span>{formatter.format(viewItem.price)}</span></div>
                <div className='MainView_LchildGalleryDetails_labels'><span>Size :</span><span>{viewItem.size}</span></div>
                <div className='MainView_LchildGalleryDetails_labels'><span>Color :</span><span>{viewItem.color}</span></div>
                <div>Available Size</div>
                <div>Available Colors of Size:</div>
                <div>Quantity :</div>
                <div className='ShareQuantity'>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  <input type='text' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                </div>
                <div>
                  <button onClick={() => handleAddToCart(Cart(viewedProd, Manager, quantity))} className='addCart universalButtonStyle'>
                    <Icon icon="mdi:cart" /> Add to Cart
                  </button>
                </div>
                <div className='ShareContainer'>
                  <Share />
                </div>
                <div></div>
              </div>
            </div>
            <div className='LabelHead'>Product Details</div>
            <div className='longtext'>
              <HtmlRenderer htmlContent={decode(viewItem.productDescription)} />
              
              {/* <embed url="https://youtu.be/6waK6TYDGOA"></embed> */}
            </div>
            <div className='LabelHead'>Product Review</div>
            <div className='longtext'>
              {/* Product review content */}
            </div>
          </div>
          <div className='MainView_Rchild'>
            <div className='LabelHead'>Related Product</div>
            <div className='MainView_RelatedProducts'>
              {loading ? <Loading /> : <RelatedProducts data={Products?.getRelatedProduct.slice(0, take)} />}
              <div>
                <button onClick={() => setTake(take + 5)} className='universalButtonStyle'>
                  {loading?<Icon icon='eos-icons:bubble-loading' />:"Load More"}
                </button>
              </div>
            </div>
          </div>
          <div className='popNotification' id="popNotification">Item Successfully Added!</div>
        </div>
      )) : null}
    </Suspense>
  );
};

export default ProductView;
