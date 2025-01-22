import React from 'react'
import { useParams } from 'react-router-dom'
import useArticleData from '../hooks/useArticleData';

const ArticlesDetail = () => {
    const { id } = useParams()
    const [articleData] = useArticleData()

    const filterArticle = articleData?.find(article => article._id === id) || []
    console.log(filterArticle);
    const { title, image, description, category } = filterArticle
    return (
        <div className="hero">
            <div className="hero-content bg-gradient-to-tl from-emerald-400 from-10% 
        via-teal-400 via-40% to-pink-300 to-50% dark:bg-gray-700 flex-col lg:flex-row-reverse 
          my-4 rounded-lg gap-10">
                <figure className='flex-1'>
                    <img
                        src={image}
                        className="w-full rounded-lg h-[450px] object-cover" />
                </figure>
                <div className='flex-1 dark:text-gray-300'>
                    <h1 className="text-4xl font-bold pb-3">{title}</h1>
                    <p className="py-6">
                        {description}
                    </p>
                    <div className='flex gap-28 font-semibold py-3'>
                        {/* <p>Type: {type}</p> */}
                        <p>Publisher: {category}</p>
                    </div>
                    <div className='space-y-3 font-semibold'>
                        {/* <p>Posted Date: {date}</p>
                        <p>Name: {displayName}</p>
                        <p>Email: {userEmail}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticlesDetail