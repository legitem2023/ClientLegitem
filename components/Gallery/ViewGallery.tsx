'use client'
import React, { useMemo } from 'react';
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";


import LightGallery from 'lightgallery/react';

// Plugins
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import lgShare from 'lightgallery/plugins/share';
import lgHash from 'lightgallery/plugins/hash';
import Masonry from 'masonry-layout';
import Link from 'next/link';
import { useGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';
import  { useState, useEffect, useRef } from "react";
import imagesLoaded from 'imagesloaded';
import { handleError } from 'utils/scripts';

export const ViewGallery:React.FC = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1:any = useRef(null);
  let sliderRef2:any = useRef(null);
  
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);
  
  useEffect(() => {
    // Ensure the DOM element exists
    const container = document.querySelector('.masonry-gallery-demo');
    if (container) {
      // Initialize Masonry
      const msnry = new Masonry(container, {
        itemSelector: '.gallery-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });

      // Use imagesLoaded with Masonry
      imagesLoaded(container).on('progress', function () {
        // Layout Masonry after each image loads
        msnry.layout();
      });
    }
  }, []);


  const path = process.env.NEXT_PUBLIC_PATH;
  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const [urlData] = useGlobalState('urlData');

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const position = 'bottom';

  const filteredImageData = useMemo(() => {
    if (urlData) {
      return ImageData?.getInv_subImage.filter((item) => item.subImageRelationChild === urlData);
    }
    return ImageData?.getInv_subImage;
  }, [ImageData, urlData]);


  const images = useMemo(() => {
    return filteredImageData?.map((item:any, idx:any) => ({
      original: item.ImagePath ? `${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      thumbnail: item.ImagePath ? `${item.ImagePath}` : `${path}image/Legitem-svg.svg`,
      description: <Link href={`${path}Products/?Store=${item.id}`}>{item.Name}</Link>,
      alt: `Image ${idx + 1}`,
      title: item.Name,
      ariaLabel: `Image ${idx + 1}`,
      isVideo: true,
      thumbnailCaption:"Big Ben"
    })) || [];
  }, [filteredImageData, imagepath, path]);

  if (imageLoading) return null;
  if (imageError) return null;
  const dynamicEl = [
    {
        src: '...',
        responsive: '...',
        thumb: '...',
        subHtml: `...`,
    },
    {
        src: '...',
        responsive: '...',
        subHtml: `...`,
    },
    // Add more placeholder images as needed
];

  return (
  <LightGallery
  elementClassNames={'masonry-gallery-demo'}
  dynamic={true}
  dynamicEl={dynamicEl}
  >
<div className="grid-sizer"></div>
    {images.map((item:any,idx:number)=>(

        <a key={idx}
          data-lg-size="1600-1067"
          className="gallery-item"
          data-src={item.original}
          data-sub-html="<h4>Photo by - <a href='https://unsplash.com/@tobbes_rd' >Tobias Rademacher </a></h4><p> Location - <a href='https://unsplash.com/s/photos/puezgruppe%2C-wolkenstein-in-gr%C3%B6den%2C-s%C3%BCdtirol%2C-italien'>Puezgruppe, Wolkenstein in Gröden, Südtirol, Italien</a>layers of blue.</p>">
          <img
            alt="layers of blue."
            className="img-responsive"
            onError={handleError}
            src={item.original}/>
        </a>
  ))}

  </LightGallery>);
}

