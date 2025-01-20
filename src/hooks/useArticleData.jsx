import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic'

const useArticleData = () => {
    const axiosPublic = useAxiosPublic()

    const { data: articleData, refetch, isPending: isArticleDataLoading } = useQuery({
        queryKey: ['articleData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all_articles`)
            return res.data;
        }
    })
    return [articleData, refetch, isArticleDataLoading]
}

export default useArticleData