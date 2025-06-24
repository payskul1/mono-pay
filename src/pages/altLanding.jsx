import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Zap, Users, CheckCircle, Star, Menu, X, CreditCard, Smartphone, Globe } from 'lucide-react';

export default function PayskulLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Bank-Grade Security",
      description: "Advanced encryption and security protocols to protect every transaction"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Process payments in milliseconds with our optimized infrastructure"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-User Support",
      description: "Seamlessly handle multiple users and accounts with ease"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Reach",
      description: "Accept payments from anywhere in the world, in any currency"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechCorp",
      content: "Payskul's mono integration transformed our payment processing. Setup took minutes, not weeks.",
      rating: 5
    },
    {
      name: "Michael Roberts",
      role: "Founder, StartupX",
      content: "The security and speed are unmatched. Our customers love the seamless experience.",
      rating: 5
    },
    {
      name: "Aisha Patel",
      role: "Product Manager, FinanceApp",
      content: "Best integration experience we've had. Documentation is crystal clear.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Payskul
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#integration" className="hover:text-purple-400 transition-colors">Integration</a>
              <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
              <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            </div>

            <div className="hidden md:flex space-x-4">
              <button className="px-4 py-2 text-purple-400 hover:text-white transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Get Started
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
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 hover:text-purple-400">Features</a>
              <a href="#integration" className="block px-3 py-2 hover:text-purple-400">Integration</a>
              <a href="#testimonials" className="block px-3 py-2 hover:text-purple-400">Testimonials</a>
              <a href="#pricing" className="block px-3 py-2 hover:text-purple-400">Pricing</a>
              <div className="border-t border-gray-700 mt-2 pt-2">
                <button className="block w-full text-left px-3 py-2 text-purple-400">Sign In</button>
                <button className="block w-full text-left px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mt-2">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/30 mb-8">
              <Zap className="w-4 h-4 mr-2 text-purple-400" />
              <span className="text-sm">Now with Mono Integration</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Payment Integration
              <br />
              <span className="text-purple-400">Made Simple</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect your application to Payskul's powerful payment infrastructure with our seamless Mono integration. 
              Start processing payments in minutes, not weeks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center">
                Start Integration
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-purple-500/50 rounded-xl text-lg font-semibold hover:bg-purple-500/10 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 hidden xl:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-float">
            <CreditCard className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-sm">Secure Payments</div>
          </div>
        </div>
        
        <div className="absolute top-1/3 right-8 transform -translate-y-1/2 hidden xl:block">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 animate-float animation-delay-1000">
            <Smartphone className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-sm">Mobile Ready</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose Payskul?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for developers, trusted by enterprises. Our Mono integration brings you the best of both worlds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section id="integration" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Integration in 3 Steps
            </h2>
            <p className="text-xl text-gray-400">
              Get up and running with Payskul Mono in under 10 minutes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Install SDK",
                description: "Add our lightweight SDK to your project with a single command",
                code: "npm install @payskul/mono-sdk"
              },
              {
                step: "02", 
                title: "Configure",
                description: "Set up your API keys and configure payment options",
                code: "payskul.init({ apiKey: 'your-key' })"
              },
              {
                step: "03",
                title: "Go Live",
                description: "Start processing payments immediately with our secure infrastructure",
                code: "payskul.processPayment(amount, user)"
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                  <div className="text-6xl font-bold text-purple-400/30 mb-4">{item.step}</div>
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400 mb-6">{item.description}</p>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-green-400 border border-slate-700">
                    {item.code}
                  </div>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by Developers
            </h2>
            <p className="text-xl text-gray-400">
              Join thousands of developers who trust Payskul for their payment needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-3xl p-12 border border-purple-500/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Payments?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who've already integrated Payskul Mono. 
              Start your journey today with our comprehensive documentation and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105">
                Start Free Integration
              </button>
              <button className="px-8 py-4 border border-purple-500/50 rounded-xl text-lg font-semibold hover:bg-purple-500/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                Payskul
              </div>
              <p className="text-gray-400">
                The future of payment integration. Simple, secure, and scalable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Integration</div>
                <div>Documentation</div>
                <div>API Reference</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Community</div>
                <div>Status</div>
                <div>Security</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Payskul. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}