import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'

const useArticleData = () => {
    const axiosPublic = useAxiosPublic()

    const { data: articleData, isPending: isArticleDataLoading } = useQuery({
        queryKey: ['articleData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all_articles`)
            return res.data;
        }
    })
    return [articleData, isArticleDataLoading]
}

export default useArticleData