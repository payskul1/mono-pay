import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-4">
          Your information has been submitted successfully. Our sales team will contact you soon.
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">Redirecting in a moment...</p>
      </div>
    </div>
  );
};

export default SuccessMessage;