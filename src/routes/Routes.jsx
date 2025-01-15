import { createBrowserRouter } from 'react-router-dom'
import Error from '../pages/Error'
import Main from '../layouts/Main'
import SignUp from '../pages/auth/SignUp'
import Home from '../pages/home/Home'

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
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    }
])
