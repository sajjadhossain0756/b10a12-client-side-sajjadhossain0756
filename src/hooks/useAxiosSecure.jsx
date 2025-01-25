import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "./useAuth"

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:7003'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { signOutUser } = useAuth()
    // request interceptors to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors')
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
        // console.log('Error',error)
    })
    axios.interceptors.response.use(async(response) => {
        return response;
    }, async (error) => {
        console.log(error.response)
        const status = error.response?.status;
        console.log('status error in the interceptor', error)
        console.log('hello')
        if (status === 401 || status === 403) {
            try {
                await signOutUser()
                navigate('/login')
            }catch(error){
                console.error('Error during sign-out:', logoutError);
            }
        }
        return Promise.reject(error);
    });
    return axiosSecure;
}

export default useAxiosSecure