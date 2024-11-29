import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut, isAuthenticated, userInfo } from '../utils/auth';
import { useState, useEffect } from 'react';
import { FaShoppingCart, FaHeart, FaBars, FaRegUser, FaTimes } from 'react-icons/fa';
import { MdOutlineShoppingCart } from "react-icons/md";

const isActive = (pathname, path) => {
    return pathname === path ? { color: '#ff9900' } : { color: 'gray' };
}

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [dashboardPath, setDashboardPath] = useState('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            const { role } = userInfo();
            setDashboardPath(`/${role}/dashboard`); // Set the dashboard path based on user role
        }
    }, []);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <nav className='fixed top-0 left-0 right-0 bg-white py-4 px-4 shadow-md z-30'>
                <div className='text-center'>
                    <Link to='/' className='text-2xl font-bold hidden md:block'>Shop.Co</Link>
                </div>

                <div className='flex justify-between md:pt-6 md:px-8'>
                    <div className='pt-2'>
                        <FaBars className='text-lg md:hidden cursor-pointer' onClick={toggleDrawer} />
                        <p className='hidden md:block'>usd</p>
                    </div>

                    <div className='md:pt-2'>
                        <ul className='hidden md:flex'>
                            <li className='ml-8'><Link to='/shop' style={isActive(location.pathname, '/shop')}>Shop</Link></li>
                            {isAuthenticated() && (<li className='ml-4'><Link to={dashboardPath} style={isActive(location.pathname, dashboardPath)}>Dashboard</Link></li> )}
                            <li className='ml-4'><Link to='/contact' style={isActive(location.pathname,'/contact')}>Contact</Link></li>
                        </ul>

                        <div>
                            <Link to='/' className='text-2xl font-bold md:hidden'>Shop.Co</Link>
                        </div>
                    </div>

                    <div className='pt-2'>
                        <ul className='flex'>
                            <li><Link to='/cart' style={isActive(location.pathname, '/cart')}><MdOutlineShoppingCart  className='text-xl text-black mr-1'/></Link></li>
                            <li><Link to='/wishlist' style={isActive(location.pathname, '/wishlist')}><FaHeart className='text-lg text-red-600 md:mr-1.5'/></Link></li>
                            <li className='relative'>
                                <FaRegUser className='cursor-pointer hidden md:block' onClick={toggleDropdown} />
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                                                                                {isAuthenticated() && (                                         <ul>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to={dashboardPath}
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <span
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        signOut(() => {
                                                            navigate('/login', { replace: true });
                                                            setIsDropdownOpen(false);
                                                        });
                                                    }}>
                                                    Log Out
                                                </span>
                                            </li>
                                        </ul> )}

                                        
                                        {!isAuthenticated() && (                                         <ul>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to='/login'
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to='/register'
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Register
                                                </Link>
                                            </li>
                                        </ul> )}
                                    </div>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Drawer */}
            {isDrawerOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-start">
                    <div className="bg-white w-64 h-full shadow-lg p-4">
                        <button onClick={toggleDrawer} className="text-gray-600 hover:text-gray-900">
                            <FaTimes/>
                        </button>
                        <ul className="mt-4">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to='/'
                                    style={isActive(location.pathname, '/')}
                                    onClick={closeDrawer}>
                                    Home
                                </Link>
                            </li>

                             <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to='/shop'
                                    style={isActive(location.pathname, '/shop')}
                                    onClick={closeDrawer}>
                                    Shop
                                </Link>
                            </li>
                            {isAuthenticated() && (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to={dashboardPath}
                                            style={isActive(location.pathname, dashboardPath)}
                                            onClick={closeDrawer}>
                                            Dashboard
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className="absolute bottom-0 left-0 w-full p-4">
                            <ul>
                                <li className="nav-item mb-2">
                                    <div className='flex'>
                                    <FaShoppingCart className="text-xl mr-2" />
                                    <Link
                                        className=""
                                        to='/cart'
                                        style={isActive(location.pathname, '/cart')}
                                        onClick={closeDrawer}>
                                        Cart
                                    </Link>
                                    </div>
                                </li>

                             <li className='relative'>
                                <div className='flex'>
                                <FaRegUser className='cursor-pointer text-xl mr-2' onClick={toggleDropdown} />
                                <strong className='text-sm'>{isAuthenticated() ? userInfo().name : 'Account'}</strong>
                                </div>
                                {isDropdownOpen && (
                                    <div className="absolute bottom-0 left-5 w-48 bg-white border border-gray-200 rounded shadow-lg">

                                        {isAuthenticated() && (                                         <ul>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to={dashboardPath}
                                                    onClick={() => {
                                                        setIsDropdownOpen(false);
                                                        closeDrawer();
                                                    }}>
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <span
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => {
                                                        signOut(() => {
                                                            navigate('/login', { replace: true });
                                                            setIsDropdownOpen(false);
                                                            closeDrawer();
                                                        });
                                                    }}>
                                                    Log Out
                                                </span>
                                            </li>
                                        </ul> )}

                                        
                                        {!isAuthenticated() && (                                         <ul>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to='/login'
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                                    to='/register'
                                                    onClick={() => setIsDropdownOpen(false)}>
                                                    Register
                                                </Link>
                                            </li>
                                        </ul> )}
                                    </div>
                                )}
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Menu;