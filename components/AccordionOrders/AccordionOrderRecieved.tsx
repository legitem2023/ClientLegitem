import Image from 'next/image';
import React from 'react';
import { useState } from 'react';
import { formatter } from 'utils/scripts';

const AccordionOrderRecieved = ({json}) => {
    const path = process.env.NEXT_PUBLIC_PATH || '';
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index:any) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Collapse if clicked again
        } else {
            setActiveIndex(index); // Expand clicked item
        }
    };
    return (
        <div className="faq-accordion">
            {json.map((odr:any, index:number) => (
                <div className="faq-item" key={index}>
                    <div className="faq-question" onClick={() => toggleAccordion(index)}>
                        {odr.TrackingNo}
                        <span className={`arrow ${activeIndex === index ? 'open' : ''}`}>&#9660;</span>
                    </div>

                    {activeIndex === index && (
                        <div className="faq-answer">
                            <div>{odr.StatusText}</div>
                            <br></br>
                            <div className='ClientOrderTable hiddenInmobile'>
                                <div>Image</div>
                                <div>Product Code</div>
                                <div>Size</div>
                                <div>Color</div>
                                <div>Price</div>
                                <div>Quantity</div>
                                <div>Subtotal</div>
                            </div>
                            {odr.OrderHistory.map((item:any,idx:number)=>(
                                <div key={idx} className='ClientOrderTable'>
                                    <div>
                                    <Image
                                        src={item.Image ? `${imgPath}${item.Image}` : `https://hokei-storage.s3.ap-northeast-1.amazonaws.com/images/Legit/IconImages/Legitem-svg.svg`}
                                        height='50'
                                        width='80'
                                        quality={1}
                                        alt={item.id}
                                        priority
                                    />
                                    </div>
                                    <div>{item.productCode}</div>
                                    <div>{item.Size}</div>
                                    <div>{item.Color}</div>
                                    <div>{formatter.format(item.Price)}</div>
                                    <div>{item.Quantity}</div>
                                    <div>{formatter.format(item.Quantity * item.Price)}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AccordionOrderRecieved;
