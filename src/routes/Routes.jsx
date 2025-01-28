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
import AllArticle from '../pages/dashbord/AllArticle'
import AddPublisher from '../pages/dashbord/AddPublisher'
import AdminRoute from './AdminRoute'
import ArticlesDetail from '../components/ArticlesDetail'
import UpdateArticles from '../components/UpdateArticles'
import MyProfile from '../pages/myProfile/MyProfile'
import PremiumArticle from '../pages/premiumArticle/PremiumArticle'
import Subscription from '../pages/home/Subscription'
import Payments from '../components/Payments'

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
                element: <AllArticles></AllArticles>,
                loader: () => fetch(`https://b10a12-server-side-sajjadhossain0756.vercel.app/admin-stats`)
            },
            {
                path: '/all-articles/:id',
                element: <ArticlesDetail></ArticlesDetail>
            },
            {
                path: '/my-articles/update/:id',
                element: <UpdateArticles></UpdateArticles>
            },
            {
                path: '/my-articles',
                element: <MyArticles></MyArticles>
            },
            {
                path: '/premium-articles',
                element: <PremiumArticle></PremiumArticle>
            },
            {
                path: '/subscription',
                element: <Subscription></Subscription>
            },
            {
                path: '/payment',
                element: <Payments></Payments>
            },
            {
                path: '/my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: '/dashboard',
                element: <Dashbord></Dashbord>,
                children: [
                    {
                        path: '',
                        element: <AdminRoute><Statistics></Statistics></AdminRoute>,
                    },
                    {
                        path: 'all-users',
                        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
                    },
                    {
                        path: 'all-articles',
                        element: <AdminRoute><AllArticle></AllArticle></AdminRoute>,
                    },
                    {
                        path: 'add-publisher',
                        element: <AdminRoute><AddPublisher></AddPublisher></AdminRoute>,
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
