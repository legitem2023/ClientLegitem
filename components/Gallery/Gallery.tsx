import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
export const Gallery = ({data}) => {
  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const urlData = data[0].id;
  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);
  if (imageLoading) return null;
  if (imageError) return null;
  return (
      <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}>
      {ImageData.getInv_subImage.filter((item:any)=>{ return item.subImageRelationChild===urlData}).map((item:any, i:any) => (
        <SwiperSlide key={i}>
            <Image key={i} src={imagepath+item.ImagePath} alt={"alt" + i} width='400' height='350' />
            {item.title}
        </SwiperSlide>
        ))}
    </Swiper>
  );
};
