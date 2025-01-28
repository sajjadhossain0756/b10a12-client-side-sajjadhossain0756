import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const usePremium = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isPremium, isPending: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all_users/premium/${user?.email}`)
            return res.data?.premium;
        }
    })
    return [isPremium,isPremiumLoading]
}

export default usePremium