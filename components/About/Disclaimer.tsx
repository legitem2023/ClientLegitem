import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import { useGlobalState } from 'state';
const Disclaimer = () => {
    const [drawerState] = useGlobalState("drawer");
    return (
      <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
        <div className='LabelHead carouselLabel'><Icon icon="ion:hand-right-outline" /><span>Disclaimer</span></div>
        <div className='Privacy'>
          <div>
              <div>{DisclaimerJson['General_Disclaimer'].content}</div>
              <div>{DisclaimerJson['External_Links_Disclaimer'].content}</div>
              <div>{DisclaimerJson['Professional_Advice_Disclaimer'].content}</div>
              <div>{DisclaimerJson['Limitation_of_Liability'].content}</div>
              <div>{DisclaimerJson['Changes_to_This_Disclaimer'].content}</div>
          </div>
        </div>
    </div>
        </div>
        <div>
        </div>
      </div>
    );
}

export default Disclaimer