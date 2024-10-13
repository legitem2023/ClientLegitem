import UniversalPagination from 'components/Partial/Pagination/UniversalPagination';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { setGlobalState, useGlobalState } from 'state';
import { formatter, imageSourceOrder } from 'utils/scripts';
import AccordionClientOrderHeader from './AccordionClientOrderHeader';
import Rate from 'components/Partial/Rate/Rate';
import { INSERT_FEEDBACK,UPDATE_ORDER_STATUS_FEEDBACK } from 'graphql/mutation';
import { useMutation } from '@apollo/client';
import DataManager from 'utils/DataManager';
const AccordionOrderDelivered = ({json,refetchdelivered}) => {
    const path = process.env.NEXT_PUBLIC_PATH || '';
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    const [activeIndex, setActiveIndex] = useState(null);
    const [cookieEmailAddress]: any = useGlobalState("cookieEmailAddress");
    const [tempAttachement,setTempAttachment] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%231b470a' d='M5 20h14v-2H5zm0-10h4v6h6v-6h4l-7-7z'/%3E%3C/svg%3E")
    const Manager = new DataManager();
    const [useFeedBack,setFeedBack] = useState({
        "Attachment": "",
        "By": cookieEmailAddress,
        "Comment": null,
        "Ratings": 0,
        "OrderNo": null,
        "productCode": null
})

    const [CurrentPage] = useGlobalState('CurrentPage');
    const [updateFeedBackStatus] = useMutation(UPDATE_ORDER_STATUS_FEEDBACK,{
        onCompleted:(data) => {
            if(data.updateProductFeedBackStatus.statusText === "Successful!"){
                refetchdelivered();
            }
        }
    })

    const [insertFeedBack] = useMutation(INSERT_FEEDBACK,{
        onCompleted:(data) => {
            if(data.insertProductFeedBacks.statusText === "Thanks for yor feedback!"){
                Manager.Success(data.insertProductFeedBacks.statusText)
            }
        }
    })
    const toggleAccordion = (index:any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };
    const itemsPerPage = 10;

    const paginatedProducts = json.slice(
        (CurrentPage - 1) * itemsPerPage,
        CurrentPage * itemsPerPage);
  
    const totalPages = useMemo(() => {
      const itemsPerPage = 10;
      return Math.ceil((json?.length || 0) / itemsPerPage);
    }, [json]);
  
    const handlePageChange = (page: number) => {
      setGlobalState('CurrentPage', page);
    };
    const handleFeedBack = (e:any,items: any) => {
        e.preventDefault();
        // Assuming useFeedBack is a hook or global state
        const { By, Comment, Ratings,Attachment } = useFeedBack;
        if(Comment===null) return Manager.Warning("Input Comment!");
        if(Ratings===0) return Manager.Warning("Rate the Order!");
        const filter = items.OrderHistory;
            insertFeedBack({
                variables: {
                    productFeedBacksInput: filter.map((item)=>({
                        Attachment: Attachment || null,  // Change as necessary if you have an attachment
                        By: By || null,    // Set to null if By is not available
                        Comment: Comment || null,  // Set to null if Comment is not available
                        Ratings: Ratings !== undefined ? Ratings : null, // Convert Ratings to string or set to null
                        OrderNo: items.OrderNo || null,  // Set to null if TrackingNo is not available
                        productCode: item.productCode || null  // Set to null if productCode is not available
                    }))
                }
            })
            //#####################################################################
            updateFeedBackStatus({
                variables: {
                    "productFeedBacksStatusParameter": filter.map((item:any)=>({
                        OrderNo: items.OrderNo || null,  // Set to null if TrackingNo is not available
                        agentEmail: item.agentEmail || null,  // Set to null if agentEmail is not available
                    }))
                  }
              })
            //#####################################################################
     
    }

const handleAttachement = (e) =>{
    const value = e.target.files[0];
    const name = e.target.name;
    if (value) {
        const reader:any = new FileReader();
        // Convert file to base64 string when read
        reader.onloadend = () => {
            setFeedBack((prev)=>({...prev,[name]:reader.result}));
            setTempAttachment(reader.result);
        };
        // Read the file as a data URL (base64)
        reader.readAsDataURL(value);
      }
}
console.log(useFeedBack)
    return (
        <div className="faq-accordion">
            {paginatedProducts.map((odr:any, index:number) => (
                <div className="faq-item" key={index}>
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                    OrderNo No :{odr.OrderNo}
                    <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                    </div>

                    {activeIndex === index && (
                        <div className="faq-answer">
                            <div className='orderName'>{odr.StatusText}</div>
                            <div>Shipping Address :{odr.Address}</div>
                            <div>Contact No :{odr.Contact}</div>
                            <AccordionClientOrderHeader/>
                            {odr.OrderHistory.map((item:any,idx:number)=>(
                                
                                <div key={idx} className='ClientOrderTable'>
                                <div>
                                <Image
                                    src={imageSourceOrder(item)}
                                    height='50'
                                    width='80'
                                    quality={1}
                                    alt={item.id}
                                    priority
                                />
                                </div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Code :</span>{item.productCode}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Size :</span>{item.Size}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Color:</span>{item.Color}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Price:</span>{formatter.format(item.Price)}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product Quantity:</span>{item.Quantity}</div>
                                <div className='grid-in-mobile'><span className='hideInLandscape'>Product SubTotal:</span>{formatter.format(item.Quantity * item.Price)}</div>
                            </div>
                            ))}
                            <div className='orderName'>FeedBack</div>
                            <form onSubmit={(e:any)=>handleFeedBack(e,odr)}className='feedbackContainer'>
                                <Rate feedBack={setFeedBack} />
                                <img src={tempAttachement} height={200} width={200}/>
                                <input type="file" 
                                       name='Attachment' 
                                       onChange={(e)=>handleAttachement(e)}>
                                </input>
                                <textarea className='feedback'
                                          name="Comment"
                                          onChange={(e)=>setFeedBack((prev)=>(
                                            {...prev,[e.target.name]:e.target.value}))}
                                          placeholder='Please Rate and give use your feedback'></textarea>
                                <button type='submit' className='universalButtonStyle'>Submit</button>
                            </form>
                        </div>
                    )}
                </div>
            ))}
                    <UniversalPagination
          currentPage={CurrentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        </div>
    );
};

export default AccordionOrderDelivered;
