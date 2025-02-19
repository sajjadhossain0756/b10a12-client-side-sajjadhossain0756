import React from 'react'
import useArticleData from '../../hooks/useArticleData'
import { format } from "date-fns";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllArticle = () => {
  const [articleData, refetch] = useArticleData()
  const axiosSecure = useAxiosSecure()

  // approve article
  const handleApproveArticle = (article) => {
    axiosSecure.patch(`/all_articles/approve/${article._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${article?.title} is Approved`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  // decline article
  const handleDeclineArticle = (article) => {
    axiosSecure.patch(`/all_articles/decline/${article._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${article?.title} is Declined`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  // make premium article
  const handlePremiumArticle = (article) => {
    axiosSecure.patch(`/all_articles/premium/${article._id}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${article?.title} has been Premium`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  // delete article from db
  const handleDeleteArticle = (article) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/all_articles/${article?._id}`)
            .then(res => {
              console.log(res.data)
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                refetch()
              }
            })
        } catch (err) {
          Swal.fire('Error', err.message)
        }
      }

    });
  }


  return (
    <div>
      <h2 className='text-center text-3xl font-semibold dark:text-white'>All Articles: {articleData?.length}</h2>
      <div className="overflow-x-auto hidden lg:block dark:text-white">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='dark:text-white'>
              <th></th>
              <th>Author Image</th>
              <th>Author Name</th>
              <th>Author Email</th>
              <th>Title</th>
              <th>Publisher</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {articleData && articleData.map((article, indx) => {
              return <tr key={article._id}>
                <th>{indx + 1}</th>
                <td><img src={article?.authorPhoto} alt="profile" className='h-12 w-12 rounded-full' /></td>
                <td>{article?.authorName}</td>
                <td>{article?.authorEmail}</td>
                <td>{article?.title.substring(0, 30)}....</td>
                <td>{article?.category}</td>
                <td>{format(new Date(article?.postedDate), "PPP p")}</td>
                <td>{article?.status}</td>
                <td>
                  <button onClick={() => { handleApproveArticle(article) }} className='border p-1 bg-green-400 w-24'>Approve</button>
                  <button onClick={() => { handleDeclineArticle(article) }} className='border p-1 bg-red-400 w-24'>Decline</button>
                  <button onClick={() => { handlePremiumArticle(article) }} className='border p-1 bg-green-400 w-24'>Premium</button>
                  <button onClick={() => { handleDeleteArticle(article) }} className='border p-1 bg-red-400 w-24'>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      {/* styles for mobile device */}
      <div className='block lg:hidden'>
        {articleData && articleData.map((article, indx) => {
          return <div key={article._id} className='bg-pink-300 m-4 rounded-lg'>
            <div className='flex flex-col gap-2 items-center  p-4'>
              <img src={article?.authorPhoto} alt={article?.authorName} className='h-12 w-12 rounded-full' />
              <p className='font-semibold'>Name: {article.authorName}</p>
              <p className='font-semibold'>Email: {article.authorEmail}</p>
              <p className='font-semibold'>Title: {article?.title.substring(0, 30)}....</p>
              <p className='font-semibold'>Category: {article?.category}</p>
              <p className='font-semibold'>Posted Date: {format(new Date(article?.postedDate), "PPP p")}</p>
              <p className='font-semibold'>Status: {article?.status}</p>
              <div className='grid grid-cols-2 gap-2'>
                <button onClick={() => { handleApproveArticle(article) }} className='border p-1 bg-green-400 w-24'>Approve</button>
                <button onClick={() => { handleDeclineArticle(article) }} className='border p-1 bg-red-400 w-24'>Decline</button>
                <button onClick={() => { handlePremiumArticle(article) }} className='border p-1 bg-green-400 w-24'>Premium</button>
                <button onClick={() => { handleDeleteArticle(article) }} className='border p-1 bg-red-400 w-24'>Delete</button>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default AllArticle