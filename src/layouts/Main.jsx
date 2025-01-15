import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet } from 'react-router-dom'

const Main = () => {
    return (
        <div>
            <Helmet>
                <title>Pulse of the Nation | Home</title>
            </Helmet>
            <Outlet></Outlet>
        </div>
    )
}

export default Main
