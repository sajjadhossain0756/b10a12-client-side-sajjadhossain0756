import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import signupImg from '../../assets/signup.jpg'
import { AuthContext } from '../../provider/AuthProvider'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../hooks/useAxiosPublic'


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { createUser, signInWithGoogle } = useContext(AuthContext)
  const navigate = useNavigate()
  const axiosPublic = useAxiosPublic()

  const onSubmit = async(data) => {
    // upload image to imgbb and then get an url
    const imageFile = { image: data.photo[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    const { email, password, name, photo } = data;
    const userInfo = {
      name,
      photo: res.data?.data?.display_url,
      email
    }
    createUser(email, password)
      .then(data => {
        console.log(data.user)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are Sucessfully Sign Up",
          showConfirmButton: false,
          timer: 1500
        });

      })
      .catch(err => {
        console.log(err.message)
      })
  }

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are Sucessfully logged In",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch(err => {
        Swal.fire(err.message)
      })
  }

  return (
    <div>
      <Helmet>
        <title>Pulse of the Nation | Signup</title>
      </Helmet>
      <Link to={`/`}><button className='btn btn-outline my-4 lg:ml-32'>Back To Home</button></Link>
      <div className='flex items-center w-full max-w-sm mx-auto overflow-hidden lg:flex-row-reverse
bg-gray-100 border-2 dark:border-purple-300 dark:bg-gray-700 rounded-lg shadow-lg  lg:max-w-4xl '>
        <div
          className='hidden lg:block lg:w-1/2 pr-4 h-full'
        >
          <img src={signupImg} alt='loginImg' className='rounded h-[560px] object-cover' />
        </div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>

          <p className='mt-3 text-2xl text-center dark:text-white text-gray-600 '>
            Sign Up
          </p>

          <div

            className='flex cursor-pointer items-center justify-center mt-4 dark:text-white text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '
          >
            <div className='px-4 py-2'>
              <svg className='w-6 h-6' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>

            <span onClick={handleGoogleSignIn} className='w-5/6 px-4 py-3 font-bold text-center'>
              Sign up with Google
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  lg:w-1/4'></span>

            <div className='text-xs text-center dark:text-gray-300 text-gray-500 uppercase  hover:underline'>
              or login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
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
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                {...register("email", { required: true })}
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
              />
            </div>

            <div className='mt-4'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium dark:text-white text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                {...register("password",
                  {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='password'
              />
              {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
              {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 characters</p>}
              {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must have one Uppercase,
                one lowercase,one number and one special characters</p>}
            </div>
            <div className='mt-6'>
              <input

                type='submit'
                value="Sign Up"
                className='btn w-full text-white font-bold 
                bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
              />

            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b  '></span>

            <Link
              to='/login'
              className='text-xs dark:text-gray-300 text-gray-500 uppercase  hover:underline'
            >
              If You have an Account, Sign In
            </Link>

            <span className='w-1/5 border-b '></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp