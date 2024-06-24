// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination,Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import DataManager from 'utils/DataManager';
// import { useRef } from 'react';
// import Image from 'next/image';

// const SwiperGallery = () => {
//   const progressCircle = useRef(null);
//   const progressContent = useRef(null);
//   const Manager = new DataManager();
//   const path = process.env.NEXT_PUBLIC_PATH;
//   const {Store,loading,error} = Manager.nameOfStore();

//   if(!Store) return
//   if(loading) return
//   if(error) return

//   const onAutoplayTimeLeft = (s:any, time:any, progress:any) => {
//     progressCircle.current.style.setProperty('--progress', 1 - progress);
//     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
//   };

//   let carousel = () =>{
//     for (let index:any = 0; index < 6; index++){
//       return(
//           <SwiperSlide>
//             <Image src={path + '/image/Legitem-svg.svg'} height='300' width='449' loading='lazy' alt={index}/>
//             <div className='StoreName'>Store Name</div>
//           </SwiperSlide>
//       )
//     }
//   }


//   return (
//     <Swiper
//     effect={'coverflow'}
//     grabCursor={true}
//     centeredSlides={true}
//     slidesPerView={3}
//     loop={true}
//     spaceBetween={-100}
//     autoplay={{
//       delay: 2500,
//       disableOnInteraction: false,
//     }}
//     coverflowEffect={{
//       rotate:0,
//       slideShadows: true,
//       depth:500,
//     }}
//     pagination={true}
//     onAutoplayTimeLeft={onAutoplayTimeLeft}
//     modules={[EffectCoverflow, Pagination,Autoplay]}
//     >
//     {Store.getNameofStore.map((item:any,idx:any) => (
//               <SwiperSlide key={idx}>
//                 <Image src={item.image===null?path+'/image/Legitem-svg.svg':item.image} height='300' width='449' loading='lazy' alt={idx}/>
//                 <div className='StoreName'>{item.nameOfStore}</div>
//               </SwiperSlide>
//     ))}
//     {carousel()}
//        <div className="autoplay-progress" slot="container-end">
//           <svg viewBox="0 0 48 48" ref={progressCircle}>
//             <circle cx="24" cy="24" r="20"></circle>
//           </svg>
//           <span ref={progressContent}></span>
//         </div>
//     </Swiper>
//   );
// };
// export default SwiperGallery