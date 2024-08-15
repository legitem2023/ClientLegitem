'use client'
import { Icon } from '@iconify/react'
import { Gallery } from 'components/Gallery/Gallery'
import Menu from 'components/Partial/Menu'
import React from 'react'
import ThreeJS from 'components/ThreeJS/ThreeJS'
import { Input } from '@nextui-org/react'
import { HomeGallery } from 'components/Gallery/HomeGallery'
import Accordion from 'components/Accordion/Accordion'
import FAQ from 'json/faq.json'
import About from 'components/About/About'
import Disclaimer from 'components/About/Disclaimer'
import Privacy from 'components/About/Privacy'

const HomeBody = () => {
  return (
    <div className='body'>
      <div className='dropdown openDrawer'>
        <Icon icon='iconamoon:menu-burger-horizontal-duotone' />
      </div>
      <div className='LeftWing'>
        <Menu />
      </div>
      <div className='middlecontainer'>

        <div className=''>
  

        </div>
        <div className=''>
          <div className=''>  
              <div className=''>
                  <div className='LabelHead carouselLabel'><Icon icon="mdi:about" /><span>Products</span></div>
                    <div id='Gallery'>
                        <HomeGallery/>
                    </div>
              </div>        
              <div className=''>
                  <div className='LabelHead carouselLabel'><Icon icon="mdi:about" /><span>About</span></div>
                  <div className='Privacy'>
                    <About/>
                  </div>
                    <div>
                      <video width="100" height="240" style={{width:'100%',height:'auto'}} controls>
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
                      </video>
                    </div>
              </div>

              <div className=''>
                <div className='LabelHead carouselLabel'><Icon icon="ion:hand-right-outline" /><span>Disclaimer</span></div>
                <div className='Privacy'>
                    <Disclaimer/>
                </div>
              </div>
              <div className=''> 
                  <div className='LabelHead carouselLabel'><Icon icon="mdi:cart" /><span>Frequently Asked Questions</span></div>
                  <Accordion faqs={FAQ}></Accordion>
              </div>
              <div className=''>
                <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-privacy-tip"  /><span>Privacy</span></div>
                <div className='Privacy'>
                  <Privacy/>
                </div>
              </div>
              <div className=''>
                <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-phone" /><span>Contact Us</span></div>
                <div className='ContactForm'>
                    <div><input type='text' placeholder='Enter Name'/></div>
                    <div><input type='text' placeholder='Enter Email'/></div>
                    <div><input type='text' placeholder='Enter Mobile'/></div>
                    <div><textarea placeholder='Enter Description'></textarea></div>
                    <div><button >Apply</button></div>

                </div>
              </div>
          </div>



        </div>



      </div>
      <div className='RightWing'>

      </div>
    </div>
  )
}

export default HomeBody