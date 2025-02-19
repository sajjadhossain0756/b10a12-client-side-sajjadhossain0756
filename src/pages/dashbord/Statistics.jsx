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
  const Borer_Alo = articleData && articleData.filter(article => article.category === 'Borer Alo') || []
  const Somoyer_Songbad = articleData && articleData.filter(article => article.category === 'Somoyer Songbad') || []
  const Protidiner_News = articleData && articleData.filter(article => article.category === 'Protidiner News') || []
  const The_Curated_Compass = articleData && articleData.filter(article => article.category === 'The Curated Compass') || []
  const Insight_Haven = articleData && articleData.filter(article => article.category === 'Insight Haven') || []
  const Echo_Chronicles = articleData && articleData.filter(article => article.category === 'Echo Chronicles') || []

  // Pie chart data;
  const data = [
    ["Publisher", "Article Number"],
    ["Borer_Alo", Borer_Alo.length],
    ["Somoyer_Songbad", Somoyer_Songbad.length],
    ["Protidiner_News", Protidiner_News.length],
    ["The_Curated_Compass", The_Curated_Compass.length],
    ["Insight_Haven", Insight_Haven.length],
    ["Echo_Chronicles", Echo_Chronicles.length],
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
      <h2 className='text-2xl dark:text-white my-4 font-semibold text-center'>Hi, Welcome Back {user?.displayName}</h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center 
      items-center gap-4 my-6 px-6">
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
        <div className='px-6 dark:bg-gray-900'>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
          />
        </div>
        <div className='px-6'>
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