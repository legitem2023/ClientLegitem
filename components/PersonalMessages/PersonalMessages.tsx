'use client'
import React, { useEffect } from 'react'
import Messages from './Messages'
// import StoreProduct from './StoreProduct'
import { useGlobalState } from 'state'
import ActiveUsers from './ActiveUsers'
import { Icon } from '@iconify/react'
import { useMutation } from '@apollo/client'
import { SET_ACTIVE_USERS } from 'graphql/mutation'

const PersonalMessages = () => {
    const [drawerState] = useGlobalState("drawer");
    const [SelectedReciever] = useGlobalState("SelectedReciever");
    const [userEmail] = useGlobalState("cookieEmailAddress")
 
    return (
        <div className='body_messages'>
            <div className={`${drawerState ? 'LeftWing' : 'LeftWing_'}`}>
                <ActiveUsers email={userEmail}/>
            </div>
            <div className='middlecontainer_messages'>
            <div className='LabelHead carouselLabel'>{SelectedReciever===""?<><Icon icon="ic:baseline-message" /> Messages</>:<><Icon icon="line-md:account" /> {SelectedReciever}</>}</div>
                <div className='messages_container'>
                    {SelectedReciever!==""?<Messages reciever={SelectedReciever}/>:<ul className='messagesUL'><h2>Select User</h2></ul>}
                </div>
            </div>
            <div className='RightWing'>

            </div>
        </div>
    )
}

export default PersonalMessages