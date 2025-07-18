import React from 'react';
import { Users } from 'lucide-react';

const StudentInformation = ({ formData, handleInputChange, handleCheckboxChange }) => {
  const ageGroups = [
    'Pre-K (3-4)', 
    'Kindergarten (5)', 
    'Elementary (6-10)', 
    'Middle School (11-13)', 
    'High School (14-18)', 
    'Adult Education'
  ];

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-center mb-4">
        <Users className="text-blue-600 mr-2" size={24} />
        <h2 className=" text-lg lg:text-2xl font-semibold text-gray-800">Student Information</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ageGroups.map((age) => (
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
  );
};

export default StudentInformation;