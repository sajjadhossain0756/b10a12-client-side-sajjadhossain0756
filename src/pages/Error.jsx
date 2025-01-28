import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='bg-red-500 min-h-screen flex flex-col items-center justify-center text-white'>
      <div className='flex flex-col items-center '>
        <Link to='/'><button className=' font-bold text-2xl py-4 flex items-center gap-2'><span><FaArrowLeftLong></FaArrowLeftLong></span> <span>Back To Home</span></button></Link>
        <h1 className='text-5xl font-bold'>404 page not found</h1>
        <p className='text-xl font-semibold pt-4'>Sorry! You Provide A Wrong Routes</p>
      </div>
    </div>
  )
}

export default Error