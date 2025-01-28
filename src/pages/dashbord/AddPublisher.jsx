import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddPublisher = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const onSubmit = async (data) => {
        console.log(data)

        const imageFile = { image: data?.logo[0] }

        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data)
        const { publisher } = data;
        const logo = res.data?.data?.display_url;
        const userInfo = {
            publisher,
            logo
        }
        console.log(userInfo)
        axiosSecure.post(`/publisher`, userInfo)
            .then(res2 => {
                console.log(res2.data)
                reset()
                if (res2.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "publisher added successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Pulse of the Nation | Add Publisher</title>
            </Helmet>
            <div className='flex items-center w-full lg:w-[500px] mt-4  mx-auto overflow-hidden flex-col
bg-gray-100 border-2 dark:border-purple-300 dark:bg-gray-700 rounded-lg shadow-lg '>
                <div className='w-full lg:w-[500px] px-6 py-8 md:px-8'>

                    <p className='mt-3 text-xl text-center dark:text-white text-gray-600 '>
                        Add Publisher
                    </p>

                    <div

                        className='flex cursor-pointer items-center justify-center mt-4 dark:text-white text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '
                    >
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                                htmlFor='LoggingEmailAddress'
                            >
                                Publisher Name
                            </label>
                            <input
                                id='publisher'
                                name='publisher'
                                {...register("publisher", { required: true })}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                            />
                        </div>

                        <div className='mt-4'>
                            <div className='flex justify-between'>
                                <label
                                    className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                                    htmlFor='loggingPassword'
                                >
                                    Publisher Logo
                                </label>
                            </div>

                            {/* publisher logo */}
                            <div className='flex flex-col gap-2 mt-4'>
                                <label className="form-control text-black w-full ">
                                    <input
                                        type="file"
                                        name='logo'
                                        {...register("logo", { required: true })}
                                        className="file-input file-input-bordered w-full "
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <input

                                type='submit'
                                value="Add Publisher"
                                className='btn w-full text-white font-bold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
                            />

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPublisher