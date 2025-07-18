import React, { useState } from 'react';
import SubmitButton from '../waitlist/SubmitButton';
import AdditionalInformation from '../waitlist/Additional';
import ProgramDetails from '../waitlist/ProgramDetails';
import StudentInformation from '../waitlist/StudentInformation';
import SchoolInformation from '../waitlist/SchoolInformation';
import ContactInformation from '../waitlist/ContactInformation';
import SuccessMessage from '../waitlist/Success';
import { db } from '../services/firebaseConfig';
// import { saveWaitlistData, getWaitlistEntries } from '../services/firebaseConfig.js';
import databaseService from '../services/firebaseConfig';

// Import the database service

const WaitList = () => {
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
    
    // Additional Information
    specificNeeds: '',
    marketingSource: '',
    additionalComments: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
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

  const validateForm = () => {
    const requiredFields = [
      { field: 'contactName', label: 'Contact Name' },
      { field: 'contactEmail', label: 'Email Address' },
      { field: 'contactPhone', label: 'Phone Number' },
      { field: 'contactRole', label: 'Your Role' },
      { field: 'schoolName', label: 'School Name' },
      { field: 'schoolType', label: 'School Type' },
      { field: 'schoolAddress', label: 'School Address' },
      { field: 'schoolCity', label: 'City' },
      { field: 'schoolState', label: 'State' },
      { field: 'schoolZip', label: 'ZIP Code' },
      { field: 'totalStudents', label: 'Total Students' },
      { field: 'programInterest', label: 'Program Interest' }
    ];
    
    // const missingFields = requiredFields.filter(({ field }) => !formData[field]);
    
    // if (missingFields.length > 0) {
    //   setError(`Please fill in the following required fields: ${missingFields.map(f => f.label).join(', ')}`);
    //   return false;
    // }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(formData.contactPhone.replace(/\s/g, ''))) {
      setError('Please enter a valid phone number (at least 10 digits)');
      return false;
    }
    
    // Student count validation
    const studentCount = parseInt(formData.totalStudents);
    if (isNaN(studentCount) || studentCount < 1) {
      setError('Please enter a valid number of students');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!validateForm()) {
        setIsSubmitting(false);
        return;
      }
      
      console.log('Submitting form data:', formData);
      
      // Save to database using the database service
      const result = await databaseService.saveWaitlistData(formData);
      
      if (result.success) {
        console.log('Form submitted successfully:', result);
        setSubmissionId(result.id);
        setSubmitted(true);
        
        // Reset form after 4 seconds
        setTimeout(() => {
          setSubmitted(false);
          setSubmissionId('');
          resetForm();
        }, 4000);
        
      } else {
        console.error('Form submission failed:', result);
        setError(result.message || 'Failed to submit form. Please try again.');
      }
      
    } catch (error) {
      console.error('Unexpected error during form submission:', error);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
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
      specificNeeds: '',
      marketingSource: '',
      additionalComments: ''
    });
    setError('');
  };

  if (submitted) {
 
    return <SuccessMessage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-2">
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
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
              <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">Please correct the following:</p>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          )}
          
          <div className="space-y-8">
            <ContactInformation 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <SchoolInformation 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <StudentInformation 
              formData={formData} 
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
            />
            
            <ProgramDetails 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <AdditionalInformation 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <SubmitButton 
              onSubmit={handleSubmit} 
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitList;