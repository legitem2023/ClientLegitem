import React from 'react'
import DisclaimerJson from 'json/Disclaimer.json'
import { Icon } from '@iconify/react'
import { useGlobalState } from 'state';
import Accordion from 'components/Accordion/Accordion';
import FAQ from 'json/faq.json'
const FaQ = () => {
    const [drawerState] = useGlobalState("drawer");
    return (
      <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <Accordion faqs={FAQ}></Accordion>

        </div>
        <div>
        </div>
      </div>
    );
}

export default FaQ