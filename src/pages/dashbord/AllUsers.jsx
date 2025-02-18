import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const AllUsers = () => {
  const axiosSecure = useAxiosSecure()

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('all_users');
      return res.data;
    }
  })

  // make user to admin
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/all_users/admin/${user._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} as an admin successfully`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>AllUsers: {users.length}</h2>
      <div className="overflow-x-auto hidden lg:block">
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
      {/* style for mobile device */}
      <div className='block lg:hidden'>
        {users && users.map((user, indx) => {
          return <div key={user._id} className='bg-pink-300 m-4 rounded-lg'>
               <div className='flex flex-col gap-2 items-center  p-4'>
                  <img src={user?.photo} alt={user?.name} className='h-12 w-12 rounded-full' />
                  <p className='font-semibold'>Name: {user.name}</p>
                  <p className='font-semibold'>Email: {user.email}</p>
                  <div>
                    <span className='font-semibold '>Role: </span>
                  {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} 
                  className='btn bg-orange-400 text-white' >
                    Make Admin
                  </button>}

                </div>
               </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default AllUsers