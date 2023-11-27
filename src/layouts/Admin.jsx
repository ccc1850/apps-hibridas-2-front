import { useState, useEffect } from 'react'
import '../App.css'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar.jsx'
import Footer from '../components/Footer.jsx'
import AdminToolbar from '../components/AdminToolbar.jsx'


function Admin() {

    return (
        <div>
            <NavigationBar />
            <AdminToolbar />
            
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default Admin
