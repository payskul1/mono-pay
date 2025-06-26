import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';

const ReviewConsent = ({ formData, handleInputChange, onSubmit }) => {
    const [checkboxError, setCheckboxError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [customerExists, setCustomerExists] = useState(false);

    // Handle checkbox change with validation
    const handleCheckboxChange = (e) => {
        handleInputChange(e);
        if (e.target.checked) {
            setCheckboxError('');
        }
    };

    const getStartDate = () => {
        // const date = new Date(formData.repaymentDate);
        const date = new Date();
        return date;
    }

    // Helper function to calculate loan end date (assuming 12 months for example)
    const getLoanEndDate = () => {
        // const date = new Date(formData.repaymentDate);
        const date = new Date();

        date * 12;
        console.log(date);
        return date.toISOString().split('T')[0];
    };

    // Mono Direct Debit Integration (Fixed according to official docs)
    const setupDirectDebit = async () => {
        const API_BASE_URL = 'https://api.withmono.com';
        // Note: In production, this should be your actual secret key and stored securely
        const SECRET_KEY = 'test_sk_b70y8f5d7cc04nj27fj1';

        console.log('🚀 Starting direct debit setup using official Mono API...');
        console.log('📋 Form data:', {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            monthlyPayment: formData.monthlyPayment,
            program: formData.program
        });

        try {
            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                throw new Error('Missing required customer information. Please fill in all fields.');
            }

            if (!formData.monthlyPayment || isNaN(parseInt(formData.monthlyPayment.replace(/,/g, '')))) {
                throw new Error('Invalid monthly payment amount.');
            }

            // Step 1: Create Customer Profile
            const customerPayload = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                address: formData.address,
                phone: formData.phone
            };

            console.log('👤 Creating customer with payload:', customerPayload);

            const customerResponse = await fetch(`${API_BASE_URL}/v2/customers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'mono-sec-key': SECRET_KEY
                },
                body: JSON.stringify(customerPayload)
            });

            console.log('👤 Customer response status:', customerResponse.status);

            if (!customerResponse.ok) {
                const errorText = await customerResponse.text();
                console.error('❌ Customer creation failed:', errorText);

                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    errorData = { message: errorText };
                }

                const errorMessage = errorData?.message || errorData?.error || `HTTP ${customerResponse.status}: Failed to create customer profile`;
                // throw new Error(`Customer creation failed: ${errorMessage}`);
                if (errorMessage.toLowerCase().includes('customer already exists') ||
                    errorMessage.toLowerCase().includes('already exist') ||
                    errorMessage.toLowerCase().includes('email') && errorMessage.toLowerCase().includes('already')) {
                        console.log('ℹ️ Customer already exists, continuing with existing customer');
                        setCustomerExists(true);
                        throw new Error('Email is already in use');
                    } else {
                        throw new Error(`Customer creation failed: ${errorMessage}`);
                    }
                }


                const customerData = await customerResponse.json();
                console.log('✅ Customer created:', customerData);

                let customerId;
                if (customerData.data) {
                    // Check if it's an existing customer
                    if (customerData.data.existing_customer && customerData.data.existing_customer.id) {
                        customerId = customerData.data.existing_customer.id;
                        console.log('📋 Using existing customer ID:', customerId);
                    } else if (customerData.data.id) {
                        // New customer created
                        customerId = customerData.data.id;
                        console.log('📋 Using new customer ID:', customerId);
                    }
                } else if (customerData.id) {
                    // Direct ID in response (fallback)
                    customerId = customerData.id;
                    console.log('📋 Using direct customer ID:', customerId);
                }

                if (!customerId) {
                    throw new Error('Customer creation failed: No customer ID returned');
                }


                // Step 2: Create Direct Debit Mandate using correct endpoint and payload structure
                const amount = parseFloat(formData.loanAmount.replace(/,/g, ''));
                console.log(amount)
                const startDate = getStartDate();
                const endDate = getLoanEndDate();
                const initialDate = new Date(startDate);
                initialDate.setDate(initialDate.getDate() + 1);
                const term = parseFloat(formData.repaymentTerm) * 12;
                console.log(term)
                const mandateAmount = (amount / term) * 100; // Convert to kobo
                console.log(mandateAmount)

                const minimumDebit = mandateAmount / 2;
                const num = 1;

                const mandatePayload = {
                    type: "recurring-debit",
                    method: "mandate",
                    debit_type: "fixed",
                    mandate_type: "gsm",
                    customer: {
                        id: customerId,
                    },
                    amount: mandateAmount,
                    reference: `loan${Date.now()}`,
                    description: `Monthly loan repayment for ${formData.program || 'education'} program`,
                    start_date: startDate,
                    end_date: endDate,
                    retrial_frequency: num,
                    frequency: "monthly",
                    // initial_debit_date: initialDate,
                    initial_debit_date: initialDate.toISOString().split('T')[0],
                    initial_debit_amount: mandateAmount,
                    grace_period: 6,
                    minimum_due: minimumDebit,
                    redirect_url: `${window.location.origin}/payment-success`,
                    meta: {
                        loan_program: formData.program,
                        application_id: `APP_${Date.now()}`
                    }
                };

                console.log('📋 Creating mandate with payload:', mandatePayload);

                // Use the correct endpoint for direct debit mandate creation
                const mandateResponse = await fetch(`${API_BASE_URL}/v2/payments/initiate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'mono-sec-key': SECRET_KEY
                    },
                    body: JSON.stringify(mandatePayload)
                });

                console.log('📋 Mandate response status:', mandateResponse.status);

                if (!mandateResponse.ok) {
                    const errorText = await mandateResponse.text();
                    console.error('❌ Mandate creation failed:', errorText);

                    let errorData;
                    try {
                        errorData = JSON.parse(errorText);
                    } catch (e) {
                        errorData = { message: errorText };
                    }

                    const errorMessage = errorData?.message || errorData?.error || `HTTP ${mandateResponse.status}: Failed to create payment mandate`;
                    throw new Error(`Mandate creation failed: ${errorMessage}`);
                }

                const mandateResult = await mandateResponse.json();
                console.log('✅ Mandate API Response:', mandateResult);

                // Handle the response according to Mono's response structure
                if (mandateResult.status === 'successful' || mandateResult.data) {
                    const mandateData = mandateResult.data || mandateResult;

                    // Step 3: Handle mandate authorization
                    if (mandateData.authorization_url || mandateData.mono_url) {
                        const authUrl = mandateData.authorization_url || mandateData.mono_url;
                        console.log('🔗 Opening authorization link:', authUrl);

                        // Open mandate authorization in a new window
                        const authWindow = window.open(
                            authUrl,
                            'mono-auth',
                            'width=500,height=700,scrollbars=yes,resizable=yes'
                        );

                        // Optional: Listen for window close event
                        const checkClosed = setInterval(() => {
                            if (authWindow.closed) {
                                clearInterval(checkClosed);
                                console.log('Authorization window closed');
                                // You might want to check the mandate status here
                            }
                        }, 1000);
                    } else {
                        console.warn('⚠️ No authorization link provided in response');
                    }

                    // Store mandate details for tracking
                    const applicationData = {
                        ...formData,
                        customerId: customerId,
                        mandateId: mandateData.id || mandateData.mandate_id,
                        mandateReference: mandateData.reference,
                        mandateType: mandateData.mandate_type || 'emandate',
                        mandateAmount: mandateData.amount || mandateAmount,
                        startDate: mandateData.start_date || startDate,
                        endDate: mandateData.end_date || endDate,
                        mandateStatus: 'pending_authorization'
                    };

                    console.log('✅ Direct debit setup initiated successfully');
                    console.log('📄 Application data:', applicationData);

                    // Call your onSubmit handler with the complete data
                    if (onSubmit) {
                        onSubmit(applicationData);
                    }
                } else {
                    throw new Error(`Unexpected response format: ${mandateResult.message || 'Unknown error'}`);
                }

            } catch (error) {
                // Enhanced error logging and handling
                console.error('❌ Direct debit setup error:', {
                    message: error.message,
                    stack: error.stack,
                    formData: formData
                });

                // Provide user-friendly error messages
                let userMessage = error.message;

                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    userMessage = 'Network error: Please check your internet connection and try again.';
                } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                    userMessage = 'Authentication failed: Please contact support.';
                } else if (error.message.includes('400') || error.message.includes('Bad Request')) {
                    userMessage = 'Invalid request data: Please check your form information and try again.';
                } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
                    userMessage = 'Access denied: Please contact support.';
                } else if (error.message.includes('429')) {
                    userMessage = 'Too many requests: Please wait a moment and try again.';
                } else if (error.message.includes('500')) {
                    userMessage = 'Server error: Please try again later or contact support.';
                }

                throw new Error(userMessage);
            }
        };

        // Validate checkbox before proceeding
        // const validateAndProceed = async () => {
        //     if (!formData.autoDebitConsent) {
        //         setCheckboxError('You must authorize automatic debit to proceed with the loan application.');
        //         return;
        //     }

        //     setCheckboxError('');
        //     setIsProcessing(true);

        //     try {
        //         await setupDirectDebit();
        //     } catch (error) {
        //         console.error('Direct debit setup failed:', error);
        //         setCheckboxError("error.message" || 'Failed to set up automatic payments. Please try again.');
        //     } finally {
        //         setIsProcessing(false);
        //     }
        // };

        // Replace the validateAndProceed function with this fixed version:

        const validateAndProceed = async () => {
            if (!formData.autoDebitConsent) {
                setCheckboxError('You must authorize automatic debit to proceed with the loan application.');
                return;
            }

            setCheckboxError('');
            setIsProcessing(true);

            try {
                await setupDirectDebit();
            } catch (error) {
                console.error('Direct debit setup failed:', error);

                // Custom error message handling
                let displayMessage = 'Failed to set up automatic payments. Please try again.';

                // Check if the error message contains information about existing email
                if (error.message && (
                    error.message.toLowerCase().includes('email') &&
                    error.message.toLowerCase().includes('already') ||
                    error.message.toLowerCase().includes('customer already exists') ||
                    error.message.toLowerCase().includes('already exist')
                )) {
                    displayMessage = 'Email is already in use';
                } else if (error.message) {
                    // Use the actual error message if it doesn't match the email case
                    displayMessage = error.message;
                }

                setCheckboxError(displayMessage);
            } finally {
                setIsProcessing(false);
            }
        };
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Review & Consent</h2>

                <div className="bg-white/5 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-white/70">Name:</span>
                            <span className="text-white ml-2">{formData.firstName} {formData.lastName}</span>
                        </div>
                        <div>
                            <span className="text-white/70">Email:</span>
                            <span className="text-white ml-2">{formData.email}</span>
                        </div>
                        <div>
                            <span className="text-white/70">Institution:</span>
                            <span className="text-white ml-2">{formData.institution}</span>
                        </div>
                        <div>
                            <span className="text-white/70">Program:</span>
                            <span className="text-white ml-2">{formData.program}</span>
                        </div>
                        <div>
                            <span className="text-white/70">Fee Amount:</span>
                            <span className="text-white ml-2">₦{formData.loanAmount}</span>
                        </div>
                        <div>
                            <span className="text-white/70">Monthly Payment:</span>
                            <span className="text-white ml-2">₦{formData.monthlyPayment}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Automatic Debit Authorization
                    </h3>

                    <div className="space-y-4">
                        <p className="text-white/90 text-sm leading-relaxed">
                            By checking the box below, you authorize automatic monthly deductions from your connected bank account
                            for loan repayments. This ensures timely payments and helps maintain your good credit standing.
                        </p>

                        <div className="space-y-2">
                            <div className="flex items-start space-x-3">
                                <input
                                    type="checkbox"
                                    id="autoDebitConsent"
                                    name="autoDebitConsent"
                                    checked={formData.autoDebitConsent || false}
                                    onChange={handleCheckboxChange}
                                    className="mt-1 w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <label htmlFor="autoDebitConsent" className="text-white text-sm leading-relaxed">
                                    I authorize automatic debit of monthly loan payments from my connected bank account.
                                    I understand that I can modify or cancel this authorization by contacting customer service.
                                </label>
                            </div>

                            {checkboxError && (
                                <div className="flex items-center space-x-2 text-red-400 text-sm mt-2">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>{checkboxError}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <button
                                onClick={validateAndProceed}
                                disabled={isProcessing}
                                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Setting up automatic payments...
                                    </>
                                ) : (
                                    'Authorize & Submit Application'
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-600/20 border border-blue-400/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">What happens next?</h4>
                    <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
                        <li>You'll be redirected to authorize automatic payments with your bank</li>
                        <li>Your loan application will be submitted for review</li>
                        <li>You'll receive an email confirmation within 24 hours</li>
                        <li>Monthly payments will begin after loan approval and disbursement</li>
                    </ol>
                </div>
            </div>
        );
    };

    export default ReviewConsent;