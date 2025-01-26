import React, { useContext } from 'react'
import { FaBook, FaList, FaShoppingCart, FaUser } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import profileImg from '../../assets/profile.png'
import Swal from 'sweetalert2'
import './navbar.module.css'
import useAdmin from '../../hooks/useAdmin'

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext)
    const [isAdmin] = useAdmin()

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

    const navItem = <>
        <li><NavLink className='sajjad' to='/'>Home</NavLink></li>
        <li><NavLink to='/add-article'>Add Article</NavLink></li>
        <li><NavLink to='/all-articles'>All Articles</NavLink></li>
        <li><NavLink to='/my-articles'>My Articles</NavLink></li>
        <li><NavLink to='/premium-articles'>Premium Articles</NavLink></li>
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
        <div className=''>
            <div className="navbar max-w-6xl bg-gradient-to-r from-teal-400 to-blue-500 text-white">
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
                    <a className="font-bold text-xl">Pulse of the Nation</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 items-center">
                        {navItem}
                    </ul>
                </div>
                <div className="navbar-end">

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
        </div>
    )
}

export default Navbar