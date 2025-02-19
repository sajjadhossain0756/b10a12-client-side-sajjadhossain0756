
import { FaAddressCard,FaBook,FaHome, FaList,FaUser} from 'react-icons/fa'
import { NavLink, Outlet } from 'react-router-dom'
import useAdmin from '../../hooks/useAdmin';

const Dashbord = () => {
    const [isAdmin] = useAdmin()
    console.log(isAdmin)

    return (
        <div className='flex w-full '>
            <div className='w-64 bg-orange-400 dark:bg-gray-700 dark:text-white hidden lg:block'>
                <ul className="menu ">
                    {isAdmin && <>
                        <li><NavLink to='/dashboard/all-users'>
                            <FaUser></FaUser>
                            All Users
                        </NavLink></li>
                        <li><NavLink to='/dashboard/all-articles'>
                            <FaBook></FaBook>
                            All Articles
                        </NavLink></li>
                        <li><NavLink to='/dashboard/add-publisher'>
                            <FaList></FaList>
                            Add Publisher
                        </NavLink></li>
                    </>}
                    {/* shared navbar */}
                    <hr class="border-gray-300 dark:border-gray-600" />
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