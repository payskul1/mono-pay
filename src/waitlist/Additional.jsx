import React from 'react';
import { Mail } from 'lucide-react';

const AdditionalInformation = ({ formData, handleInputChange }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <Mail className="text-blue-600 mr-2" size={24} />
        <h2 className="text-lg lg:text-2xl  font-semibold text-gray-800">Additional Information</h2>
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
  );
};

export default AdditionalInformation;