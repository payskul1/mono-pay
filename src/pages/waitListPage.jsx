import React from 'react';
import { Users, GraduationCap, ArrowRight, Star, CheckCircle } from 'lucide-react';

export default function WaitlistPage() {
  const handleIndividualClick = () => {
    window.location.href = '/wait-list/individual';
  };

  const handleSchoolClick = () => {
    window.location.href = '/wait-list/forschools';
  };

  const features = [
    'Early access to premium features',
    // 'Exclusive educational content',
    'Priority customer support',
    'Special launch pricing'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 py-8">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div> */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Star className="w-10 h-10 text-yellow-400" fill="currentColor" />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Join Our 
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Waitlist</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Be among the first to experience our revolutionary educational platform. 
              Get exclusive early access and special launch benefits.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center text-green-400 text-sm">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span className="text-center">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8">
              Choose Your Path
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Individual Button */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button
                  onClick={handleIndividualClick}
                  className="relative w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        For Individuals
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        Perfect for parents, students, and individual learners looking for personalized educational solutions.
                      </p>
                    </div>
                    
                    <div className="flex items-center text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                      <span>Join Individual Waitlist</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>

              {/* School Button */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                <button
                  onClick={handleSchoolClick}
                  className="relative w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        For Schools
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        Designed for educational institutions seeking comprehensive learning management solutions.
                      </p>
                    </div>
                    
                    <div className="flex items-center text-purple-400 font-semibold group-hover:text-purple-300 transition-colors">
                      <span>Join School Waitlist</span>
                      <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-2xl  font-bold text-white mb-2">1,200+</div>
              <div className="text-gray-400 text-sm md:text-base">People Waiting</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-400 text-sm md:text-base">Schools Interested</div>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Q1 2025</div>
                <div className="text-gray-400 text-sm md:text-base">Launch Date</div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-300 text-sm">
              🚀 <strong className="text-white">Limited spots available</strong> - Join now to secure your early access and unlock exclusive benefits when we launch!
            </p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
}