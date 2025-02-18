import { Link } from 'react-router-dom'
import footerImg from '../assets/logo.jpg'
import { FaFacebookF, FaFacebookSquare, FaLinkedin, FaLinkedinIn } from 'react-icons/fa'
import { FaSquareGithub } from 'react-icons/fa6'


const Footer = () => {
    return (
        <div className='mt-8'>
            <footer className="footer bg-gradient-to-r from-pink-500 to-purple-500 text-neutral-content p-10">
                <aside>
                    <img src={footerImg} alt="" className='w-20 rounded-full h-20 object-cover' />
                    <p>
                        <span className='font-bold text-xl'>Pulse of the Nation</span>
                        <br />
                        Providing reliable & Authentic tech since 1971
                    </p>
                </aside>
                <nav>
                    <h6 className="text-2xl font-semibold">Services</h6>
                    <Link to='/all-articles' className="link link-hover">All Article</Link>
                    <Link to='/subscription' className="link link-hover">Subscription</Link>
                    <Link to='/my-articles' className="link link-hover">My Article</Link>
                    <Link to='/add-article' className="link link-hover">Add Article</Link>
                </nav>
                <nav>
                    <h2 className='text-3xl font-bold'>Follow Us</h2>
                    <p>Join us on social media</p>

                    <div className="grid grid-flow-col gap-4">
                        <a href='https://github.com/sajjadhossain0756' target='_blank'>
                            <FaSquareGithub className='text-3xl'></FaSquareGithub>
                        </a>
                        <a href='https://www.linkedin.com/in/sajjad56/' target='_blank'>
                            <FaLinkedin className='text-3xl'></FaLinkedin>
                        </a>
                        <a href='https://web.facebook.com/profile.php?id=100025394227619' target='_blank'>
                            <FaFacebookSquare className='text-3xl'></FaFacebookSquare>
                        </a>
                    </div>
                </nav>
            </footer>
            <div className="footer bg-black/90  footer-center text-white p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Pulse of the Nation</p>
                </aside>
            </div>
        </div>
    )
}

export default Footer