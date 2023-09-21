import React from 'react'
import {Text} from '@chakra-ui/react'

export default function adminDashboard() {
  return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <Text className="usersAdmin-title">Administrator Dashboard</Text>
        </div>
        <div className='admin-dashboard-grid'>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title">Widget </Text>
                </div>
            </div>
        </div>
    </div>
  )
}
