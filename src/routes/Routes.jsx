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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <Error></Error>,
        children:[
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
