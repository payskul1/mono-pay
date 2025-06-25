import React, { useEffect, useState } from 'react';
import { Upload, User, GraduationCap, DollarSign, FileText, CreditCard, Shield, CheckCircle, Check, ChevronLeft, ChevronRight, ExternalLink, UserCheck } from 'lucide-react';
import MonoConnector from '../connector/MonoConnector';
import ReviewConsent from '../connector/ReviewConsent';

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

        <div>
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
        </div>
    </div>
);

const AcademicInformation = ({ formData, handleInputChange }) => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Academic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-white text-sm font-medium mb-2">Student ID *</label>
                <input
                    type="text"
                    name="studentId"
                    value={formData.studentId || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your student ID"
                />
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
                <label className="block text-white text-sm font-medium mb-2">Program *</label>
                <input
                    type="text"
                    name="program"
                    value={formData.program || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your program"
                />
            </div>

            <div>
                <label className="block text-white text-sm font-medium mb-2">Academic Year</label>
                <select
                    name="year"
                    value={formData.year || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5">5th Year</option>
                </select>
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
                <input
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
                />
            </div>

            {/* <div>
                <label className="block text-white text-sm font-medium mb-2">Fee Type *</label>
                <select
                    name="loanType"
                    value={formData.loanType || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option className='text-black' value="">Select loan type</option>
                    <option className='text-black' value="tuition">Tuition Fee Loan</option>
                    <option className='text-black' value="living">Living Expense Loan</option>
                    <option className='text-black' value="combined">Combined Loan</option>
                </select>
            </div> */}
            <div>
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

            <div>
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
                <label className="block text-white text-sm font-medium mb-2">Repayment Term (years) *</label>
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

            <div>
                <label className="block text-white text-sm font-medium mb-2">First Repayment Date *</label>
                <input
                    type="date"
                    name="repaymentDate"
                    value={formData.repaymentDate || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
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

const BankAccount = ({ formData, handleInputChange, bankConnected, handleSuccess, handleError, handleClose }) => {
    const pubKey = "test_pk_vulwcz9yw9kqdtvua5q4";
    //   const [bvn, set]
    const customer = {
        // id: "65c31fa54e0e963044f014bb",
        name: "Samuel Olamide",
        email: "samuel@neem.com",
        identity: {
            type: "bvn",
            // bvn: 2323233239
        },
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

                {!bankConnected ? (
                    <MonoConnector
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
                        {/* <p className="text-white/80">
                            Account: {formData.accountName} - {formData.bankName}
                        </p> */}
                    </div>
                )}
            </div>
        </div>
    );
}

// const ReviewConsent = ({ formData, handleInputChange }) => (
//     <div className="space-y-6">
//         <h2 className="text-2xl font-bold text-white mb-6">Review & Consent</h2>

//         <div className="bg-white/5 rounded-lg p-6 space-y-4">
//             <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                     <span className="text-white/70">Name:</span>
//                     <span className="text-white ml-2">{formData.firstName} {formData.lastName}</span>
//                 </div>
//                 <div>
//                     <span className="text-white/70">Email:</span>
//                     <span className="text-white ml-2">{formData.email}</span>
//                 </div>
//                 <div>
//                     <span className="text-white/70">Institution:</span>
//                     <span className="text-white ml-2">{formData.institution}</span>
//                 </div>
//                 <div>
//                     <span className="text-white/70">Program:</span>
//                     <span className="text-white ml-2">{formData.program}</span>
//                 </div>
//                 <div>
//                     <span className="text-white/70">Loan Amount:</span>
//                     <span className="text-white ml-2">₦{formData.loanAmount}</span>
//                 </div>
//                 <div>
//                     <span className="text-white/70">Monthly Payment:</span>
//                     <span className="text-white ml-2">₦{formData.monthlyPayment}</span>
//                 </div>
//             </div>
//         </div>

//         <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-6">
//             <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
//                 <Shield className="w-5 h-5 mr-2" />
//                 Automatic Debit Authorization
//             </h3>

//             <div className="space-y-4">
//                 <p className="text-white/90 text-sm leading-relaxed">
//                     By checking the box below, you authorize automatic monthly deductions from your connected bank account
//                     for loan repayments. This ensures timely payments and helps maintain your good credit standing.
//                 </p>

//                 <div className="flex items-start space-x-3">
//                     <input
//                         type="checkbox"
//                         id="autoDebitConsent"
//                         name="autoDebitConsent"
//                         checked={formData.autoDebitConsent || false}
//                         onChange={handleInputChange}
//                         className="mt-1 w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
//                     />
//                     <label htmlFor="autoDebitConsent" className="text-white text-sm leading-relaxed">
//                         I authorize automatic debit of monthly loan payments from my connected bank account.
//                         I understand that I can modify or cancel this authorization by contacting customer service.
//                     </label>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

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
                Your student loan application has been submitted successfully.
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
                <span className={`text-xs text-center ${currentStep >= step.id ? 'text-white' : 'text-white/50'
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
    <div className="flex justify-between mt-8">
        <button
            type="button"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center ${currentStep === 1
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
                className="px-8 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-300 flex items-center hover:scale-105"
            >
                <Check className="w-5 h-5 mr-2" />
                Complete Registration
            </button>
        )}
    </div>
);


const StudentLoan = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        // city: '',
        state: '',
        // zipCode: '',

        // Academic Information
        studentId: '',
        institution: '',
        program: '',
        year: '',
        // expectedGraduation: '',
        // gpa: '',

        // Loan Information
        loanAmount: '',
        loanType: 'Tuition Fee',
        interestRate: '16.5',
        // loanStartDate: '',
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

        // Mono Integration
        // monoAccountId: '',
        autoDebitConsent: false,

        // Documents
        profileImage: null
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [bankConnected, setBankConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);



    const steps = [
        { id: 1, title: 'Personal Info', icon: User },
        { id: 2, title: 'Academic Info', icon: GraduationCap },
        { id: 3, title: 'Loan Details', icon: DollarSign },
        { id: 4, title: 'Financial Info', icon: FileText },
        { id: 5, title: 'Bank Account', icon: CreditCard },
        { id: 6, title: 'Review & Submit', icon: CheckCircle },
        { id: 7, title: 'Success', icon: UserCheck },
    ];

    const stepValidations = {
        1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'state'],
        2: ['studentId', 'institution', 'program'],
        3: ['loanAmount', 'interestRate', 'repaymentTerm', 'repaymentDate'],
        4: ['cosignerName', 'cosignerPhone'],
        // 5: ['bankName', 'accountNumber', 'accountName', 'bvn'], 
        5: ['bvn'],
        6: ['autoDebitConsent']
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileImage: file
            }));

            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
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
        calculateMonthlyPayment();
    }, [formData.loanAmount, formData.repaymentTerm]);


    const calculateMonthlyPayment = () => {
        const loanAmount = parseFloat(formData.loanAmount) || 0;
        const annualInterestRate = 0.07;
        const repaymentPeriodInMonths = (parseFloat(formData.repaymentTerm) || 0) * 12;
        //const monthlyInterest = (7/100) * loanAmount
        //const repayment = (loanAmount/repaymentPeriodInMonths) + monthlyInterest

        if (loanAmount > 0 && repaymentPeriodInMonths > 0) {
            //  const monthlyInterestRate = annualInterestRate / 12;
            //  const monthlyRepayment = loanAmountNum * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, repaymentPeriodInMonths)) / 
            // (Math.pow(1 + monthlyInterestRate, repaymentPeriodInMonths) - 1);

            const monthlyRepayment = loanAmount * (annualInterestRate * Math.pow(1 + annualInterestRate, repaymentPeriodInMonths)) / (Math.pow(1 + annualInterestRate, repaymentPeriodInMonths) - 1);

            setFormData(prev => ({
                ...prev,
                monthlyPayment: monthlyRepayment.toFixed(2)
            }));
            console.log(monthlyRepayment)
            console.log('Loan Amount:', loanAmount, typeof loanAmount);
            console.log('Repayment Period in Months:', repaymentPeriodInMonths);
            console.log('Annual Interest Rate:', annualInterestRate);
        } else {
            // Reset if invalid inputs
            setFormData(prev => ({
                ...prev,
                monthlyPayment: ''
            }));
        }
    };

    // const calculateMonthlyPayment = () => {
    //     const loanAmount = parseFloat(formData.loanAmount) || 0;
    //     const annualInterestRate = 0.07; // 7% annual interest rate
    //     const monthlyInterestRate = annualInterestRate / 12;

    //     // Extract number from repayment term (handles "1 Year", "2 Years", or just "1", "2")
    //     const termText = formData.repaymentTerm || '';
    //     const repaymentYears = parseInt(termText.match(/\d+/)?.[0]) || 0;
    //     const repaymentPeriodInMonths = repaymentYears * 12;

    //     if (loanAmount > 0 && repaymentPeriodInMonths > 0) {
    //         const monthlyRepayment = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, repaymentPeriodInMonths)) / 
    //                                 (Math.pow(1 + monthlyInterestRate, repaymentPeriodInMonths) - 1);

    //         setFormData(prev => ({
    //             ...prev,
    //             monthlyRepayment: monthlyRepayment.toFixed(2)
    //         }));
    //         console.log(monthlyRepayment);
    //     } else {
    //         setFormData(prev => ({
    //             ...prev,
    //             monthlyRepayment: ''
    //         }));
    //     }
    // };
    const isStepValid = (step) => {
        const requiredFields = stepValidations[step] || [];
        const hasRequiredFields = requiredFields.every(field => formData[field]?.toString().trim());

        if (step === 5) {
            return hasRequiredFields && bankConnected;
        }

        return hasRequiredFields;
    };

    const nextStep = () => {
        if (isStepValid(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length));
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSuccess = (data) => {
        console.log('Bank account connected successfully:', data);
        setBankConnected(true);
        // setFormData(prev => ({
        //     ...prev,
        //     monoAccountId: data.accountId,
        //     accountNumber: data.accountNumber,
        //     accountName: data.accountName,
        //     bankName: data.bankName,
        //     bankCode: data.bankCode
        // }));
    };

    const handleError = (error) => {
        console.error('Connection failed:', error);
    };

    const handleClose = () => {
        console.log('User closed the connection modal');
    };

    const handleSubmit = async () => {
        if (!isStepValid(6)) {
            alert('Please complete all required information and provide consent for automatic debit.');
            return;
        }

        const loanApplication = {
            ...formData,
            applicationId: 'LN' + Date.now(),
            applicationDate: new Date().toISOString(),
            status: 'pending_review'
        };

        console.log('Loan Application Submitted:', loanApplication);
        alert('Student loan application submitted successfully! You will receive an email confirmation shortly.');
    };

    const renderCurrentStep = () => {
        // PRINT ADDED
        console.log('Component:', MonoConnector);
        console.log('Type of component:', typeof MonoConnector);
        switch (currentStep) {
            case 1:
                return (
                    <PersonalInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        imagePreview={imagePreview}
                        handleImageUpload={handleImageUpload}
                    />
                );
            case 2:
                return (
                    <AcademicInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 3:
                return (
                    <Fees
                        formData={formData}
                        handleInputChange={handleInputChange}
                        calculateMonthlyPayment={calculateMonthlyPayment}
                    />
                );
            case 4:
                return (
                    <Financial
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 5:
                return (
                    <BankAccount
                        formData={formData}
                        handleInputChange={handleInputChange}
                        bankConnected={bankConnected}
                        handleSuccess={handleSuccess}
                        handleError={handleError}
                        handleClose={handleClose}
                    />
                );
            case 6:
                return (
                    <ReviewConsent
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 7:
                return (
                    <SuccessPage />
                );
            default:
                return (
                    <PersonalInformation
                        formData={formData}
                        handleInputChange={handleInputChange}
                        imagePreview={imagePreview}
                        handleImageUpload={handleImageUpload}
                    />
                    // <p>hr</p>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-8 rounded-lg">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Student Registration</h1>
                    <p className="text-purple-200">Complete your profile to get started</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    <div className="min-h-[500px]">
                        {renderCurrentStep()}
                    </div>

                    {currentStep < steps.length && (

                        <NavigationButtons
                            currentStep={currentStep}
                            totalSteps={steps.length}
                            onPrevious={prevStep}
                            onNext={nextStep}
                            onSubmit={handleSubmit}
                            isStepValid={isStepValid(currentStep)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentLoan;