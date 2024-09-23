'use client'
import { useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { GET_CATEGORY } from "graphql/queries";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import {StackedCarousel,ResponsiveContainer} from "react-stacked-center-carousel";
import { imageSource } from "utils/scripts";

export default function Carousel(props:any) {
  const ref:any = React.useRef(StackedCarousel);
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
  const { data:Category, loading, error } = useQuery(GET_CATEGORY);
  const pathname = usePathname();
  const Products = pathname.startsWith('/Products');
  if(loading) return
  if(error) return
  const Card = (props:any) => {
    const { data, dataIndex }:any = props;
    const { image } = data[dataIndex];
    return (
      <div>
      <div
        style={{
          width: "100%",
          height: 300,
          userSelect: "none",
        }}
        className="my-slide-component"
      >
        <Image
          height="100"
          width="200"
          alt={dataIndex}
          className="carouselImage"
          draggable={false}
          priority={true}
          src={imageSource(image)}
        />
      </div>
      </div>
    );
  };


if(Products) return
  return (
  <div className="card">
    <div style={{ width: "100%", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          let currentVisibleSlide = 5;
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={parentWidth < 200 ? parentWidth : 400}
              carouselWidth={parentWidth}
              data={Category?.getCategory}
              customScales = {[1, 0.7, 0.5, 0.2, 0.1]}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={7}
              useGrabCursor
            />
          );
        }}
      />
        <div className="card-button left" onClick={() => ref.current?.goBack()}>
              <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30 }} />
        </div>
        <div className="card-button right" onClick={() => ref.current?.goNext()}>
              <Icon icon='ic:sharp-double-arrow' style={{ fontSize: 30 }} />
        </div>
    </div>
  </div>

  );
}

