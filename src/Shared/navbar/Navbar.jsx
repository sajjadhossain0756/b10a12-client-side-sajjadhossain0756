import React, { useContext } from 'react'
import { FaBook, FaList, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import profileImg from '../../assets/profile.png'
import Swal from 'sweetalert2'
import './navbar.module.css'
import useAdmin from '../../hooks/useAdmin'
import usePremium from '../../hooks/usePremium'

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext)
    const [isAdmin] = useAdmin()
    const [isPremium] = usePremium()

    // sign out user with firebase
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are Sucessfully logged Out",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                Swal.fire(err.message)
            })
    }

    // dark mode functionality
    const handleThemeColor = () => {
        const htmlTag = document.getElementById('htmlTag');
        htmlTag.classList.toggle('dark')
      }

    const navItem = <>
        <li><NavLink className='sajjad' to='/'>Home</NavLink></li>
        {user && <li><NavLink to='/add-article'>Add Article</NavLink></li>}
        <li><NavLink to='/all-articles'>All Articles</NavLink></li>
        <li><NavLink to='/my-articles'>My Articles</NavLink></li>
        {isPremium && <li><NavLink to='/premium-articles'>Premium Articles</NavLink></li>}
        <li><NavLink to='/subscription'>Subscription</NavLink></li>
        {isAdmin && <li>
            <NavLink to='/dashboard'>Dashbord</NavLink>
            <ul className="p-2 block md:hidden">
                <li>
                    <NavLink to='/dashboard/all-users'>
                        <FaUser></FaUser>
                        All Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/all-articles'>
                        <FaBook></FaBook>
                        All Articles
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard/add-publisher'>
                        <FaList></FaList>
                        Add Publisher
                    </NavLink>
                </li>
            </ul>
        </li>}
    </>

    return (
        <div className="navbar px-5 md:px-10 bg-gradient-to-r from-teal-500 to-blue-500 text-white
            sticky top-0 z-10 backdrop-blur-md bg-opacity-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-gradient-to-t from-purple-400 to-teal-400 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {navItem}
                    </ul>
                </div>
                <Link to='/'><p className="font-bold text-xl">Pulse of the Nation</p></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
                {/* dark mode and light mode button */}
                <label className="swap swap-rotate mr-4">
                    {/* this hidden checkbox controls the state */}
                    <input onClick={handleThemeColor} type="checkbox" className="theme-controller " value="synthwave" />

                    {/* sun icon */}
                    <svg
                        className="swap-off h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className="swap-on h-10 w-10 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                {/* login and logout user fanctionality */}
                {user && user ? <div className='flex items-center gap-2'>
                    <Link to={`/my-profile`}>
                        <div className="tooltip tooltip-bottom" data-tip={user?.displayName}>
                            <img src={user && user?.photoURL || profileImg} alt="profile" className='h-12 w-12 rounded-full' />
                        </div>
                    </Link>
                    <Link ><button onClick={handleSignOut} className='btn text-white bg-gradient-to-l hover:from-purple-500 hover:to-pink-500 from-teal-500 to-orange-500'>Logout</button></Link>
                </div> : <div className='flex items-center gap-2'>
                    <Link to='/login'><button className='btn text-white bg-gradient-to-l from-purple-500 to-pink-500 hover:from-teal-500 hover:to-orange-500'>Login</button></Link>
                    <Link to='/signup'><button className='btn text-white bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 from-teal-500 to-orange-500'>Register</button></Link>
                </div>}

            </div>
        </div>
    )
}

export default Navbar