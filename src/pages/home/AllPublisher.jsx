import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllPublisher = () => {
    const axiosSecure = useAxiosSecure()

    const { data: publishers = [] } = useQuery({
        queryKey: ['publishers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/publisher`)
            return res.data;
        }
    })
    return (
        <div className='bg-teal-400 p-5 md:p-10 '>
            <h2 className='text-4xl font-bold text-center '>Our All Publisher</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-6  gap-4 '>
                {publishers && publishers.map(publisher => <div key={publisher._id} 
                className='flex gap-3 items-center text-white bg-gradient-to-l from-purple-500 to-pink-500
                 hover:from-teal-500 hover:to-orange-500 p-3 rounded-md'>
                    <img src={publisher?.logo} alt="" className='h-[60px] w-[60px] rounded-full' />
                    <p className='text-2xl font-bold'>{publisher.publisher}</p>
                </div>)}
            </div>
        </div>
    )
}

export default AllPublisher