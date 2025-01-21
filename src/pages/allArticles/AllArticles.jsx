import React from 'react'
import useArticleData from '../../hooks/useArticleData'

const AllArticles = () => {
  const [articleData] = useArticleData()
  console.log(articleData)
  const filterApprovedArticles = articleData && articleData.filter(article => article?.status === 'approved' && article?.isPremium === false)
  const filterPremiumArticles = articleData && articleData.filter(article => article?.isPremium === true && article?.status !== 'declined')
  
  const subscription = false;
  return (
    <div className='grid grid-cols-3 gap-4 my-6'>
      {filterApprovedArticles && filterApprovedArticles.map(article =>
        <div className="card bg-gradient-to-t from-indigo-400 from-10% 
        via-teal-400 via-40% to-emerald-400 to-50% shadow rounded-lg">
          <figure className="p-4">
            <img
              src={article?.image}
              alt="Shoes"
              className="rounded h-[230px] w-full" />
          </figure>
          <div className="p-4 space-y-3">
            <h2 className="card-title">{article?.title}</h2>
            <p className='font-semibold'>Publisher: {article?.category}</p>
            <p>{article?.description.substring(0, 70)}</p>
            <div className="">
              <button className="btn w-full bg-gradient-to-r hover:from-purple-400 hover:to-blue-500 from-teal-400 to-orange-500 ">Details</button>
            </div>
          </div>
        </div>)}
      {/* premium article card */}
      {filterPremiumArticles && filterPremiumArticles.map(article =>
        <div key={article._id} className="card bg-gradient-to-t from-emerald-400 from-10% via-teal-400 via-40% to-indigo-400 to-50% shadow rounded-lg">
          <figure>
            <img
              src={article?.image}
              alt="Shoes"
              className='h-[230px] w-full object-cover m-4 rounded' />
          </figure>
          <div className="p-4 space-y-2">
            <h2 className="card-title ">
              {article?.title}
            </h2>
            <div className='flex justify-between'>
              <p className='font-semibold'>Publisher: {article?.category}</p>
              <p className="badge badge-secondary">Premium</p>
            </div>
            <p>{article?.description.substring(0, 50)}</p>
            <div className="card-actions">
              <input className="btn disabled w-full bg-gradient-to-r from-purple-400 
              to-blue-500 hover:from-pink-500 hover:to-orange-500 " value='Details' disabled={!subscription} />
            </div>
          </div>

        </div>)}
    </div>
  )
}

export default AllArticles