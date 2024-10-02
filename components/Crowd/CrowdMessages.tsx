'use client'
import React from 'react'
import Messages from './Messages'
import { useGlobalState } from 'state'
import ActiveUsers from './ActiveUsers'
import { Icon } from '@iconify/react'

const CrowdMessages = () => {
    const [drawerState] = useGlobalState("drawer");
    const [userEmail] = useGlobalState("cookieEmailAddress") 

    return (
        <div className='body_messages'>
            <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
            <ActiveUsers email={userEmail}/>
            </div>
            <div className='middlecontainer_messages'>
            <div className='LabelHead carouselLabel'><Icon icon="jam:messages-f" />Crowd Messages</div>

                <div className='messages_container'>
                    <Messages />
                </div>
            </div>
            <div className='RightWing'>

            </div>
        </div>
    )
}

export default CrowdMessages