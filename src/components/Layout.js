import React, { Children } from 'react'
import { useEffect } from 'react'
import Menu from './Menu'
import { FaFacebook,FaInstagram,FaTwitter,FaLinkedin } from 'react-icons/fa'



const Layout = ({title='Title',className,children}) => {


    useEffect(()=>{
        document.title=title
    },[])
  return (
    <div>
        <div className='mb-20 md:mb-32'>
            <Menu/>
        </div>
        <div className={className}>
            {children}
        </div>
            <footer className=' py-8 mt-16 border-t-2 px-4'>
                <div className='flex justify-between md:px-8'>
                 <div>
                    <p className='text-sm'>&copy; {new Date().getFullYear()} All rights reserved</p>
                </div>
                <div>
                    <ul className='flex justify-center space-x-2 md:space-x-4 pt-1'>
                        <li>
                            <a href='https://www.facebook.com'><FaFacebook/></a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com'><FaInstagram/></a>
                        </li>
                        <li>
                            <a href='https://www.twitter.com'><FaTwitter/></a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com'><FaLinkedin/></a>
                        </li>
                    </ul>     

                </div>
                </div>
            
            </footer>
        </div>
  )
}

export default Layout