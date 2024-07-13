import React, { useMemo } from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from 'next/link';
import { useGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import { GET_INVENTORY_SUB_IMAGES } from 'graphql/queries';

export const Gallery = () => {

  const path = process.env.NEXT_PUBLIC_PATH;
  const imagepath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
  const [urlData] = useGlobalState('urlData');

  const { data:ImageData, loading:imageLoading, error:imageError } = useQuery(GET_INVENTORY_SUB_IMAGES);

  const position = 'right';

  const filteredImageData = useMemo(() => {
    if (urlData) {
      return ImageData?.getInv_subImage.filter((item) => item.subImageRelationChild === urlData);
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
    <ImageGallery
      items={images}
      showBullets
      thumbnailPosition={position}
      showNav={true}
      lazyLoad={true}
      autoPlay={true}
      infinite={true}
      useTranslate3D={true}
    />
  );
};
