import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { formatter } from 'utils/scripts';

const RelatedProducts = ({data}) => {
    const path = process.env.NEXT_PUBLIC_PATH
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH;
    const router = useRouter()
    console.log(data,"++++++")
  return (
    <div>
        {data.map((item: any, idx: any) => (
              <div key={idx} className='MainView_RelatedProductsThumbs'>
                <Image
                  src={item.thumbnail === '' || item.thumbnail === null ? imgPath + 'Product-2024-0-5-22-47034.webp' : imgPath + item.thumbnail}
                  height='200' 
                  width='200' 
                  alt={idx} 
                  onClick={() => { router.push(path + `Products/${item.id}?data=${encodeURIComponent(JSON.stringify(item))}`);}}></Image>
                <div className='thumbnailTextContainer'>
                  <div>
                    <span>Price :</span><span>{formatter.format(item.price)}</span>
                  </div>
                  <div>
                    <span>Name :</span><span>{item.name}</span>
                  </div>
                  <div>
                    <span>Ratings :</span><span></span>
                  </div>
                  <div>
                    <span>Size :</span><span></span>
                  </div>
                  <div className='Rates'>
                    <div className='Rates_values'>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                      <span>0</span>
                    </div>
                    <div className='ViewsLikes'>
                      <span>Views :</span>
                      {/* <span>{useNumberOfviews.filter((numbitem: any) => { return numbitem.productCode === relatedProd[0].productCode }).length}</span> */}
                      <span>Likes :</span>
                      {/* <span>{NumberOFViews.getNumberOfViews.filter((numbitem:any)=>{return numbitem.productCode===items.productCode}).length}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            ))
        }
    </div>
  )
}

export default RelatedProducts