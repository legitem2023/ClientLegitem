import { useState } from 'react';
import AboutJson from 'json/About.json'
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
const About = () => {
    const [drawerState] = useGlobalState("drawer");
    return (
        <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
        <div className='LabelHead carouselLabel'><Icon icon="mdi:about" /><span>About</span></div>
            <div className='Privacy'>
                <div className="About">
                    <div>{AboutJson[0].Name}</div>
                    <div>{AboutJson[0].Description}</div>
                    <div>{AboutJson[0].Mission}</div>
                    <div>{AboutJson[0]["Why_Choose_Legitem"].Quality_Assurance}</div>
                    <div>{AboutJson[0]["Why_Choose_Legitem"].Affordable_Fashion}</div>
                    <div>{AboutJson[0].Connect_With_Us}</div>
                    <div>{AboutJson[0].Name}</div>
                </div>
            </div>
        <div>
            <video width="100" height="240" style={{width:'100%',height:'auto'}} controls>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
            </video>
        </div>
    </div>

        </div>
        <div>
        </div>
      </div>
    );
};

export default About;


