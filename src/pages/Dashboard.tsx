import React from 'react'
import {useAuthStore} from "../store/authStore"

import Sidebar from '../components/sidebar'
import Nav from '../components/Dashboard/Nav'

const Dashboard = () => {
    const token = useAuthStore((state) => state.token)
  return (
    <div>{token ? 
        <>
        <div className='bg-slate-100 h-screen m-0'>
    <Nav/>
        
        </div>
        </>
        
        : "not auth"}</div>
  )
}

export default Dashboard