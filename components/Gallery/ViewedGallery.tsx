import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { handleError, imageSourceGallery } from 'utils/scripts';
export const ViewedGallery = ({data}) => {
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  // console.log(data.length)
  return (
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}>
      {
      data.length > 0?
        data[0].subImageFieldOut.map((item:any, i:any) => (
        <SwiperSlide key={i}>
            <Image key={i} 
                   src={imageSourceGallery(item)} 
                   onError={handleError}
                   alt={"alt" + i} 
                   width='400' height='350' />
            {item.title}
        </SwiperSlide>
        ))
      :        <SwiperSlide>
      <Image  
             src={`${imgPath}`} 
             onError={handleError}
             alt={"alt" + 1} 
             width='400' height='350' />
      
  </SwiperSlide>
  }
    </Swiper>
  );
};
