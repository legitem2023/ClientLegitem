"use client"
import React from 'react'
import DataManager from 'utils/DataManager'
import ManagementBody from 'components/Management/ManagementBody/ManagementBody'
import ManagementHeader from 'components/Management/ManagementHeader/ManagementHeader'
import ManagementDrawer from 'components/Management/ManagementDrawer.tsx/ManagementDrawer'
import ManagementNavigation from 'components/Management/ManagementNavigation/ManagementNavigation'
import { Icon } from '@iconify/react'
import ManagementSearch from 'components/Management/ManagementSearch/ManagementSearch'
import ManagementSettings from 'components/Management/ManagmentSettings/ManagementSettings'
const Settings = () => {
  return (
    <div className='Main'>
        <div className='ManagementBody'>
          <ManagementHeader/>
          <ManagementDrawer/>
          <ManagementNavigation/>
          <div className='ManagementMainMenu'>
          <div className='Menu_label_management'><Icon icon='material-symbols:settings-outline' /> Settings</div>
              <ManagementSearch/>
              <ManagementSettings/>
          </div>
        </div>
    </div>
  )
}

export default Settings