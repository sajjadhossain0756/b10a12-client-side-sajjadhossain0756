import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaBook, FaBookOpen, FaList, FaPortrait, FaRegIdCard, FaUsers } from 'react-icons/fa'
import useArticleData from '../../hooks/useArticleData'
import Chart from 'react-google-charts'

const Statistics = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [articleData] = useArticleData()

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  })
  const premiumArticles = articleData && articleData.filter(article => article?.isPremium === true && article?.status !== 'declined') || []

  // publication/category based article Number;
  const google = articleData && articleData.filter(article => article.category === 'google') || []
  const facebook = articleData && articleData.filter(article => article.category === 'facebook') || []
  const Protom_Alo = articleData && articleData.filter(article => article.category === 'Protom Alo') || []
  const youtube = articleData && articleData.filter(article => article.category === 'youtube') || []

  // Pie chart data;
  const data = [
    ["Publisher", "Article Number"],
    ["google", google.length],
    ["facebook", facebook.length],
    ["Protom Alo", Protom_Alo.length],
    ["youtube", youtube.length],
  ];

  const options = {
    title: "Publisher Based Articles Number",
  };

  // column chart data;
  const data1 = [
    ["stats", "Number", { role: "style" }],
    ["Users", stats?.users, "#b87333"], // RGB value
    ["Articles", stats?.articles, "silver"], // English color name
    ["Publishers", stats?.publishers, "gold"],
    ["Premium Articles", premiumArticles?.length, "color: #e5e4e2"], // CSS-style declaration
  ];

  return (
    <div>
      <h2 className='text-2xl font-semibold'>Hi, Welcome Back {user?.displayName}</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4 my-6">
        <div className="stat mx-auto w-[250px] md:w-full flex flex-col items-center bg-pink-400">
          <span><FaUsers className='text-5xl'></FaUsers></span>
          <div className="stat-title text-xl font-semibold">Total Users</div>
          <div className="stat-value">{stats?.users}</div>
        </div>

        <div className="stat mx-auto w-[250px] md:w-full flex flex-col items-center bg-green-400">
          <span><FaBookOpen className='text-5xl'></FaBookOpen></span>
          <div className="stat-title text-xl font-semibold">Total Articles</div>
          <div className="stat-value">{stats?.articles}</div>
        </div>

        <div className="stat mx-auto w-[250px] md:w-full flex flex-col items-center bg-orange-400">
          <span><FaRegIdCard className='text-5xl'></FaRegIdCard></span>
          <div className="stat-title text-xl font-semibold">Premium Articles</div>
          <div className="stat-value">{premiumArticles?.length}</div>
        </div>

        <div className="stat mx-auto w-[250px] md:w-full flex flex-col items-center bg-purple-400">
          <span><FaPortrait className='text-5xl'></FaPortrait></span>
          <div className="stat-title text-xl font-semibold">Total Publishers</div>
          <div className="stat-value">{stats?.publishers}</div>
        </div>
      </div>
      <div>
        <div>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div>
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="100%"
            
            data={data1} />
        </div>
      </div>
    </div>
  )
}

export default Statistics