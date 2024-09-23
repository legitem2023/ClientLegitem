import { useState } from 'react';
import AboutJson from 'json/About.json'
import { Icon } from '@iconify/react';
import { useGlobalState } from 'state';
import { READ_ABOUT_US } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import Loading from 'components/Partial/LoadingAnimation/Loading';
import HtmlRenderer from 'components/Html/HtmlRenderer';
const About = () => {
    const { data, loading,error } = useQuery(READ_ABOUT_US);

    const [drawerState] = useGlobalState("drawer");
    if (loading) return <Loading/>
    if(error) return "Connection Error";
    return (
        <div className='body'>
        <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
          
        </div>
        <div className='middlecontainer'>
        <div className=''>
        <div className='LabelHead carouselLabel'><Icon icon="mdi:about" /><span>About</span></div>
                <div className="Privacy">
                    {data?.readAbout?.map((item: any,idx:number) => (
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
};

export default About;


