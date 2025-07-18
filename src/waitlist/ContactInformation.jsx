import React from 'react';
import { Phone } from 'lucide-react';

const ContactInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center mb-4">
        <Phone className="text-blue-600 mr-2" size={24} />
        <h2 className="text-lg lg:text-2xl  font-semibold text-gray-800">Contact Information</h2>
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
  );
};

export default ContactInformation;