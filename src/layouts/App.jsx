import { useState } from 'react'
import '../App.css'
import { Outlet } from 'react-router-dom'

import NavigationBar from '../components/NavigationBar.jsx'
import Footer from '../components/Footer.jsx'


function App() {
    return (
        <div>
            <NavigationBar />
            <div className='min-h-screen'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default App
