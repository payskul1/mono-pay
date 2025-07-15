import React, { useState, useEffect } from 'react'
import { CheckCircle, Sparkles, ArrowRight, Home, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const SuccessPage = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    setTimeout(() => setShowConfetti(true), 500)
  }, [])

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 opacity-70 animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: Math.random() > 0.5 ? '#8B5CF6' : '#3B82F6',
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      {showConfetti && <Confetti />}
      
      <div className={`max-w-2xl w-full text-center transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        
        {/* Main Success Icon */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-2xl animate-bounce">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <div className="absolute -top-4 -right-4 animate-spin">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Success!
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your action has been completed successfully
          </p>
          <p className="text-gray-500">
            Everything went smoothly and your request has been processed.
          </p>
        </div>

        {/* Success Details Card */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-purple-100 mb-8 transform hover:scale-105 transition-transform duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Completed</h3>
              <p className="text-sm text-gray-600">Process finished</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Verified</h3>
              <p className="text-sm text-gray-600">All checks passed</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Ready</h3>
              <p className="text-sm text-gray-600">Available now</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-4 justify-center">
          <button className="group bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <span className="flex items-center justify-center gap-2">
              <a href='https://payskul.com/'>Continue</a>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="group bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-200">
            <span className="flex items-center justify-center gap-2">
              <Home className="w-5 h-5" />
              <Link to='/'> Go Home</Link>
            </span>
          </button>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Need help? <span className="text-purple-600 hover:text-purple-700 cursor-pointer underline"> <a href='https://payskul.com/contact'>Contact support</a></span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed bottom-10 right-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="fixed top-1/2 left-5 w-12 h-12 bg-purple-300 rounded-full opacity-10 animate-bounce"></div>
      <div className="fixed top-1/4 right-20 w-8 h-8 bg-blue-300 rounded-full opacity-15 animate-pulse"></div>
    </div>
  )
}

export default SuccessPage;