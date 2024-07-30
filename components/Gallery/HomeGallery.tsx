'use client'
import React, { useMemo } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from 'next/link';
import { useGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import  { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// core version + navigation, pagination modules:
import { Navigation, Pagination } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
export const HomeGallery = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1:any = useRef(null);
  let sliderRef2:any = useRef(null);
  
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  
  const path = process.env.NEXT_PUBLIC_PATH;
  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const [urlData] = useGlobalState('urlData');

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const position = 'bottom';

  const filteredImageData = useMemo(() => {
    if (urlData) {
      return ImageData?.getInv_subImage;
    }
    return ImageData?.getInv_subImage;
  }, [ImageData, urlData]);

  const images = useMemo(() => {
    return filteredImageData?.map((item:any, idx:any) => ({
      original: item.ImagePath ? `${imagepath}${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      thumbnail: item.ImagePath ? `${imagepath}${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      description: <Link href={`${path}Products/?Store=${item.id}`}>{item.Name}</Link>,
      alt: `Image ${idx + 1}`,
      title: item.Name,
      ariaLabel: `Image ${idx + 1}`,
      isVideo: true
    })) || [];
  }, [filteredImageData, imagepath, path]);

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
      {images.map((item:any, i:any) => (
        <SwiperSlide key={i}>
            <Image key={i} src={item.original} alt={"alt" + i} width='200' height='150' />
            {item.title}
        </SwiperSlide>
        ))}
    </Swiper>
      </div>
    </div>
  );
}

