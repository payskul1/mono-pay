import React from 'react';
import { GraduationCap } from 'lucide-react';

const ProgramDetails = ({ formData, handleInputChange }) => {
  return (
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
  );
};

export default ProgramDetails;