import React from 'react'
import useArticleData from '../../hooks/useArticleData'
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const MyArticles = () => {
  const { user } = useAuth()
  const [articleData, refetch] = useArticleData()
  const axiosSecure = useAxiosSecure()

  const filterByEmail = articleData && articleData.filter(article => article?.authorEmail === user?.email)
  console.log(filterByEmail)
 

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
        } catch(err){
            Swal.fire('Error',err.message)
        }
      }

    });
  }

  return (
    <div className='my-10'>
      <h2 className='text-center text-3xl mb-6 dark:text-white font-semibold'>My Articles: {filterByEmail?.length}</h2>
      <div className="overflow-x-auto dark:text-white">
        <table className="table">
          {/* head */}
          <thead>
            <tr className='dark:text-white'>
              <th></th>
              <th>Title</th>
              <th>Status</th>
              <th>IsPremium</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filterByEmail && filterByEmail.map((article, indx) => {
              return <tr key={article?._id}>
                <th>{indx + 1}</th>

                <td>{article?.title.substring(0, 40)}....</td>
                <td>{article?.status}</td>
                <td>{article?.isPremium ? 'Yes' : 'No'}</td>
                <td>
                  <Link to={`/all-articles/${article?._id}`}><button className='border p-1 
                  bg-orange-400 w-24'>Details</button></Link>
                  <Link to={`/my-articles/update/${article?._id}`}><button className='border p-1 
                  bg-green-400 w-24'>Update</button></Link>
                  <button onClick={() => { handleDeleteArticle(article) }} className='border p-1 
                  bg-red-400 w-24'>Delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyArticles