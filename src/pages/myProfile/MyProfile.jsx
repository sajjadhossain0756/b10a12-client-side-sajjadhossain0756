import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const MyProfile = () => {
    const { user,updateUserProfile } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const axiosPublic = useAxiosPublic()

    const onSubmit = async (data) => {
        // upload image to imgbb and then get an url
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        const { name } = data;
        const photo = res.data?.data?.display_url;

        updateUserProfile(name, photo)
            .then(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile successfully updated",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <div className='text-center flex flex-col justify-centers items-center gap-2 bg-pink-300 w-[500px] mx-auto mt-4 p-4 rounded'>
            <h1 className='text-3xl text-center mb-4 font-semibold'>Welcome To {user?.displayName}</h1>
            <img src={user?.photoURL} alt="profile" className='rounded-full h-20 w-20' />
            <p className='text-xl font-semibold'>Name: {user?.displayName}</p>
            <p className='text-xl font-semibold'>Email: {user?.email}</p>
            <button className="btn bg-gradient-to-r from-pink-400 to-blue-500 hover:from-teal-500 hover:to-orange-500" onClick={() => document.getElementById('my_modal_5').showModal()}>Update Profile</button>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* user name */}
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                                htmlFor='LoggingName'
                            >
                                Name
                            </label>
                            <input
                                id='name'
                                autoComplete='name'
                                defaultValue={user?.displayName}
                                name='name'
                                {...register("name", { required: true })}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='text'
                            />
                            {errors.name && <span className='text-red-600'>Name field is required</span>}
                        </div>
                        {/* user photo */}
                        <div className='flex flex-col gap-2 mt-4'>
                            <label className="form-control text-black w-full ">
                                <input
                                    type="file"
                                    name='photo'
                                    {...register("photo", { required: true })}
                                    className="file-input file-input-bordered w-full "
                                />
                            </label>
                        </div>

                        <div className='mt-6'>
                            <input

                                type='submit'
                                value="Update"
                                className='btn w-full text-white font-bold 
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
                            />

                        </div>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default MyProfile