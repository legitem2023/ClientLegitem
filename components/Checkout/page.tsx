'use client'
import { useMutation, useQuery } from '@apollo/client';
import { Icon } from '@iconify/react';
import AccordionCheckout from 'components/AccordionCheckout/AccordionCheckout';
import { cookies } from 'components/cookies/cookie';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import { GET_ACCOUNT_DETAILS_ID } from 'graphql/queries';
import { INSERT_ORDER } from 'graphql/mutation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { filterAndSumQuantity } from 'utils/scripts';
import { setGlobalState, useGlobalState } from 'state';

const CheckoutData = () => {
  const [useCookie, setCookie] = useState();
  const [useEmail,setEmail] = useState();
  const [checkoutAddress] = useGlobalState("checkoutAddress");
  const [checkoutContact] = useGlobalState("checkoutContact");
  const [Storage,setStorage] = useState(null);

  const [insert_order] = useMutation(INSERT_ORDER, {
    onCompleted: data => console.log(data)
  });

  const { data: AccountDetails, loading: AccountLoading, error } = useQuery(GET_ACCOUNT_DETAILS_ID, { 
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
  setGlobalState("checkoutAddress",AccountDetails?.getAccountDetails_id[0].Address);
  setGlobalState("checkoutContact",AccountDetails?.getAccountDetails_id[0].contactNo);
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

  const filter = filterAndSumQuantity(extracted());
  
  if (AccountLoading) return <Loading/>;
  if (error) return null;

  const HandleSubmit = (e:any) => {

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
        })),
      },
    });
    e.target.enabled = false
  };
  

  return (
    <div className='body'>
    <div className='LeftWing'>

    </div>
    <div className='middlecontainer'>
    <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /> Select Address</div>
    <div>
      {AccountDetails && <AccordionCheckout address={AccountDetails.getAccountDetails_id} />}
    </div>
     <button onClick={HandleSubmit}>Place Order</button>
    </div>
    <div className='RightWing'></div>
</div>

  );
}

export default CheckoutData;
