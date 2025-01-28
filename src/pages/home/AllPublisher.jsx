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
        <div className='bg-green-200 mt-6 rounded-lg'>
            <h2 className='text-4xl font-bold text-center pt-4'>Our All Publisher</h2>
            <div className='grid grid-cols-1 md:grid-cols-3  m-6 gap-4 pb-6'>
                {publishers && publishers.map(publisher => <div key={publisher._id} 
                className='flex gap-3 items-center bg-pink-200 p-3 rounded-md'>
                    <img src={publisher?.logo} alt="" className='h-[60px] w-[60px] rounded-full' />
                    <p className='text-2xl font-bold'>{publisher.publisher}</p>
                </div>)}
            </div>
        </div>
    )
}

export default AllPublisher