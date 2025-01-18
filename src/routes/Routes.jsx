import { createBrowserRouter } from 'react-router-dom'
import Error from '../pages/Error'
import Main from '../layouts/Main'
import SignUp from '../pages/auth/SignUp'
import Home from '../pages/home/Home'
import Login from '../pages/auth/Login'
import AllArticles from '../pages/allArticles/AllArticles'
import MyArticles from '../pages/myArticles/MyArticles'
import AddArticle from '../pages/addArticle/AddArticle'
import PrivateRoute from './PrivateRoute'
import Dashbord from '../pages/dashbord/Dashbord'
import AllUsers from '../pages/dashbord/AllUsers'
import Statistics from '../pages/dashbord/Statistics'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add-article',
                element: <PrivateRoute><AddArticle></AddArticle></PrivateRoute>
            },
            {
                path: '/all-articles',
                element: <AllArticles></AllArticles>
            },
            {
                path: '/my-articles',
                element: <MyArticles></MyArticles>
            },
            {
                path: '/dashboard',
                element: <Dashbord></Dashbord>,
                children: [
                    {
                        path: '',
                        element: <Statistics></Statistics>,
                    },
                    {
                        path: 'all-users',
                        element: <AllUsers></AllUsers>,
                    }
                ]
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])
