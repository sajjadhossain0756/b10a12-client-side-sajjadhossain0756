import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SubscribePlan = () => {

  return (
    <div className='bg-pink-400 px-5 md:p-10'>
       <h2 className='text-4xl text-center font-bold mb-8 text-white'>To Get Premium Article Choose Your Plan</h2>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* first plan */}
        <div className='bg-gradient-to-t from-indigo-400 from-10% 
        via-teal-400 via-40% to-emerald-400 to-50% hover:shadow-xl py-6 px-8 rounded-xl'>
          <p className='text-lg font-semibold bg-pink-400 w-fit px-2 py-1 rounded mb-4'>Free For 1 Month</p>
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
          <button className='btn text-white bg-gradient-to-l from-purple-500 to-pink-500 
          hover:from-teal-500 hover:to-orange-500 w-full rounded-full'>Try Free For 1 Month</button>
          <p className='mt-4'>Free For 1 Month, then $10.99 per month after. Offer only induvidual if haven't tried Premium
            before <span className='underline'>Term apply</span>
          </p>
        </div>
        {/* second plan */}
        <div className='bg-gradient-to-t from-emerald-400 from-10% 
        via-teal-400 via-40% to-indigo-400 to-50% hover:shadow-xl py-6 px-8 rounded-xl'>
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
          <Link to={`/payment`} state={{ price: 14.99 }}><button className='btn text-white bg-gradient-to-r hover:from-purple-500 
          hover:to-pink-500 from-teal-500 to-orange-500 w-full rounded-full'>Get Premium Duo</button></Link>
          <p className='mt-4'>For couples who reside at the same address
            <span className='underline'> Term apply</span>
          </p>
        </div>
        {/* third plan */}
        <div className='bg-gradient-to-t from-indigo-400 from-10% 
        via-teal-400 via-40% to-emerald-400 to-50% hover:shadow-xl py-6 px-8 rounded-xl'>
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
          <Link to={`/payment`} state={{ price: 16.99 }}><button className='btn text-white bg-gradient-to-l from-purple-500 to-pink-500 
          hover:from-teal-500 hover:to-orange-500 w-full rounded-full'>Get Premium Family</button></Link>
          <p className='mt-4'>For couples who reside at the same address
            <span className='underline'> Term apply</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SubscribePlan