import React from 'react'
import AdList from '../components/AdList'
export default function UserList({selectedMenuItem}) {
  return (
    <div className='userList'>
        <div className='backgroundList'>
          
          <AdList selectedMenuItem={selectedMenuItem}></AdList>
          
        </div>
    </div>
  )
}
