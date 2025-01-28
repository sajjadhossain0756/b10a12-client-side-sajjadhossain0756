import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const CheckoutForm = () => {
  const [error, setError] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const stripe = useStripe();
  const elements = useElements()
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const location = useLocation()
  const totalPrice = location.state.price;
  console.log(totalPrice)

  useEffect(() => {
    axiosSecure.post('/create-payment-intent', { price: totalPrice })
      .then(res => {
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret)
      })
  }, [axiosSecure, totalPrice])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement)

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log('payment error', error)
      setError(error.message)
    }
    else {
      console.log('payment method', paymentMethod)
      setError('')
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'
        }
      }
    })

    if (confirmError) {
      console.log('confirm error', confirmError.message)
    }
    else {
      console.log('paymen intent', paymentIntent)
      if (paymentIntent.status === 'succeeded') {
        axiosSecure.patch(`/all_users/premium/${user.email}`)
        .then(res =>{
           console.log(res.data)
        }).catch(error =>{
          console.log('premiumTaken Error',error.message)
        })
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Payment has been Successful",
          showConfirmButton: false,
          timer: 1500
        });
        setTransactionId(paymentIntent.id)
      }
    }
  }
  return (
    <div className='flex justify-center items-center'>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="p-3 border rounded-md w-[400px]"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button type='submit' className='btn my-4 bg-green-300' disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className='text-red-500'>{error}</p>
        {transactionId && <p className='text-green-500'>Your transaction Id: {transactionId}</p>}
      </form>

    </div>
  )
}

export default CheckoutForm