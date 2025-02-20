import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/navbar/Navbar'
import Footer from '../Shared/Footer'

const Main = () => {
    return (
        <div className=''>
            <Helmet>
                <title>Pulse of the Nation | Home</title>
            </Helmet>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Main
