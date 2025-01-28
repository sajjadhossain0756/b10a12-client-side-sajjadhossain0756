import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import CheckoutForm from '../pages/home/CheckoutForm'


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key)
const Payments = () => {
  
  return (
    <div>
      <h2 className='text-3xl font-bold text-center my-3'>Make Payment By Your Card</h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
    </div>
  )
}

export default Payments