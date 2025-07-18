import React, { useState } from 'react';
import { Users, School, Phone, Mail, MapPin, DollarSign, Calendar, GraduationCap, CheckCircle } from 'lucide-react';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    // Contact Information
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: '',
    
    // School/Organization Details
    schoolName: '',
    schoolType: '',
    schoolAddress: '',
    schoolCity: '',
    schoolState: '',
    schoolZip: '',
    schoolWebsite: '',
    
    // Student Information
    totalStudents: '',
    ageGroups: [],
    newStudentsPerYear: '',
    
    // Program Details
    programInterest: '',
    startDate: '',
    currentProvider: '',
    
    // Budget Information
    // budgetRange: '',
    // paymentFrequency: '',
    
    // Additional Information
    specificNeeds: '',
    marketingSource: '',
    additionalComments: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    const requiredFields = ['contactName', 'contactEmail', 'contactPhone', 'contactRole', 'schoolName', 'schoolType', 'schoolAddress', 'schoolCity', 'schoolState', 'schoolZip', 'totalStudents', 'programInterest', 'budgetRange'];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert('Please fill in all required fields marked with *');
      return;
    }
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        contactName: '',
        contactEmail: '',
        contactPhone: '',
        contactRole: '',
        schoolName: '',
        schoolType: '',
        schoolAddress: '',
        schoolCity: '',
        schoolState: '',
        schoolZip: '',
        schoolWebsite: '',
        totalStudents: '',
        ageGroups: [],
        newStudentsPerYear: '',
        programInterest: '',
        startDate: '',
        currentProvider: '',
        budgetRange: '',
        paymentFrequency: '',
        specificNeeds: '',
        marketingSource: '',
        additionalComments: ''
      });
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your information has been submitted successfully. Our sales team will contact you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Waitlist</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get early access to our educational programs. Help us understand your needs and we'll tailor our services to your school.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            
            {/* Contact Information */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Phone className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Role *</label>
                  <select
                    name="contactRole"
                    value={formData.contactRole}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your role</option>
                    <option value="principal">Principal</option>
                    <option value="administrator">Administrator</option>
                    <option value="teacher">Teacher</option>
                    <option value="parent">Parent</option>
                    <option value="board_member">Board Member</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* School Information */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <School className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">School Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">School/Organization Name *</label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter school name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Type *</label>
                  <select
                    name="schoolType"
                    value={formData.schoolType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select school type</option>
                    <option value="public">Public School</option>
                    <option value="private">Private School</option>
                    <option value="charter">Charter School</option>
                    <option value="homeschool">Homeschool Group</option>
                    <option value="daycare">Daycare Center</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">School Website</label>
                  <input
                    type="url"
                    name="schoolWebsite"
                    value={formData.schoolWebsite}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://schoolwebsite.com"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                  <input
                    type="text"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter school address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <input
                    type="text"
                    name="schoolCity"
                    value={formData.schoolCity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <input
                    type="text"
                    name="schoolState"
                    value={formData.schoolState}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter state"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="schoolZip"
                    value={formData.schoolZip}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>
            </div>

            {/* Student Information */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <Users className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Student Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Number of Students *</label>
                  <input
                    type="number"
                    name="totalStudents"
                    value={formData.totalStudents}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter total students"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Students Per Year</label>
                  <input
                    type="number"
                    name="newStudentsPerYear"
                    value={formData.newStudentsPerYear}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Average new enrollments"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Age Groups (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Pre-K (3-4)', 'Kindergarten (5)', 'Elementary (6-10)', 'Middle School (11-13)', 'High School (14-18)', 'Adult Education'].map((age) => (
                      <label key={age} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="ageGroups"
                          value={age}
                          checked={formData.ageGroups.includes(age)}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{age}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Program Details */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Program Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program Interest *</label>
                  <select
                    name="programInterest"
                    value={formData.programInterest}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select program</option>
                    <option value="curriculum">Curriculum Program</option>
                    <option value="tutoring">Tutoring Services</option>
                    <option value="assessment">Assessment Tools</option>
                    <option value="teacher_training">Teacher Training</option>
                    <option value="technology">Technology Solutions</option>
                    <option value="full_service">Full Service Package</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Provider/Solution</label>
                  <input
                    type="text"
                    name="currentProvider"
                    value={formData.currentProvider}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What solution are you currently using?"
                  />
                </div>
              </div>
            </div>

            {/* Budget Information */}
            {/* <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center mb-4">
                <DollarSign className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Budget Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select budget range</option>
                    <option value="under_5k">Under $5,000</option>
                    <option value="5k_15k">$5,000 - $15,000</option>
                    <option value="15k_30k">$15,000 - $30,000</option>
                    <option value="30k_50k">$30,000 - $50,000</option>
                    <option value="50k_100k">$50,000 - $100,000</option>
                    <option value="over_100k">Over $100,000</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Frequency</label>
                  <select
                    name="paymentFrequency"
                    value={formData.paymentFrequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select payment frequency</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                    <option value="one_time">One-time payment</option>
                  </select>
                </div>
              </div>
            </div> */}

            {/* Additional Information */}
            <div>
              <div className="flex items-center mb-4">
                <Mail className="text-blue-600 mr-2" size={24} />
                <h2 className="text-2xl font-semibold text-gray-800">Additional Information</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specific Needs or Requirements</label>
                  <textarea
                    name="specificNeeds"
                    value={formData.specificNeeds}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about any specific needs or requirements you have..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
                  <select
                    name="marketingSource"
                    value={formData.marketingSource}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select source</option>
                    <option value="google">Google Search</option>
                    <option value="social_media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="conference">Conference/Event</option>
                    <option value="email">Email Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                  <textarea
                    name="additionalComments"
                    value={formData.additionalComments}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-purple-800 hover:bg-purple-900 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistForm;