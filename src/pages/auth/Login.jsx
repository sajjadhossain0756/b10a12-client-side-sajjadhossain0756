
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import loginImg from '../../assets/login.jpg'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useAuth from '../../hooks/useAuth'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInUser, signInWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'


    const onSubmit = (data) => {
        console.log(data)
        const { email, password } = data;

        signInUser(email, password)
            .then(data => {
                console.log(data.user)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are Sucessfully logged In",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate(from)
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    // signInWithGoogle
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photo: result.user?.photoURL
                }
                axiosPublic.post('/all_users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You are Sucessfully logged In",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate(from)

                    })

            })
            .catch(err => {
                Swal.fire(err.message)
            })
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <Link to={`/`}><button className='btn btn-outline hover:bg-teal-500 my-3 lg:ml-[180px]'>Back To Home</button></Link>
            <div className='flex items-center w-full max-w-sm mx-auto overflow-hidden lg:flex-row-reverse
            bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:border-purple-300 dark:bg-gray-700 rounded-lg shadow-lg  lg:max-w-4xl p-5'>
                <div
                    className='hidden lg:block lg:w-1/2 h-full'
                >
                    <img src={loginImg} alt='loginImg' className='rounded h-[400px] object-cover' />
                </div>

                <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>

                    <p className='mt-3 text-xl text-center text-white '>
                        Register
                    </p>

                    <div

                        className='flex cursor-pointer items-center justify-center mt-4 text-white transition-colors duration-300 transform border rounded-lg   hover:bg-gray-50 '
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

                        <span onClick={handleGoogleSignIn} className='w-5/6 hover:text-black px-4 py-3 font-bold text-center'>
                            Sign in with Google
                        </span>
                    </div>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  lg:w-1/4'></span>

                        <div className='text-xs text-center  uppercase  hover:underline'>
                            or login with email
                        </div>

                        <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
                    </div>
                    <div className='w-full mt-2'>
                    <button className="btn w-full text-white bg-gradient-to-l from-purple-500
                     to-pink-500 hover:from-teal-500 hover:to-orange-500" 
                    onClick={() => document.getElementById('my_modal_3').showModal()}>Admin Login Credentials</button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-4'>
                            <label
                                className='block mb-2 text-sm font-medium text-white '
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
                                    className='block mb-2 text-sm font-medium text-white '
                                    htmlFor='loggingPassword'
                                >
                                    Password
                                </label>
                            </div>

                            <input
                                id='loggingPassword'
                                autoComplete='current-password'
                                name='password'
                                {...register("password")}
                                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                                type='password'
                            />
                        </div>
                        <div className='mt-6'>
                            <input

                                type='submit'
                                value="Login"
                                className='btn w-full text-white font-bold bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500'
                            />

                        </div>
                    </form>

                    <div className='flex items-center justify-between mt-4'>
                        <span className='w-1/5 border-b  '></span>

                        <Link
                            to='/signup'
                            className='text-xs uppercase  hover:underline'
                        >
                            If You have no Account, Sign up
                        </Link>

                        <span className='w-1/5 border-b '></span>
                    </div>
                </div>
            </div>
        
            {/* modal for admin credential */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">sajjad100@gmail.com</h3>
                    <p className="py-4">Sajjad100#</p>
                </div>
            </dialog>
        </div>
    )
}

export default Login