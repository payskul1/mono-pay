import React from 'react';
import { School } from 'lucide-react';

const SchoolInformation = ({ formData, handleInputChange }) => {
  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center mb-4">
        <School className="text-blue-600 mr-2" size={24} />
        <h2 className="text-lg lg:text-2xl  font-semibold text-gray-800">School Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div className="md:col-span-2"> */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        <div>

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
            <option value="tertiary">Tertiary Institution</option>
            <option value="public">Public School</option>
            <option value="private">Private School</option>
            <option value="charter">Charter School</option>
            <option value="homeschool">Homeschool Group</option>
            <option value="daycare">Daycare Center</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">School Website</label>
          <input
            type="url"
            name="schoolWebsite"
            value={formData.schoolWebsite}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://schoolwebsite.com"
          />
        </div> */}
        
        {/* <div className="md:col-span-2"> */}
        <div>
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
        
        {/* <div>
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
        </div> */}
        
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default SchoolInformation;