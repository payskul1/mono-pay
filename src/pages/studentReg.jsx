import React, { useState } from 'react';
import SubmitButton from '../waitlist/SubmitButton';
import databaseService from '../services/firbasePerson';

// Success Message Component
const SuccessMessage = ({ submissionId }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
      <p className="text-gray-600 mb-4">Your registration has been submitted successfully.</p>
      {submissionId && (
        <p className="text-sm text-gray-500">Reference ID: {submissionId}</p>
      )}
    </div>
  </div>
);

export default function StudentRegistrationForm() {
    const ageGroups = [
        'Pre-K & Kindergarten (3-5)',
        'Elementary/ Middle School (6-13)',
        'High School (14-18)',
        'Adult Education/ Professional',
    ];

    const [formData, setFormData] = useState({
        // Personal Details
        name: '',
        email: '',
        phoneNo: '',
        role: '',

        // Student Criteria
        studentCriteria: '',
        numberOfStudents: '',
        ageGroups: [],

        // School Information
        schoolName: '',
        schoolType: '',
        address: '',

        // Additional Information
        additionalInfo: '',
        howDidYouHear: ''
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
    };

    const handleAgeGroupChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            ageGroups: checked
                ? [...prev.ageGroups, value]
                : prev.ageGroups.filter(age => age !== value)
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            { field: 'name', label: 'Full Name' },
            { field: 'email', label: 'Email Address' },
            { field: 'phoneNo', label: 'Phone Number' },
            { field: 'role', label: 'Your Role' },
            { field: 'schoolName', label: 'School Name' },
            { field: 'schoolType', label: 'School Type' },
            // { field: 'address', label: 'Address' },
            { field: 'numberOfStudents', label: 'Number of Students' },
            // { field: 'studentCriteria', label: 'Student Criteria' },
            { field: 'howDidYouHear', label: 'How did you hear about us' }
        ];
        
        // Check for missing required fields
        const missingFields = requiredFields.filter(({ field }) => !formData[field] || formData[field].toString().trim() === '');
        
        if (missingFields.length > 0) {
            setError(`Please fill in the following required fields: ${missingFields.map(f => f.label).join(', ')}`);
            return false;
        }

        // Check if at least one age group is selected
        if (formData.ageGroups.length === 0) {
            setError('Please select at least one age group');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        
        // Phone validation
        const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
        if (!phoneRegex.test(formData.phoneNo.replace(/\s/g, ''))) {
            setError('Please enter a valid phone number (at least 10 digits)');
            return false;
        }
        
        // Student count validation
        const studentCount = parseInt(formData.numberOfStudents);
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
            // const result = await databaseService.saveWaitlistData(formData);
            const result = await databaseService.submitWaitlistForm(formData);
            
            if (result.success) {
                console.log('Form submitted successfully:', result);
                setSubmissionId(result.id);
                setSubmitted(true);
                
                // Reset form after 4 seconds
                // setTimeout(() => {
                //     setSubmitted(false);
                //     setSubmissionId('');
                //     resetForm();
                // }, 4000);
                
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
            name: '',
            email: '',
            phoneNo: '',
            role: '',
            studentCriteria: '',
            numberOfStudents: '',
            ageGroups: [],
            schoolName: '',
            schoolType: '',
            address: '',
            additionalInfo: '',
            howDidYouHear: ''
        });
        setError('');
    };

    if (submitted) {
        return <SuccessMessage submissionId={submissionId} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-8 sm:px-8">
                        <h1 className="text-3xl font-bold text-purple-800 text-center">
                            Join the WaitList
                        </h1>
                        <p className="mt-2 text-black text-center">
                            Please fill out all required information below
                        </p>
                    </div>

                    <div className="px-6 py-8 sm:px-8 space-y-8">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Personal Details Section */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
                                    Personal Details
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="text"
                                        id="phoneNo"
                                        name="phoneNo"
                                        required
                                        value={formData.phoneNo}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        I am a *
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        required
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select your role</option>
                                        <option value="parent">Parent</option>
                                        <option value="student">Student</option>
                                        <option value="teacher">Teacher</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Student Criteria Section */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
                                    Student Criteria
                                </h2>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                {/* <div>
                                    <label htmlFor="studentCriteria" className="block text-sm font-medium text-gray-700 mb-2">
                                        Student Criteria *
                                    </label>
                                    <select
                                        id="studentCriteria"
                                        name="studentCriteria"
                                        required
                                        value={formData.studentCriteria}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select student criteria</option>
                                        <option value="stem-focused">STEM Focused</option>
                                        <option value="arts-focused">Arts Focused</option>
                                        <option value="sports-athletics">Sports & Athletics</option>
                                        <option value="general-education">General Education</option>
                                        <option value="vocational-training">Vocational Training</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div> */}

                                <div className='grid-col-1'>
                                    <label htmlFor="numberOfStudents" className="block text-sm font-medium text-gray-700 mb-2">
                                        Number of Students *
                                    </label>
                                    <input
                                        type="number"
                                        id="numberOfStudents"
                                        name="numberOfStudents"
                                        required
                                        min="1"
                                        value={formData.numberOfStudents}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter number of students"
                                    />
                                </div>

                            <div className='col-span-2'>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Student Age Groups * (Select all that apply)
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {ageGroups.map((ageGroup) => (
                                        <label key={ageGroup} className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                value={ageGroup}
                                                checked={formData.ageGroups.includes(ageGroup)}
                                                onChange={handleAgeGroupChange}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700">{ageGroup}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            </div>

                        </div>

                        {/* School Information Section */}
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">3</span>
                                    School Information
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-2">
                                        School/Organization Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="schoolName"
                                        name="schoolName"
                                        required
                                        value={formData.schoolName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter school or organization name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="schoolType" className="block text-sm font-medium text-gray-700 mb-2">
                                        School Type *
                                    </label>
                                    <select
                                        id="schoolType"
                                        name="schoolType"
                                        required
                                        value={formData.schoolType}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    >
                                        <option value="">Select school type</option>
                                        <option value="public">Public School</option>
                                        <option value="private">Private School</option>
                                        <option value="charter">Charter School</option>
                                        <option value="international">International School</option>
                                        <option value="homeschool">Homeschool</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                    Address *
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter complete address"
                                />
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        
                        <div className="space-y-6">
                            <div className="border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                                    <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">4</span>
                                    Additional Information
                                </h2>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Additional Information
                                </label>
                                <textarea
                                    name="additionalInfo"
                                    value={formData.additionalInfo}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Tell us about any specific needs or requirements you have..."
                                />
                            </div>

                            <div>
                                <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700 mb-2">
                                    How did you hear about us? *
                                </label>
                                <select
                                    id="howDidYouHear"
                                    name="howDidYouHear"
                                    required
                                    value={formData.howDidYouHear}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="">Please select</option>
                                    <option value="google">Google Search</option>
                                    <option value="social-media">Social Media</option>
                                    <option value="friend-referral">Friend/Family Referral</option>
                                    <option value="school">School Recommendation</option>
                                    <option value="advertisement">Advertisement</option>
                                    <option value="website">Website</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <SubmitButton
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}