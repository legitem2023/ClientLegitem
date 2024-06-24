'use client'
import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {StackedCarousel,ResponsiveContainer} from "react-stacked-center-carousel";
import DataManager from "utils/DataManager";

export default function Carousel(props:any) {
  const ref:any = React.useRef(StackedCarousel);
  const Manager = new DataManager();
  const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';

  const {Category,loading,error} = Manager.category();
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
          src={imgPath+image}
        />
      </div>
      </div>
    );
  };

setInterval(()=>{
  ref.current?.goBack();
},3000)

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
              data={Category.getCategory}
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

