'use client'
import React from 'react'
import Messages from './Messages'
// import StoreProduct from './StoreProduct'
import { useGlobalState } from 'state'
// import ActiveUsers from './ActiveUsers'
import { Icon } from '@iconify/react'

const PersonalMessages = () => {
    const [drawerState] = useGlobalState("drawer");

    return (
        <div className='body_messages'>
            <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
                {/* <ActiveUsers/> */}
            </div>
            <div className='middlecontainer_messages'>
            <div className='LabelHead carouselLabel'><Icon icon="ic:baseline-message" /> Messages</div>
                <div className='messages_container'>
                    <Messages/>
                </div>
            </div>
            <div className='RightWing'>

            </div>
        </div>
    )
}

export default PersonalMessages