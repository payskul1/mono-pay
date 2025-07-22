import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    // const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-1000"></div> */}
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 left-0 z-10 w-full bg-primary px-6 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6">

                {/* <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-blue-900/95 backdrop-blur-md' : 'bg-transparent'}`}> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center py-4 justify-between">
                        <div className="flex items-center">
                            {/* <GraduationCap className="w-8 h-8 text-blue-400 mr-2" /> */}
                            <Link to='https://www.payskul.com/'>
                                <img src='/images/icon.png' className='w-10 h-10' />
                            </Link>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Payskul
                            </span>
                        </div>

                        <div className="hidden md:flex space-x-4">
                            <button className="px-4 py-2 text-blue-400 hover:text-blue-700 transition-colors">
                                <a href='https://www.payskul.com' target="_blank" rel="noopener noreferrer">Sign In</a>

                            </button>
                            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                                <Link to='/school'>
                                    Register Now
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
