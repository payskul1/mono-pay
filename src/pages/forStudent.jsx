import React, { useState, useEffect } from 'react';
import { ArrowRight, GraduationCap, DollarSign, Calendar, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PayskulStudentLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Pay in Installments",
      description: "Split your school fees into manageable monthly payments that fit your budget"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Flexible Payment Plans",
      description: "Choose from multiple payment schedules designed around your financial situation"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Your payments are protected with bank-level security and encryption"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Pay Anywhere",
      description: "Make payments from your phone, computer, or any device, anytime"
    }
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-900 to-purple-900 text-white overflow-hidden">     
      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 mb-8">
              <GraduationCap className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm">Trusted by Thousands of Nigerian Students</span>
            </div>
            
            <h1 className="lg:text-5xl text-3xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-300 to-purple-300 bg-clip-text text-transparent">
              Don't Let Fees
              <br />
              <span className="text-blue-400">Stop Your Dreams</span>
            </h1>
            
            <p className="lg:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Register with Payskul and get your school fees covered with flexible payment plans. 
              Pay in installments that work for you and focus on what matters most - your education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center">
                <Link to='/school'>
                Register for Free
                </Link>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-blue-500/50 rounded-xl text-lg font-semibold hover:bg-blue-500/10 transition-all">
                <Link to='https://www.payskul.com/'>

                Learn More
                </Link>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-2 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Students Choose Payskul
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We understand student life. That's why we've built payment solutions that work for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Plans */}
      {/* <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Flexible Payment Plans
            </h2>
            <p className="text-xl text-gray-400">
              Choose the plan that works best for your situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Monthly Plan</h3>
              <div className="text-4xl font-bold mb-6">Split fees into<br /><span className="text-blue-400">12 months</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Low monthly payments</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />No collateral required</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Instant approval possible</li>
              </ul>
              <button className="w-full px-6 py-3 border border-blue-500/50 rounded-lg hover:bg-blue-500/10 transition-all">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border-2 border-blue-500/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">Semester Plan</h3>
              <div className="text-4xl font-bold mb-6">Split fees into<br /><span className="text-purple-400">2 semesters</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Pay per semester</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Lower interest rates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Priority support</li>
              </ul>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                Choose Plan
              </button>
            </div>
            

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-400">Custom Plan</h3>
              <div className="text-4xl font-bold mb-6">Create your<br /><span className="text-indigo-400">own plan</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Flexible schedule</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Work with our team</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-400 mr-3" />Special circumstances</li>
              </ul>
              <button className="w-full px-6 py-3 border border-indigo-500/50 rounded-lg hover:bg-indigo-500/10 transition-all">
                Contact Us
              </button>
            </div>
          </div> */}
        {/* </div>
      </section> */}

      {/* Testimonials */}
      {/* <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Students Say
            </h2>
            <p className="text-xl text-gray-400">
              Real stories from students who achieved their dreams with Payskul
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.course}</div>
                    <div className="text-gray-500 text-xs">{testimonial.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-3xl lg:p-12 border border-blue-500/20">
            <GraduationCap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Education Shouldn't Wait
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Don't let financial constraints stop you from pursuing your dreams. 
              Join thousands of students who are already on their path to success with Payskul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px- py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 cursor-default">
                <Link to='/school'>
                Register Now - It's Free
                </Link>
              </button>
              <button className="px-6 py-4 border border-blue-500/50 rounded-xl text-lg font-semibold hover:bg-blue-500/10 transition-all cursor-default">
                <a href='https://payskul.ng/contact' target='blank'>Speak to Our Team</a>
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Registration takes less than 5 minutes. No hidden fees.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {/* <div className="grid md:grid-cols-4 gap-8"> */}
            <div className='flex flex-col gap-12'>
              <div className="flex items-center mb-4">
                {/* <GraduationCap className="w-8 h-8 text-blue-400 mr-2" /> */}
                <Link to='https://www.payskul.com/'>
                <img src='icon.png' className='w-10 h-10'/>
                </Link>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Payskul
                </span>
              </div>
              <p className="text-gray-400">
                Empowering Nigerian students to achieve their educational dreams through flexible payment solutions.
              </p>
            </div>
            {/* <div>
              <h4 className="font-semibold mb-4">For Students</h4>
              <div className="space-y-2 text-gray-400">
                <div>How It Works</div>
                <div>Payment Plans</div>
                <div>Apply Now</div>
                <div>Student Portal</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>WhatsApp Support</div>
                <div>FAQ</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Partner Schools</div>
                <div>Careers</div>
                <div>Blog</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400"> */}
            <p className='pt-10'>&copy; 2025 Payskul. All rights reserved. | Empowering Nigerian Students</p>
          </div>
        {/* </div> */}
      </footer>

      {/* <style jsx>{`
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
      `}</style> */}
    </div>
  );
}