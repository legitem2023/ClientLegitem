'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { Icon } from '@iconify/react';
export const HomeGallery:React.FC = () => {

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;

  if (imageLoading) return null;
  if (imageError) return null;

  return (
    <div className=''>
      <div className='LabelHead carouselLabel'><Icon icon="mdi:about" /><span>Products</span></div>
        <div id='Gallery'>
            <div>
              <div className="slider-container">
              <Swiper
              spaceBetween={50}
              slidesPerView={4}
              loop={true}
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                414: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                430: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                // when window width is >= 640px
                640: {
                  slidesPerView: 1,
                  spaceBetween: 50,
                },
                // when window width is >= 768px
                768: {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                // when window width is >= 1024px
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                1366: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                }
              }}
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
      </div>
    </div> 
  );
}

