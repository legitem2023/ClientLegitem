import { useMutation } from '@apollo/client';
import { Icon } from '@iconify/react'
import { INSERT_LIKES } from 'graphql/mutation';
import React from 'react'
import { useGlobalState } from 'state';
import DataManager from 'utils/DataManager';

type PropsLikeCmd = {
    productCode:String
}
const LikeCmd:React.FC<PropsLikeCmd> = (productCode) => {
    const Manager = new DataManager();
    const [userEmail] = useGlobalState('cookieEmailAddress');
    const [insertLikes] = useMutation(INSERT_LIKES,{
        onCompleted: (data) => {
          if(data.insertLikes.statusText === "Successful!"){
            Manager.Success("You Likes the Product");
          }
          console.log(data.insertLikes);
        }
      });
    const HandleAddtoLikelistThumbs = () =>{
        if(!userEmail) return document.location.href='./Login'
        insertLikes({
          variables:{
            "likesParamInput": {
              "accountEmail": userEmail,
              "productCode": productCode.productCode
            }
          }
        })
      }
  return (
    <Icon 
          onClick={() => HandleAddtoLikelistThumbs()}
          icon="mdi:like"  
          className='LikeStyle'
        />
  )
}

export default LikeCmd