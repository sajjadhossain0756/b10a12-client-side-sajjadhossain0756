import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAxiosPublic from '../../hooks/useAxiosPublic'
import useArticleData from '../../hooks/useArticleData'

const AllArticles = () => {
  const {articles:totalArticles} = useLoaderData()
  const [refetch] = useArticleData()
  const [article, setArticle] = useState([])
  const [search, setSearch] = useState('')
  const [publisher,setPublisher] = useState('')
  const [currentPage,setCurrentPage] = useState(0)
  const articlePerPage = 6;
  const numberOfPage = Math.ceil(totalArticles/articlePerPage)

  const pages = [...Array(numberOfPage).keys()]

  
  console.log(totalArticles,numberOfPage,pages,currentPage)

  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()

  useEffect(() => {
    try {
      axiosPublic.get(`/all_articles?search=${search}&publisher=${publisher}&page=${currentPage}&size=${articlePerPage}`)
        .then(res => {
          console.log(res.data)
          setArticle(res.data)
        })
    } catch (err) {
      Swal.fire('Error', err.message)

    }
  }, [search,publisher,currentPage,articlePerPage])

  const filterApprovedArticles = article && article.filter(article => article?.status === 'approved' && article?.isPremium === false)
  const filterPremiumArticles = article && article.filter(article => article?.isPremium === true && article?.status !== 'declined')

  const handleDetailButton = (id) => {
    axiosSecure.patch(`/all_articles/view_count/${id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          // refetch()
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
  console.log(publisher)
  const subscription = true;
  return (
    <div>
      <div className='flex gap-2 items-center justify-center mt-4'>
        <select 
        name='publisher' 
        id='publisher' 
        className="select select-primary "
        onChange={e => setPublisher(e.target.value)}
        >
          <option disabled selected value=''>Filter By Publisher</option>
          <option value='google'>google</option>
          <option value='facebook'>facebook</option>
          <option value='Protom Alo'>Protom Alo</option>
          <option value='youtube'>youtube</option>
        </select>
        <div>
          <input
            type="text"
            placeholder="Search By Title Name"
            onChange={e => { setSearch(e.target.value) }}
            className="input input-bordered input-primary " />
        </div>
      </div>

      {/* card section start here */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 my-6'>
        {filterApprovedArticles && filterApprovedArticles.map(article =>
          <div className="card bg-gradient-to-t from-indigo-400 from-10% 
        via-teal-400 via-40% to-emerald-400 to-50% shadow rounded-lg p-4">
            <figure className="p-4">
              <img
                src={article?.image}
                alt="Shoes"
                className="rounded h-[230px] w-full" />
            </figure>
            <div className="p-4 space-y-3">
              <h2 className="card-title">{article?.title}</h2>
              <p className='font-semibold'>Publisher: {article?.category}</p>
              <p className='font-semibold'>Tags: {article?.tags.map((tag,indx) => <span key={indx}>{tag.value}</span>)}</p>
              <p >{article?.description.substring(0, 70)}</p>
              <div className="">
                <Link to={`/all-articles/${article?._id}`}><button onClick={() => handleDetailButton(article?._id)} className="btn w-full bg-gradient-to-r hover:from-purple-400 
              hover:to-blue-500 from-teal-400 to-orange-500 ">Details</button></Link>
              </div>
            </div>
          </div>)}
        {/* premium article card */}
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
              <p className='font-semibold'>Tags: {article?.tags.map((tag,indx) => <span key={indx}>{tag.value}</span>)}</p>
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

      {/* pagination section start here */}
      <div className='flex justify-center gap-2'>
          <p onClick={()=>{if(currentPage > 0){setCurrentPage(currentPage - 1)}}} className="btn">Prev</p>
          {pages?.map((page,indx) => 
          <span key={indx} 
          className={`btn ${currentPage === page ? 'bg-orange-400' : undefined}`} 
          onClick={()=>setCurrentPage(page)}
          >{page}</span>)}
          <p onClick={()=>{if(currentPage < pages.length - 1){setCurrentPage(currentPage + 1)}}} className="btn">Next</p>
      </div>
    </div>
  )
}

export default AllArticles