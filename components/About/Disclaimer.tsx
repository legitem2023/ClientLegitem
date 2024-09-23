import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import { READ_DISCLAIMER } from 'graphql/queries';
import { useGlobalState } from 'state';
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import HtmlRenderer from 'components/Html/HtmlRenderer';
const Disclaimer = () => {
  const { data, loading,error } = useQuery(READ_DISCLAIMER);
  const [drawerState] = useGlobalState("drawer");
  if(loading) return <Loading/>
  if(error) return "Connection Error";
    return (
      <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
        <div className='LabelHead carouselLabel'><Icon icon="ion:hand-right-outline" /><span>Disclaimer</span></div>
        <div className='Privacy'>
          {data?.readDisclaimer?.map((item: any,idx:number) => (
            <div key={idx}>
              <HtmlRenderer htmlContent={item.content}/>
            </div>
          ))}
        </div>
    </div>
        </div>
        <div>
        </div>
      </div>
    );
}

export default Disclaimer