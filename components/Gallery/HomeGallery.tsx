'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
export const HomeGallery = () => {

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  if (imageLoading) return null;
  if (imageError) return null;

  return (
    <div>
      <div className="slider-container">
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {ImageData.getInv_subImage.map((item:any, i:any) => (
        <SwiperSlide key={i}>
            <Image key={i} src={imagepath+item.ImagePath} alt={"alt" + i} width='200' height='150' />
            {item.title}
        </SwiperSlide>
        ))}
    </Swiper>
      </div>
    </div>
  );
}

