import React from 'react'
import bannar from '../../assets/subscribe.jpg'
import SubscribePlan from '../../components/SubscribePlan'

const Subscription = () => {
    return (
        <div >
            <div
                className="hero h-[400px]"
                style={{
                    backgroundImage: `url(${bannar})`,
                }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Subscribe Our Channel</h1>
                    </div>
                </div>
            </div>
            <div className='bg-pink-400 dark:bg-gray-800 dark:text-white'>
                <h2 className='text-3xl text-center pt-6 font-bold'>Choose Your Plan</h2>
                <SubscribePlan></SubscribePlan>
            </div>
        </div>
    )
}

export default Subscription