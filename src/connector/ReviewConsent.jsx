import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { createLoanApplication } from '../services/fireStoreService';
import { collection } from 'firebase/firestore';
import { db } from './firebaseConnector';

// --- API Service Logic (Mirroring Python functions) ---
// This section handles all communication with the Mono API.

const API_BASE_URL = 'https://api.withmono.com';
// IMPORTANT: For production, this key must be kept on a backend server.
// const SECRET_KEY = 'live_sk_f6cgvt4md9o6e2h0x2ho';
  // const SECRET_KEY = 'test_sk_rslkrmp9f62zvu6waj1c';
  const SECRET_KEY = 'live_sk_aowc558p7xm9my7bf4oi';

const monoApiService = {
  /**
   * Creates a new customer or retrieves the ID if they already exist.
   * Mirrors the `create_or_get_customer` Python function.
   * @param {object} customerDetails - Contains firstName, lastName, email, bvn, etc.
   * @returns {Promise<string>} The customer ID.
   */

  async createOrGetCustomer(customerDetails) {
    const payload = {
      // firstName: customerDetails.firstName,
      // lastName: customerDetails.lastName,
      // email: customerDetails.email,
      // address: customerDetails.address || "N/A",
      // phone: customerDetails.phone,
      email: "samuelolamide@gmail.com",
  firstName: "Samuel",
  lastName: "Olamide",
  address: "Agungi, Lagos",
  phone: "08012345678",
      identity: {
        type: "bvn",
        number: customerDetails.bvn,
      },
    };

    const response = await fetch(`${API_BASE_URL}/v2/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'mono-sec-key': SECRET_KEY,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('New customer created with ID:', result.data.id);
      return result.data.id;
    }

    // Gracefully handle "customer already exists" error
    if (result.message?.toLowerCase().includes('customer already exists')) {
      const existingId = result.data?.existing_customer?.id;
      if (existingId) {
        console.log('Customer already exists. Using existing ID:', existingId);
        return existingId;
      }
    }

    // For all other errors, throw a clear message.
    throw new Error(result.message || 'Failed to process customer profile.');
  },

  /**
   * Initiates a Direct Debit mandate.
   * Mirrors the `initiate_mandate` Python function.
   * @param {object} mandatePayload - The fully constructed payload.
   * @returns {Promise<object>} The mandate data from Mono, including mono_url.
   */
  async initiateMandate(mandatePayload) {
    const response = await fetch(`${API_BASE_URL}/v2/payments/initiate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'mono-sec-key': SECRET_KEY,
      },
      body: JSON.stringify(mandatePayload),
      
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Mandate initiated successfully.');
      return result.data;
    }

    // Extract detailed error message from validation failures
    const errorMessage = result.data?.[0]?.message || result.message || 'Mandate creation failed.';
    throw new Error(errorMessage);
  }
};


const ReviewConsent = ({ formData, onSubmit }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [applicationId, setApplicationId] = useState('');

  const dbref = collection(db, "loanApplications");
  


  const handleCheckboxChange = (e) => {
    setConsentChecked(e.target.checked);
    if (e.target.checked) setError(null);
  };

  const handleAuthorizeAndSubmit = async () => {
    if (!consentChecked) {
      setError('You must authorize automatic debit to proceed.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {

      if (!formData.bvn) throw new Error("BVN is a required field.");

      const customerId = await monoApiService.createOrGetCustomer(formData);

      // const formatDateForAPI = (date) => date.toISOString().split('T')[0];
      const formatDateForAPI = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      const startDate = new Date();
      const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate()); // 1 year from now
      // const initialDebitDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1); // Tomorrow
      const initialDebitDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

      const mandateAmount = Number(formData.monthlyPayment) * 100;
      const minimumDue = Math.ceil(Number(mandateAmount) / 2);
      console.log("Amount ", mandateAmount);
      const mandatePayload = {
        type: "recurring-debit",
        debit_type: "fixed",
        mandate_type: "gsm",
        customer: { id: customerId },

        amount: mandateAmount,
        initial_debit_amount: mandateAmount,  // Must be <= amount and >= 20000
        minimum_due: minimumDue,
        frequency: "monthly",
        grace_period: 6,
        retrial_frequency: 1,
        reference: `fee${Date.now()}`,
        description: `Monthly fee repayment for ${formData.program || 'education'} program`,
        start_date: formatDateForAPI(startDate),
        end_date: formatDateForAPI(endDate),
        initial_debit_date: formatDateForAPI(initialDebitDate),
        redirect_url: `${window.location.origin}/payment-success`,
        meta: {
          loan_program: formData.program,
          application_id: `APP_${Date.now()}`,
        },
      };

      console.log("Submitting Final Mandate Payload:", mandatePayload);

      // Step 3: Initiate the Mandate
      const mandateData = await monoApiService.initiateMandate(mandatePayload);

      // Step 4: Handle Success
      if (mandateData?.mono_url) {
        console.log('SUCCESS! Redirecting to Mono for authorization:', mandateData.mono_url);
        window.open(mandateData.mono_url, 'mono-auth', 'width=500,height=700,scrollbars=yes,resizable=yes');
        handleSubmit();
        if (onSubmit) onSubmit({ ...formData, mandateId: mandateData.mandate_id, customerId });
      } else {
        throw new Error('Mandate setup succeeded, but no authorization URL was returned.');
      }

    } catch (err) {
      console.error("ERROR during direct debit setup:", err);
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);
    setMessage('');

    try {
      console.log('Submitting form data:', formData);

      const result = await createLoanApplication(formData);


      if (result.success) {
        setMessage('Loan application submitted successfully!');
        setApplicationId(result.applicationId);
        // setSubmissionSuccess(true);
        console.log("Firestore Document written with ID: ", result.id);

        // Move to success page
        // setCurrentStep(6);

        console.log('Application ID:', result.applicationId);
        console.log('Document ID:', result.id);
      } else {
        setMessage(`Error: ${result.error}`);
        setError(result.error);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage(`Error: ${error.message}`);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Review & Consent</h2>

      {/* --- UI Elements --- */}
      {/* ... Your JSX for Application Summary ... */}

      <div className="bg-yellow-600/20 border border-yellow-400/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Automatic Debit Authorization
        </h3>
        <div className="space-y-4">
          <p className="text-white/90 text-sm leading-relaxed">
            By checking the box below, you authorize automatic monthly deductions...
          </p>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="autoDebitConsent"
              checked={consentChecked}
              onChange={handleCheckboxChange}
              className="mt-1 w-5 h-5 text-purple-600 bg-white/10 border-white/20 rounded"
            />
            <label htmlFor="autoDebitConsent" className="text-white text-sm">
              I authorize automatic debit of monthly loan payments...
            </label>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm mt-2 p-3 bg-red-500/10 rounded-md">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleAuthorizeAndSubmit}
              disabled={isProcessing}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Setting up...
                </>
              ) : (
                'Authorize & Submit Application'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewConsent;