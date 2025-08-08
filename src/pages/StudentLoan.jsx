import React, { useEffect, useState } from 'react';
import { Upload, User, GraduationCap, DollarSign, FileText, CreditCard, Shield, CheckCircle, Check, ChevronLeft, ChevronRight, ExternalLink, UserCheck, AlertCircle } from 'lucide-react';
import MonoConnector from '../connector/MonoConnector';
import ReviewConsent from '../connector/ReviewConsent';
import { db } from '../connector/firebaseConnector';
import { addDoc, collection } from 'firebase/firestore';
import { createLoanApplication, finalizeApplication, getApplicationData, saveApplicationData, validateStudentData } from '../services/fireStoreService';


const validationData = [
    { matric: "25/TFX/051", fee: 180000 },
    { matric: "25/TFX/052", fee: 180000 },
    { matric: "25/TFX/053", fee: 180000 },
    { matric: "25/TFX/054", fee: 180000 },
    { matric: "25/TFX/055", fee: 50000 },
    { matric: "25/TFX/056", fee: 50000 },
    { matric: "25/TFX/057", fee: 50000 },
    { matric: "25/TFX/058", fee: 180000 },
    { matric: "25/TFX/059", fee: 180000 }
];

// Step Components
const PersonalInformation = ({ formData, handleInputChange, imagePreview, handleImageUpload }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-white text-sm font-medium mb-2">First Name *</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your first name"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Last Name *</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your last name"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Phone *</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your phone number"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Date of Birth *</label>
                <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        </div>

        <div>
            <label className="block text-white text-sm font-medium mb-2">Address *</label>
            <input
                type="text"
                name="address"
                value={formData.address || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your address"
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">City *</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="City"
                />
            </div> */}

            <div>
                <label className="block text-white text-sm font-medium mb-2">State *</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="State"
                />
            </div>

            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Zip Code</label>
                <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Zip Code"
                />
            </div> */}
        </div>

        {/* <div>
            <label className="block text-white text-sm font-medium mb-2">Profile Image</label>
            <div className="flex items-center space-x-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="profile-image"
                />
                <label
                    htmlFor="profile-image"
                    className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                </label>
                {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
                )}
            </div>
        </div> */}
    </div>
);
// const validateIdFormat = (id) => {
//     const idPattern = /^\d{2}\/[A-Z]{3}\/\d{3}$/;
//     return idPattern.test(id?.trim());
// };

// const AcademicInformation = ({ formData, handleInputChange, validationErrors, matricError }) => (
const AcademicInformation = ({ formData, handleInputChange }) => (


    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-white text-sm font-medium mb-2">Matric No *</label>
                {/* <input
                    type="text"
                    name="studentId"
                    value={formData.studentId || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your Matric No"
                /> */}
                <input
                    type="text"
                    name="studentId"
                    value={formData.studentId || ''}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2'
                    // className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 ${validationErrors.studentId
                    // ? 'border-red-500/50 focus:ring-red-500'
                    // : 'border-white/20 focus:ring-purple-500'
                    // }`}
                    placeholder="Enter your Matric No (e.g., 25/TXR/0001)"
                />
                {/* {validationErrors.studentId && (
                    <div className="mt-1 flex items-center text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" /> <p>{matricError}</p>
                        {validationErrors.studentId}
                    </div>
                )} */}
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Institution *</label>
                <input
                    type="text"
                    name="institution"
                    value={formData.institution || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your institution"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Department *</label>
                <input
                    type="text"
                    name="program"
                    value={formData.program || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your department"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Academic Year</label>
                <input
                    name="year"
                    value={formData.year || ''}
                    onChange={handleInputChange}
                    placeholder='Enter Acedemic Year'
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

            </div>

            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Expected Graduation</label>
                <input
                    type="date"
                    name="expectedGraduation"
                    value={formData.expectedGraduation || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div> */}

            <div>

            </div>
        </div>
    </div>
);

const Fees = ({ formData, handleInputChange, calculateMonthlyPayment }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Fee Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-white text-sm font-medium mb-2">Fee Amount *</label>
                {/* <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount || ''}
                    onChange={(e) => {
                        handleInputChange(e);
                        // setTimeout(calculateMonthlyPayment, 100);
                        calculateMonthlyPayment(formData.repaymentTerm, e.target.value);

                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter loan amount"
                /> */}
                <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount || ''}
                    onChange={(e) => {
                        handleInputChange(e);
                        calculateMonthlyPayment(formData.repaymentTerm, e.target.value);
                    }}
                    className='w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2'
                    // className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 
                    //     ${validationErrors.loanAmount
                    //         ? 'border-red-500/50 focus:ring-red-500'
                    //         : 'border-white/20 focus:ring-purple-500'
                    //     }`}
                    placeholder="Enter fee amount"
                />
                {/* {validationErrors.loanAmount && (
                    <div className="mt-1 flex items-center text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {validationErrors.loanAmount}
                    </div>
                )} */}
            </div>
            <div className='hidden'>
                <label className="block text-white text-sm font-medium mb-2">Fee Type *</label>
                <input
                    type='text'
                    name='loanType'
                    value={formData.loanType || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder='Tuition Fee'
                    readOnly

                />
            </div>

            <div className='hidden'>
                <label className="block text-white text-sm font-medium mb-2">Interest Rate *</label>
                <input
                    type="number"
                    step="0.1"
                    name="interestRate"
                    value={formData.interestRate || '16.5'}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="16.5"
                    readOnly
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Repayment Term *</label>
                <select
                    name="repaymentTerm"
                    value={formData.repaymentTerm || ''}
                    onChange={(e) => {
                        handleInputChange(e);
                        calculateMonthlyPayment(formData.loanAmount, e.target.value);

                        // setTimeout(calculateMonthlyPayment, 300);
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option className='text-black' value="">Select term</option>
                    <option className='text-black' value="0.25">3 Months</option>
                    <option className='text-black' value="0.5">6 Months</option>
                    <option className='text-black' value="0.75">9 Months</option>
                    <option className='text-black' value="1">12 Months</option>
                    {/* <option className='text-black' value="2">2 years</option> */}
                    {/* <option className='text-black' value="3">3 years</option> */}
                    {/* <option value="20">20 years</option> */}
                </select>
            </div>

            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Loan Start Date</label>
                <input
                    type="date"
                    name="loanStartDate"
                    value={formData.loanStartDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div> */}

            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">First Repayment Date *</label>
                <input
                    type="date"
                    name="repaymentDate"
                    value={formData.repaymentDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div> */}
            <div>
                <label className="block text-white text-sm font-medium mb-2">Monthly Payment (₦)</label>
                <input
                    name="monthlyPayment"
                    type="number"
                    value={formData.monthlyPayment}
                    readOnly
                    className="w-full px-4 py-3 bg-white/10 border border-purple-300/30 rounded-xl text-white placeholder-purple-300 focus:outline-none cursor-not-allowed"
                    placeholder="Auto-calculated"
                />
            </div>
        </div>

        {/* {formData.monthlyPayment && (
            <div className="bg-purple-600/20 border border-purple-400/30 rounded-lg p-4">
                <p className="text-white text-lg">
                    <span className="font-semibold">Estimated Monthly Payment: </span>
                    ₦{formData.monthlyPayment}
                </p>
            </div>
        )} */}
        {/* {(validationErrors.studentId || validationErrors.loanAmount) && (
            <div className="bg-red-600/20 border border-red-400/30 rounded-lg p-4">
                <div className="flex items-center text-red-400 mb-2">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Validation Error</span>
                </div>
                <p className="text-white/80 text-sm">
                    Please ensure your Matric No and Fee Amount match the registered values.
                </p>
            </div>
        )} */}
    </div>
);

const Financial = ({ formData, handleInputChange }) => (
    <div className="space-y-6">
        {/* <h2 className="text-2xl font-bold text-white mb-6">Financial Information</h2> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
        {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Annual Income</label>
                <input
                    type="number"
                    name="annualIncome"
                    value={formData.annualIncome || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter annual income"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Employment Status</label>
                <select
                    name="employmentStatus"
                    value={formData.employmentStatus || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select status</option>
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-employed</option>
                    <option value="unemployed">Unemployed</option>
                </select>
            </div> */}

        {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Employer</label>
                <input
                    type="text"
                    name="employer"
                    value={formData.employer || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter employer name"
                />
            </div>
        </div> */}

        <div className="border-white/20 pt-6">
            <h3 className="text-xl font-semibold text-white mb-4">Cosigner Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-white text-sm font-medium mb-2">Cosigner Name *</label>
                    <input
                        type="text"
                        name="cosignerName"
                        value={formData.cosignerName || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter cosigner name"
                    />
                </div>

                <div>
                    <label className="block text-white text-sm font-medium mb-2">Cosigner Phone *</label>
                    <input
                        type="tel"
                        name="cosignerPhone"
                        value={formData.cosignerPhone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter cosigner phone"
                    />
                </div>
            </div>
        </div>
    </div>
);

const BankAccount = ({ formData, handleInputChange}) => {
    // const pubKey = "test_pk_vulwcz9yw9kqdtvua5q4";
    const pubKey = "live_pk_g8pqod3pkbkwds5mmi2i";
    
    // const pubKey = "test_pk_ohr9l7gksqibkvlavjyn"
    const customerName = formData.firstName + formData.lastName;
    const customerEmail = formData.email;
    const customer = {
        // id: "65c31fa54e0e963044f014bb",
        name: customerName,
        email: customerEmail,
        // identity: {
        //     type: "bvn",
        //     bvn: formData.bvn,
        // },
    };
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Bank Account Information</h2>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-white text-sm font-medium mb-2">BVN (Bank Verification Number) *</label>
                    <input
                        type="text"
                        name="bvn"
                        value={formData.bvn || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your BVN"
                        maxLength="11"
                    />
                </div>
            </div>

            <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Connect Your Bank Account
                </h3>
                <p className="text-white/80 mb-4">
                    Connect your bank account securely to enable automatic loan repayments.
                </p>

                {/* {!bankConnected ? (
                    <MonoConnector
                        // customer={formData}
                        customer={customer}
                        publicKey={pubKey}
                        bvn={formData.bvn}
                        onSuccess={handleSuccess}
                        onError={handleError}
                        onClose={handleClose}
                        buttonText="Link Bank Account"
                    />
                ) : (
                    <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-4">
                        <div className="flex items-center text-green-400 mb-2">
                            <CheckCircle className="w-5 h-5 mr-2" />
                            <span className="font-semibold">Bank Account Connected Successfully</span>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}

// Success Page Component
const SuccessPage = () => (
    <div className="text-center space-y-8">
        <div className="flex justify-center">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-bold text-white mb-4">Account Successfully Linked!</h2>
            <p className="text-purple-200 text-lg mb-2">
                Your student fee application has been submitted successfully.
            </p>
            <p className="text-purple-300 text-sm">
                You will receive an email confirmation shortly with your application details.
            </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
            <div className="space-y-3 text-left">
                <div className="flex items-center text-white/90">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Application submitted and under review</span>
                </div>
                <div className="flex items-center text-white/90">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Bank account linked for automatic payments</span>
                </div>
                <div className="flex items-center text-white/90">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>Email confirmation sent to your inbox</span>
                </div>
            </div>
        </div>

        <div className="pt-4">
            <button
                onClick={() => window.open('https://payskul.com', '_blank')}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
                Continue to PaySkul
                <ExternalLink className="w-5 h-5 ml-2" />
            </button>
        </div>
    </div>
);

// Step Indicator Component
const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex justify-between mb-8 relative">
        {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 z-10 ${currentStep >= step.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/20 text-white/50'
                    }`}>
                    {currentStep > step.id ? (
                        <Check className="w-5 h-5" />
                    ) : (
                        <step.icon className="w-5 h-5" />
                    )}
                </div>
                <span className={`text-xs text-center hidden lg:flex ${currentStep >= step.id ? 'text-white' : 'text-white/50'
                    }`}>
                    {step.title}
                </span>

                {index < steps.length - 1 && (
                    <div
                        className={`absolute top-5 left-1/2 h-0.5 ${currentStep > step.id ? 'bg-purple-600' : 'bg-white/20'
                            }`}
                        style={{
                            width: 'calc(100vw / 6 - 40px)',
                            transform: 'translateX(20px)',
                            zIndex: 1
                        }}
                    />
                )}
            </div>
        ))}
    </div>
);

const NavigationButtons = ({ currentStep, totalSteps, onPrevious, onNext, onSubmit, isStepValid }) => (
    <div className="grid grid-cols-2 justify-between mt-8 lg:flex">
        <button
            type="button"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={`px-4 py-3 mr-2 rounded-xl font-medium transition-all duration-300 flex items-center ${currentStep === 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 hover:scale-105'
                }`}
        >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
        </button>

        {currentStep < totalSteps ? (
            <button
                type="button"
                onClick={onNext}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-all duration-300 flex items-center hover:scale-105"
            >
                Next
                <ChevronRight className="w-5 h-5 ml-2" />
            </button>
        ) : (
            <button
                type="button"
                onClick={onSubmit}
                className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center hover:scale-105"
            >
                <Check className="w-5 h-5 mr-2" />
                Complete Registration
            </button>
        )}
    </div>
);

const StudentLoan = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        state: '',

        // Academic Information
        studentId: '',
        institution: '',
        program: '',
        year: '',

        // Loan Information
        loanAmount: '',
        loanType: 'Tuition Fee',
        interestRate: '16.5',
        repaymentTerm: '',
        monthlyPayment: '',
        repaymentDate: '',

        // Financial Information
        annualIncome: '',
        employmentStatus: '',
        employer: '',
        cosignerName: '',
        cosignerPhone: '',

        // Bank Details
        bankName: '',
        accountNumber: '',
        accountName: '',
        bankCode: '',
        bvn: '',

        // Consent
        autoDebitConsent: false,

        // Documents
        // profileImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [bankConnected, setBankConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [applicationId, setApplicationId] = useState('');
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    


    // Reference to Firestore collection
    // const dbref = collection(db, "loanApplications");

    const steps = [
        { id: 1, title: 'Personal Info', icon: User },
        { id: 2, title: 'Academic Info', icon: GraduationCap },
        { id: 3, title: 'Fee Details', icon: DollarSign },
        { id: 4, title: 'Bank Account', icon: CreditCard },
        { id: 5, title: 'Review & Submit', icon: CheckCircle },
        { id: 6, title: 'Success', icon: UserCheck },
    ];

    const stepValidations = {
        1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'state'],
        2: ['studentId', 'institution', 'program'],
        3: ['loanAmount', 'repaymentTerm'],
        4: ['bvn'],
        5: ['autoDebitConsent']
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        
        let newValue;
        if (type === 'checkbox') {
            newValue = checked;
        } else if (type === 'file') {
            newValue = files[0];
        } else {
            newValue = value;
        }

        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }));

        // Clear validation errors when user starts typing
        // if (validationErrors[name]) {
        //     setValidationErrors(prev => ({
        //         ...prev,
        //         [name]: ''
        //     }));
        // }

        // Validate student data when studentId or loanAmount changes
        // if (name === 'studentId' || name === 'loanAmount') {
        //     setTimeout(() => {
        //         validateStudentDataAsync(name === 'studentId' ? newValue : formData.studentId, 
        //                                name === 'loanAmount' ? newValue : formData.loanAmount);
        //     }, 500);
        // }

        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked
            }));
        } else if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            // if (!file.type.startsWith('image/')) {
            //     setError('Please select a valid image file');
            //     return;
            // }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }

            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    // Validate student data using Firebase service
    const validateStudentDataAsync = async (studentId, feeAmount) => {
        if (!studentId || !feeAmount) return;

        try {
            const result = await validateStudentData(studentId, feeAmount);
            
            if (!result.valid) {
                setValidationErrors(prev => ({
                    ...prev,
                    studentId: result.error.includes('not found') ? result.error : '',
                    loanAmount: result.error.includes('should be') ? result.error : ''
                }));
            } else {
                setValidationErrors(prev => ({
                    ...prev,
                    studentId: '',
                    loanAmount: ''
                }));
            }
        } catch (error) {
            console.error('Error validating student data:', error);
            setValidationErrors(prev => ({
                ...prev,
                studentId: 'Validation failed. Please try again.'
            }));
        }
    };

    // Load Mono Connect script
    useEffect(() => {
        const loadMonoScript = () => {
            return new Promise((resolve, reject) => {
                if (document.querySelector('script[src*="connect.withmono.com"]')) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = 'https://connect.withmono.com/connect.js';
                script.type = 'application/javascript';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        };

        loadMonoScript()
            .then(() => {
                console.log('Mono Connect script loaded successfully');
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load Mono Connect script:', err);
                setError('Failed to load Mono Connect');
                setIsLoading(false);
            });
    }, []);

     useEffect(() => {
        const generateApplicationId = () => {
            return 'app_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        };
        
        setApplicationId(generateApplicationId());
    }, []);

    // Load existing application data if resuming
    useEffect(() => {
        const loadApplicationData = async () => {
            if (applicationId) {
                const result = await getApplicationData(applicationId);
                if (result.success && result.data) {
                    // Reconstruct formData from saved steps
                    const savedData = result.data;
                    const reconstructedData = {};
                    
                    // Merge data from all saved steps
                    Object.keys(savedData).forEach(key => {
                        if (key.startsWith('step') && savedData[key]) {
                            Object.assign(reconstructedData, savedData[key]);
                        }
                    });
                    
                    setFormData(reconstructedData);
                    setCurrentStep(savedData.currentStep || 1);
                }
            }
        };
        
        loadApplicationData();
    }, [applicationId]);
    // Calculate monthly payment
    useEffect(() => {
        calculateMonthlyPayment();
    }, [formData.loanAmount, formData.repaymentTerm]);

    // Function to get current step data
    const getCurrentStepData = (step) => {
        switch (step) {
            case 1:
                return {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    dateOfBirth: formData.dateOfBirth,
                    address: formData.address,
                    profileImage: formData.profileImage
                };
            case 2:
                return {
                    institution: formData.institution,
                    program: formData.program,
                    yearOfStudy: formData.yearOfStudy,
                    gpa: formData.gpa,
                    studentId: formData.studentId
                };
            case 3:
                return {
                    loanAmount: formData.loanAmount,
                    loanTerm: formData.loanTerm,
                    monthlyPayment: formData.monthlyPayment,
                    interestRate: formData.interestRate
                };
            case 4:
                return {
                    // bankName: formData.bankName,
                    // accountNumber: formData.accountNumber,
                    // routingNumber: formData.routingNumber,
                    // accountType: formData.accountType,
                    bvn: formData.bvn,
                };
            case 5:
                return {
                    agreedToTerms: formData.agreedToTerms,
                    consentToCredit: formData.consentToCredit,
                    marketingConsent: formData.marketingConsent
                };
            default:
                return {};
        }
    };

    // const calculateMonthlyPayment = () => {
    //     const loanAmount = parseFloat(formData.loanAmount) || 0;
    //     const repaymentPeriodInMonths = (parseFloat(formData.repaymentTerm) || 0) * 12;
        
    //     if (loanAmount > 0 && repaymentPeriodInMonths > 0) {
    //         const interestRate = 0.165; // 16.5% annual interest
    //         const totalRepayment = loanAmount * (1 + (interestRate * parseFloat(formData.repaymentTerm)));
    //         const monthlyRepayment = totalRepayment / repaymentPeriodInMonths;

    //         setFormData(prev => ({
    //             ...prev,
    //             monthlyPayment: monthlyRepayment.toFixed(2)
    //         }));
    //     }
    // };
     const calculateMonthlyPayment = () => {
        const loanAmount = parseFloat(formData.loanAmount) || 0;
        const repaymentPeriodInMonths = (parseFloat(formData.repaymentTerm) || 0) * 12;
        if (loanAmount > 0 && repaymentPeriodInMonths > 0) {
            const monthlyRepayment = loanAmount / repaymentPeriodInMonths;

            setFormData(prev => ({
                ...prev,
                monthlyPayment: monthlyRepayment.toFixed(2)
            }));
        }

    }

    const isStepValid = (step) => {
        const requiredFields = stepValidations[step] || [];
        const hasRequiredFields = requiredFields.every(field => {
            const value = formData[field];
            return value !== null && value !== undefined && value.toString().trim() !== '';
        });

        // Check for validation errors
        const hasValidationErrors = Object.values(validationErrors).some(error => error !== '');

        if (step === 4) {
            // return hasRequiredFields && bankConnected;
            return hasRequiredFields;
        }

        return hasRequiredFields && !hasValidationErrors;
    };

    // const nextStep = () => {
    //     if (isStepValid(currentStep)) {
    //         setCurrentStep(prev => Math.min(prev + 1, steps.length));
    //     } else {
    //         alert('Please fill in all required fields correctly before proceeding.');
    //     }
    // };

     const nextStep = async () => {
        if (!isStepValid(currentStep)) {
            setError('Please complete all required fields before proceeding.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Get current step data
            const stepData = getCurrentStepData(currentStep);
            
            // Save to Firestore
            const result = await saveApplicationData(applicationId, stepData, currentStep);
            
            if (result.success) {
                setCurrentStep(prev => prev + 1);
                setMessage('Progress saved successfully!');
                
                // Clear message after 3 seconds
                setTimeout(() => setMessage(''), 3000);
            } else {
                setError('Failed to save progress. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while saving. Please try again.');
        } finally {
            setLoading(false);
        }
    };
       const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // const prevStep = () => {
    //     setCurrentStep(prev => Math.max(prev - 1, 1));
    // };

    const handleSuccess = (data) => {
        console.log('Bank account connected successfully:', data);
        setBankConnected(true);
        
        // Update form data with bank information
        // setFormData(prev => ({
        //     ...prev,
        //     accountNumber: data.accountNumber || prev.accountNumber,
        //     accountName: data.accountName || prev.accountName,
        //     bankName: data.bankName || prev.bankName,
        //     bankCode: data.bankCode || prev.bankCode
        // }));
    };

    const handleError = (error) => {
        console.error('Connection failed:', error);
        setError('Failed to connect bank account. Please try again.');
    };

    const handleClose = () => {
        console.log('User closed the connection modal');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (!isStepValid(currentStep)) {
    //         alert('Please complete all required information and provide consent for automatic debit.');
    //         return;
    //     }

    //     setLoading(true);
    //     setMessage('');

    //     try {
    //         console.log('Submitting form data:', formData);
            
    //         const result = await createLoanApplication(formData);
            
            
    //         if (result.success) {
    //             setMessage('Loan application submitted successfully!');
    //             setApplicationId(result.applicationId);
    //             setSubmissionSuccess(true);
    //             console.log("Firestore Document written with ID: ", result.id);
                
    //             // Move to success page
    //             setCurrentStep(6);
                
    //             console.log('Application ID:', result.applicationId);
    //             console.log('Document ID:', result.id);
    //         } else {
    //             setMessage(`Error: ${result.error}`);
    //             setError(result.error);
    //         }
    //     } catch (error) {
    //         console.error('Submission error:', error);
    //         setMessage(`Error: ${error.message}`);
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleSubmit = async () => {
        if (!isStepValid(currentStep)) {
            setError('Please complete all required fields before submitting.');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Save final step data
            const finalStepData = getCurrentStepData(currentStep);
            await saveApplicationData(applicationId, finalStepData, currentStep);
            
            // Finalize the application
            const result = await finalizeApplication(applicationId, formData);
            
            if (result.success) {
                setCurrentStep(6); // Move to success page
                setMessage('Application submitted successfully!');
                setSubmissionSuccess(true);
            } else {
                setError('Failed to submit application. Please try again.');
            }
        } catch (err) {
            setError('An error occurred during submission. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Auto-save functionality (optional)
    useEffect(() => {
        const autoSave = async () => {
            if (applicationId && currentStep > 0 && currentStep < 6) {
                const stepData = getCurrentStepData(currentStep);
                await saveApplicationData(applicationId, stepData, currentStep);
            }
        };

        // Auto-save every 30 seconds
        const interval = setInterval(autoSave, 30000);
        return () => clearInterval(interval);
    }, [formData, currentStep, applicationId]);

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        imagePreview={imagePreview}
                        handleImageUpload={handleImageUpload}
                        validationErrors={validationErrors}
                    />
                );
            case 2:
                return (
                    <AcademicInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        validationErrors={validationErrors}
                    />
                );
            case 3:
                return (
                    <Fees
                        formData={formData}
                        handleInputChange={handleInputChange}
                        calculateMonthlyPayment={calculateMonthlyPayment}
                        validationErrors={validationErrors}
                    />
                );
            case 4:
                return (
                    <BankAccount
                        formData={formData}
                        handleInputChange={handleInputChange}
                        // bankConnected={bankConnected}
                        // handleSuccess={handleSuccess}
                        // handleError={handleError}
                        // handleClose={handleClose}
                        // validationErrors={validationErrors}
                    />
                );
            case 5:
                return (
                    <ReviewConsent
                        formData={formData}
                        handleInputChange={handleInputChange}
                        validationErrors={validationErrors}
                    />
                );
            case 6:
                return (
                    <SuccessPage 
                        applicationId={applicationId}
                        formData={formData}
                    />
                );
            default:
                return (
                    <PersonalInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        imagePreview={imagePreview}
                        handleImageUpload={handleImageUpload}
                        validationErrors={validationErrors}
                    />
                );
        }
    };

    // Your existing loading and return JSX remains the same...
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 rounded-lg">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 mt-4">
                    <h1 className="text-4xl font-bold text-white mb-2">Student Loan Application</h1>
                    <p className="text-purple-200">Complete your application to get started</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-200">
                        {error}
                    </div>
                )}

                {message && (
                    <div className={`${submissionSuccess ? 'bg-green-500/10 border-green-500/20 text-green-200' : 'bg-blue-500/10 border-blue-500/20 text-blue-200'} border rounded-lg p-4 mb-6`}>
                        {message}
                    </div>
                )}

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-8 shadow-2xl border border-white/20">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    <div className="min-h-[500px]">
                        {renderCurrentStep()}
                    </div>

                    {/* Show navigation buttons for all steps except the final success page */}
                    {currentStep < 5 && (
                        <NavigationButtons
                            currentStep={currentStep}
                            totalSteps={steps.length}
                            onPrevious={prevStep}
                            onNext={nextStep}
                            onSubmit={handleSubmit}
                            isStepValid={isStepValid(currentStep)}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

   
export default StudentLoan;