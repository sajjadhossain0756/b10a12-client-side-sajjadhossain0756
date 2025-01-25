import React from 'react'
import useArticleData from '../../hooks/useArticleData'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const PremiumArticle = () => {
    const [articleData] = useArticleData()

    const filterPremiumArticles = articleData && articleData.filter(article => article?.isPremium === true && article?.status !== 'declined')

    const handleDetailButton = (id) => {
        axiosSecure.patch(`/all_articles/view_count/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Increase View Count Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }).catch(error => {
                console.log('Error in view count', error.message)
                navigate('/login')
            })
    }
    const showSubscribeMassage = (e) => {
        if (!subscription) {
            e.preventDefault();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Please subscribe to view details.`,
                showConfirmButton: false,
                timer: 2500
            })
        }
    }
    const subscription = false;
    return (
        <div className='grid grid-cols-3 gap-4 my-6'>
            {filterPremiumArticles && filterPremiumArticles.map(article =>
                <div key={article._id} className="card bg-gradient-to-t from-emerald-400 from-10% 
        via-teal-400 via-40% to-indigo-400 to-50% shadow rounded-lg">
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
                        <div>
                            <Link
                                to={subscription ? `/all-articles/${article?._id}` : "#"}
                                onClick={(e) => showSubscribeMassage(e)}
                            >
                                <input onClick={() => handleDetailButton(article?._id)} className="btn disabled w-full bg-gradient-to-r from-purple-400 
              to-blue-500 hover:from-pink-500 hover:to-orange-500 " value='Details' disabled={!subscription} />

                            </Link>
                        </div>
                    </div>

                </div>)}
        </div>
    )
}

export default PremiumArticle