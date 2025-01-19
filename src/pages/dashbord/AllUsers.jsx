import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const AllUsers = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('all_users');
      return res.data;
    }
  })
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>AllUsers: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, indx) => {
              return <tr key={user._id}>
                <th>{indx + 1}</th>
                <td><img src={user.photo} alt="profile" className='h-12 w-12 rounded-full' /></td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn bg-orange-400 text-white' >
                    Make Admin
                  </button>}

                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllUsers