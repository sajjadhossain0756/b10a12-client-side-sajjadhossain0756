
import { FaAddressCard,FaBook,FaHome, FaList,FaUser,FaUtensils } from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'

const Dashbord = () => {
    const isAdmin = true;
    return (
        <div className='flex w-full gap-4 my-2'>
            <div className='w-64 bg-orange-400'>
                <ul className="menu">
                    {isAdmin && <>
                        <li><NavLink to='/dashboard/all-users'>
                            <FaUser></FaUser>
                            All Users
                        </NavLink></li>
                        <li><NavLink to='/dashbord/all-articles'>
                            <FaBook></FaBook>
                            All Articles
                        </NavLink></li>
                        <li><NavLink to='/dashbord/add-publisher'>
                            <FaList></FaList>
                            Add Publisher
                        </NavLink></li>
                    </>}
                    {/* shared navbar */}
                    <div className="divider"></div>
                    <li><NavLink to='/'>
                        <FaHome></FaHome>
                        Home
                    </NavLink></li>
                    <li><NavLink to='/menu'>
                        <FaAddressCard></FaAddressCard>
                        Menu
                    </NavLink></li>
                </ul>
            </div>
            <div className='w-full'>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Dashbord