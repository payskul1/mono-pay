import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { createLoanApplication } from '../services/fireStoreService';
import { collection } from 'firebase/firestore';
import { db } from './firebaseConnector';
import { createOrGetCustomer, initiateMandate } from '../services/monoApi';

const API_BASE_URL = 'https://api.withmono.com';

const ReviewConsent = ({ formData, onSubmit }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [applicationId, setApplicationId] = useState('');

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

      const customerId = await createOrGetCustomer(formData);


      const formatDateForAPI = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      // Extract repayment term from form data (assuming it's a number representing months)
      // const repaymentTermMonths = parseInt(formData.repaymentTerm); // e.g., 3 for "3 months"
        const repaymentTermMonths = (parseFloat(formData.repaymentTerm) || 0) * 12;


      const today = new Date();

      // Set start date to next month, one day before today's date
      const startDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);

      // Calculate initial debit date (1 day after start date)
      const initialDebitDate = new Date(startDate);
      initialDebitDate.setDate(startDate.getDate() + 1);

      // Calculate end date from initial debit date + repayment term months
      const endDate = new Date(initialDebitDate.getFullYear(), initialDebitDate.getMonth() + repaymentTermMonths -1, initialDebitDate.getDate());

      console.log('Today:', today.toDateString());
      console.log('Start Date:', startDate.toDateString());
      console.log('Initial Debit Date:', initialDebitDate.toDateString());
      console.log('End Date:', endDate.toDateString());
      console.log('Repayment Term:', repaymentTermMonths, 'months');

      // Example scenarios:
      // If today is August 8, 2025 and repayment term is 3 months:
      // Today: Fri Aug 08 2025
      // Start Date: Sat Sep 07 2025 (one day before today's date in next month)
      // Initial Debit Date: Sun Sep 08 2025
      // End Date: Sun Dec 08 2025

      // If today is August 29, 2025 and repayment term is 3 months:
      // Today: Fri Aug 29 2025
      // Start Date: Sat Sep 28 2025 (one day before today's date in next month)
      // Initial Debit Date: Sun Sep 29 2025
      // End Date: Sun Dec 29 2025
      // const startDate = new Date();
      // const endDate = new Date(startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate()); // 1 year from now
      // const initialDebitDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

      const mandateAmount = Math.round(Number(formData.monthlyPayment) * 100);
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
        retrial_frequency: 3,
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

      console.log("total ", (repaymentTermMonths * mandateAmount));

      console.log("Submitting Final Mandate Payload:", mandatePayload);

      // Step 3: Initiate the Mandate
      // const mandateData = await monoApiServi.initiateMandate(mandatePayload);
      const mandateData = await initiateMandate(mandatePayload);


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
