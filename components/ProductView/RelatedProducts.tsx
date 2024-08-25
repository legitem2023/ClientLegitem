import Ratings from 'components/Partial/Ratings/Ratings';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { formatter } from 'utils/scripts';

const RelatedProducts = ({data}) => {
    const path = process.env.NEXT_PUBLIC_PATH
    const imgPath = process.env.NEXT_PUBLIC_SERVER_PRODUCT_IMAGE_PATH || '';
    const router = useRouter()
    const fallbackImage = 'Product-2024-0-5-22-47034.webp';
    const handleError = (event) => {
      event.target.src = `${imgPath}${fallbackImage}`;
      event.target.srcset = `${imgPath}${fallbackImage}`;
    };
  return (
    <div>
        {data.map((item: any, idx: any) => (
              <div key={idx} className='MainView_RelatedProductsThumbs'>
                <Image
                  src={item.thumbnail ? `${imgPath}${item.thumbnail}` : `${imgPath}${fallbackImage}`}
                  height='200' 
                  width='200' 
                  alt={idx} 
                  onError={handleError}
                  onClick={() => { router.push(`${path}Products/${item.id}?data=${encodeURIComponent(btoa(JSON.stringify(item)))}`);}}>
                </Image>
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
                  <div className='ViewsLikes'>
                    <Ratings />
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