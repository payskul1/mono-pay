import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-1000"></div>
            </div>

            {/* Navigation */}
            <nav className="sticky top-0 left-0 z-10 w-full bg-primary px-6 py-6 sm:px-8 sm:py-6 lg:px-10 lg:py-6">

                {/* <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-blue-900/95 backdrop-blur-md' : 'bg-transparent'}`}> */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center py-4 justify-between">
                        <div className="flex items-center">
                            {/* <GraduationCap className="w-8 h-8 text-blue-400 mr-2" /> */}
                            <img src='icon.png' className='w-10 h-10' />
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Payskul
                            </span>
                        </div>

                        {/* Desktop Menu
            <div className="hidden md:flex space-x-8">
              <a href="#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</a>
              <a href="#benefits" className="hover:text-blue-400 transition-colors">Benefits</a>
              <a href="#testimonials" className="hover:text-blue-400 transition-colors">Students Say</a>
              <a href="#faq" className="hover:text-blue-400 transition-colors">FAQ</a>
            </div> */}

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

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-blue-900/95 backdrop-blur-md">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* <a href="#how-it-works" className="block px-3 py-2 hover:text-blue-400">How It Works</a>
              <a href="#benefits" className="block px-3 py-2 hover:text-blue-400">Benefits</a>
              <a href="#testimonials" className="block px-3 py-2 hover:text-blue-400">Students Say</a>
              <a href="#faq" className="block px-3 py-2 hover:text-blue-400">FAQ</a> */}
                            <div className="border-t border-gray-700 mt-2 pt-2">
                                <button className="block w-full text-left px-3 py-2 text-blue-400">
                                    <a href='https://www.payskul.com' target="_blank" rel="noopener noreferrer">Sign In</a> </button>
                                <button className="block w-full text-left px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mt-2">
                                    {/* Register Now</button> */}
                                {/* <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"> */}
                                    <Link to='/school'>
                                        Register Now
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    )
}

export default Header
