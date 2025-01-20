import React from 'react'
import useArticleData from '../../hooks/useArticleData'
import { format } from "date-fns";

const AllArticle = () => {
  const [articleData] = useArticleData()

  return (
    <div>
      <h2 className='text-center text-3xl font-semibold'>All Articles: {articleData?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
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
                <td>{article?.title.substring(1,30)}....</td>
                <td>{article?.category}</td>
                <td>{format(new Date(article?.postedDate),"PPP p")}</td>
                <td>{article?.status}</td>
                <td>
                    <button className='border p-1 bg-green-400 w-24'>Approve</button>
                    <button className='border p-1 bg-red-400 w-24'>Decline</button>
                    <button className='border p-1 bg-green-400 w-24'>Premium</button>
                    <button className='border p-1 bg-red-400 w-24'>Delete</button>
                </td>
                {/* <td>
                  {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn bg-orange-400 text-white' >
                    Make Admin
                  </button>}

                </td> */}
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllArticle