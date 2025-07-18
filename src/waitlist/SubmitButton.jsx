import React from 'react';

const SubmitButton = ({ onSubmit, isSubmitting }) => {
  return (
    <div className="text-center pt-6">
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className={`${
          isSubmitting 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-purple-800 hover:bg-purple-900 hover:shadow-xl'
        } text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg flex items-center justify-center mx-auto`}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Submitting...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>
    </div>
  );
};

export default SubmitButton;