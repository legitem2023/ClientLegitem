'use client'
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import AccordionCheckout from 'components/AccordionCheckout/AccordionCheckout';
import { cookies } from 'components/cookies/cookie';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import { INSERT_ORDER } from 'graphql/mutation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { filterAndSumQuantity } from 'utils/scripts';
import { setGlobalState, useGlobalState } from 'state';
import DataManager from 'utils/DataManager';

const CheckoutData = () => {
  const Manager = new DataManager();
  const [useCookie, setCookie] = useState();
  const [useEmail,setEmail] = useState();
  const [checkoutAddress] = useGlobalState("checkoutAddress");
  const [checkoutContact] = useGlobalState("checkoutContact");
  const [Storage,setStorage] = useState(null);
  const loading = useRef<HTMLButtonElement>();

  const [loadingState,setLoading] = useState(false)


  const [insert_order] = useMutation(INSERT_ORDER, {
    onError: data => {console.log(data)},
    onCompleted: data => {
      console.log(data.insertOrder.statusText);
      if(data.insertOrder.statusText==='Success'){
        Manager.Success("Order Successfull");
        localStorage.removeItem('cartItems');
        router.push('./Order');
      }    
    }
  });

  const { data: AccountDetails, loading: AccountLoading, error:AccountError,refetch:AccountRefetch } = useQuery(GET_ACCOUNT_DETAILS_ID, { 
    variables: { getAccountDetailsIdId: useCookie },
    skip: !useCookie // Skip the query if useCookie is not yet set
  });

  const router = useRouter();
  useEffect(()=>{
    setStorage(localStorage.getItem("cartItems"))
    const cookie = cookies();
    if (!cookie) {
      router.push('/Login');  
      return;
    }
  const id:any = cookie.id;
  const email:any = cookie.email;
  setCookie(id);
  setEmail(email);
  const filter = AccountDetails?.getAccountDetails_id?.filter((item:any) =>item.defaultAddress === true);
  
  if(!filter) return 
  setGlobalState("checkoutAddress",filter[0].Address);
  setGlobalState("checkoutContact",filter[0].contactNo);
  },[AccountDetails])

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

  const filter = filterAndSumQuantity(extracted());
  
  if (AccountLoading) return <Loading/>;
  if (AccountError) return null;
  
  const HandleSubmit = (e:any) => {
    e.preventDefault();
    const conf = confirm(`The Shipping Address you selected is \n\n Address:${checkoutAddress} \n\n Are you sure you want to place your order in this address?`);
    if(conf){
      setLoading(true);
      insert_order({
        variables: {
          orderHistoryInput: filter.map((item: any) => ({
            Address: checkoutAddress,
            Contact: checkoutContact,
            Price: parseFloat(item.Price),
            Quantity: item.Quantity,
            emailAddress: useEmail,
            productCode: item.productCode,
            Size: item.Size,
            Image: item.Thumbnail,
            Color: item.Color,
            agentEmail:item.agentEmail,
            paymentMethod:"COD"
          })),  
        },
      });
    }
  };
  return (
    <div className='body'>
    <div className='LeftWing'>

    </div>
    <div className='middlecontainer'>
    <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-payment" /> Select Payment Method</div>

    <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /> Select Address</div>
    <div>
      {AccountDetails && <AccordionCheckout address={AccountDetails.getAccountDetails_id} refetch={AccountRefetch}/>}
    </div>
    <div className='SelectedAddress'>
      Shipping Address: {checkoutAddress}
    </div>

    <div className='CheckOutButton_container'>
      <button className="PlaceLink" disabled={loadingState} onClick={(e: any) => HandleSubmit(e)}>
        {loadingState ? (
          <>
            <Icon icon="mdi:place" /> Sending <Icon icon="eos-icons:loading" />
          </>
        ) : (
          <>
            <Icon icon="mdi:place" /> Place Order
          </>
        )}
      </button>
    </div>

    </div>
    <div className='RightWing'></div>
</div>

  );
}

export default CheckoutData;
