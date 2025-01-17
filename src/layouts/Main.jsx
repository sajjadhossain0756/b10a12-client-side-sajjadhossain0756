import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'
import Navbar from '../Shared/Navbar'

const Main = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <Helmet>
                <title>Pulse of the Nation | Home</title>
            </Helmet>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    )
}

export default Main
