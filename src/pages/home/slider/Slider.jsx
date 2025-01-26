
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query'
import './slider.css'

const Slider = () => {
    const axiosPublic = useAxiosPublic()

    const { data: articleData, refetch, isPending: isArticleDataLoading } = useQuery({
        queryKey: ['articleData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all_articles`)
            return res.data;
        }
    })
    if (isArticleDataLoading) {
        return <div>Loading...</div>;
      }

    const trendingArticles = [...articleData].sort((a,b) => parseInt(b.view_count) - parseInt(a.view_count) ).slice(0,4)
    

    return (
        <div>
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                    {trendingArticles.map(article => <div key={article._id} className="carousel-slide">
                        <img src={article?.image} alt='slider-image' />
                    </div>)}
            </Carousel>
        </div>
    )
}

export default Slider