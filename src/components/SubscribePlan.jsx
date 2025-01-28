import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SubscribePlan = () => {

  return (
    <div className='bg-black/90 p-4 mt-6 rounded-lg'>
       <h2 className='text-4xl text-center font-bold my-6 text-white'>To Get Premium Article Choose Your Plan</h2>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* first plan */}
        <div className=' bg-green-200 border-4 border-red-500 p-6 rounded'>
          <p className='text-lg font-semibold bg-pink-200 w-fit px-2 py-1 rounded mb-4'>Free For 1 Month</p>
          <div className='flex justify-between'>
            <p className='flex flex-col text-2xl font-semibold'><span>Premium</span> <span>Indivisual</span></p>
            <p className='flex flex-col font-semibold'>
              <span className='text-2xl'>Free</span>
              <span>For 1 Month</span></p>
          </div>
          <ul className='list-disc p-4 mb-6'>
            <li>1 Premium Account</li>
            <li>Cancel Anytime</li>
            <li>15 hours/month of listening time from our audiobook subscriber catalog</li>
          </ul>
          <button className='btn bg-orange-300 w-full rounded-full'>Try Free For 1 Month</button>
          <p className='mt-4'>Free For 1 Month, then $10.99 per month after. Offer only induvidual if haven't tried Premium
            before <span className='underline'>Term apply</span>
          </p>
        </div>
        {/* second plan */}
        <div className=' bg-pink-200 border-4 border-teal-600 p-6 rounded'>
          <div className='flex justify-between'>
            <p className='flex flex-col text-2xl font-semibold'><span>Premium Duo</span></p>
            <p className='flex flex-col font-semibold'>
              <span className='text-2xl'>$14.99</span>
              <span>Per Month</span></p>
          </div>
          <ul className='list-disc p-4 mb-10 mt-6'>
            <li>2 Premium Account</li>
            <li>Cancel Anytime</li>
            <li>15 hours/month of listening time from our audiobook subscriber catalog
              (plan manager only)
            </li>
          </ul>
          <Link to={`/payment`} state={{ price: 14.99 }}><button className='btn bg-green-300 w-full rounded-full'>Get Premium Duo</button></Link>
          <p className='mt-4'>For couples who reside at the same address
            <span className='underline'> Term apply</span>
          </p>
        </div>
        {/* third plan */}
        <div className=' bg-teal-200 border-4 border-blue-800 p-6 rounded'>
          <div className='flex justify-between'>
            <p className='flex flex-col text-2xl font-semibold'><span>Premium Family</span></p>
            <p className='flex flex-col font-semibold'>
              <span className='text-2xl'>$16.99</span>
              <span>Per Month</span></p>
          </div>
          <ul className='list-disc p-4 mb-10 mt-6'>
            <li>2 Premium Account</li>
            <li>Cancel Anytime</li>
            <li>15 hours/month of listening time from our audiobook subscriber catalog
              (plan manager only)
            </li>
          </ul>
          <Link to={`/payment`} state={{ price: 16.99 }}><button className='btn bg-pink-300 w-full rounded-full'>Get Premium Family</button></Link>
          <p className='mt-4'>For couples who reside at the same address
            <span className='underline'> Term apply</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubscribePlan