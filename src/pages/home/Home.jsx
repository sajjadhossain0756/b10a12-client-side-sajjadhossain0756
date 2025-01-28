import React from 'react'
import Slider from '../home/slider/Slider'
import SubscribePlan from '../../components/SubscribePlan'
import AllPublisher from './AllPublisher'

const Home = () => {
  return (
    <div>
        <Slider></Slider>
        <AllPublisher></AllPublisher>
        <SubscribePlan></SubscribePlan>
    </div>
  )
}

export default Home