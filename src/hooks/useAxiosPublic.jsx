import axios from "axios"

export const axiosPublic = axios.create({
    baseURL: 'http://localhost:6001'
})

const useAxiosPublic = () => {
  return axiosPublic;
}

export default useAxiosPublic