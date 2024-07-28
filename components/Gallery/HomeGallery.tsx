'use client'
import React, { useMemo } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from 'next/link';
import { useGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import  { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const settings_B = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    }
  ]
}




  return (
    <div>
      <div className="slider-container">
      <Slider {...settings_B}>
        {images.map((item, i) => (
          <div className='slick-thumb-parent' key={i}>
              <Image key={i} src={item.original} alt={"alt" + i} width='200' height='100' />
              {item.title}
          </div>
          ))}
      </Slider>
      </div>
    </div>
  );
}

