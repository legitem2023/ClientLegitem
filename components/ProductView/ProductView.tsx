'use client'
import React, { useState, useContext, Suspense } from 'react';
import Share from 'components/Partial/Share/Share';
import { Icon } from '@iconify/react';
import DataManager from 'utils/DataManager';
import { useRouter,useParams } from 'next/navigation';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { ShoppingCartContext } from 'components/context/ShoppingCartProvider';
import ProductTabs from './ProductTabs';
import { GET_RELATED_PRODUCTS,GET_VIEW_PRODUCT } from 'graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Cart, formatter, maskEmail } from 'utils/scripts';
import RelatedProducts from './RelatedProducts';
import HtmlRenderer from 'components/Html/HtmlRenderer';
import InsertView from './InsertView';
import { useGlobalState } from 'state';
import { INSERT_VIEWS_COUNT } from 'graphql/mutation';
import RelatedColor from './RelatedColor';
import RelatedSize from './RelatedSize';
import Ratings from 'components/Partial/Ratings/Ratings';
import LikeCmd from 'components/Commands/LikeCmd';
import AddCartCmd from 'components/Commands/AddCartCmd';
import AddCartCmdView from 'components/Commands/AddCartCmdView';
import LinkStoreCmd from 'components/Commands/LinkStoreCmd';
import Element from 'components/UI/Element';

const path = process.env.NEXT_PUBLIC_PATH;
const Manager = new DataManager();

const ProductView: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  // const { handleAddToCart } = useContext(ShoppingCartContext);
  const { data: Products, loading, error } = useQuery(GET_RELATED_PRODUCTS);
  const param:any = useParams();

  const {data:ViewProduct,loading:ViewProductLoading,error:ViewProductError} = useQuery(GET_VIEW_PRODUCT,{
    variables:{
      "getToviewProductId": param.id
    }
  })
  
  const [userEmail] = useGlobalState("cookieEmailAddress");

  const [insertNumberOfViews] = useMutation(INSERT_VIEWS_COUNT, {
    onCompleted: (data) => {
      return;
    },
    onError: (error) => {
      console.error("Error inserting view:", error);
    }
  });

  if (loading) return <Loading />;
  if (error) return <h1>Connection Error</h1>;
  if(ViewProductLoading) return <Loading />;
  if(ViewProductError) return
  return (
    <Suspense fallback={<Loading />}>
      {ViewProduct?.getToviewProduct.length > 0 ? 
        ViewProduct?.getToviewProduct.map((viewItem: any, idx: any) => (
        <div className='MainView' key={idx}>
          <div className='MainView_Lchild'>
            <div className='LabelHead'>Product Data</div>
            <InsertView insertNumberOfViews={insertNumberOfViews} userEmail={userEmail} ViewProduct={ViewProduct?.getToviewProduct[0]} />
            <div className='LabelBack' onClick={() => router.push(path + `Products`)}>
              <Icon icon="ic:sharp-double-arrow" rotate={2} className='backIcon' /> Back
            </div>
            <div className='MainView_LchildGallery'>
              <ProductTabs data={ViewProduct?.getToviewProduct} />
              <div className='MainView_LchildGalleryDetails'>

                <Element Label="Name" value={viewItem.name} />
                <Element Label="Price" value={formatter.format(viewItem.price)} />

                <div>Available Size :<RelatedSize styleCode={viewItem.style_Code}/></div>
                <div>Available Colors of Size: <RelatedColor styleCode={viewItem.style_Code}/></div>
                {/* <div className='MainView_LchildGalleryDetails_labels'> */}
                  {/* <span>Available Stock :</span>
                  <span>{viewItem.stock}</span> */}
                  <Element Label="Available Stock" value={viewItem.stock} />
                <div>Quantity :</div>
                <div className='ShareQuantity'>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  <input type='text' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                  <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                </div>

   
                <div className='CommandContainer'>
                  <LinkStoreCmd emailAddress={viewItem.agentEmail}/>
                  <LikeCmd productCode={viewItem.productCode}/>
                <AddCartCmdView viewedProduct={ViewProduct?.getToviewProduct} quantity={quantity} />
                </div>
                <div className='ShareContainer'>
                  <Share />
                </div>
                {/* <div></div> */}
              </div>
            </div>
            <div className='LabelHead'>Product Details</div>
            <div className='longtext'>
              <HtmlRenderer htmlContent={viewItem?.productDescription} />
            </div>
            <div className='LabelHead'>Product Review</div>
            <div className='longtext'>
              {viewItem?.Ratings.length > 0 ? viewItem?.Ratings.map((item: any, idx: any) => (
                <div key={idx}>
                  <div>{maskEmail(item.By)}</div>
                  <div>{item.Comment}</div>
                  <div><Ratings data={item.Ratings > 0 ?item.Ratings:0} count={item}/>
                  </div>
                </div>     
              )):"No Review Found"}
            </div>
          </div>
              <RelatedProducts data={Products?.getRelatedProduct} />
        </div>
      )) : null}
    </Suspense>
  );
};

export default ProductView;
