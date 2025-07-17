const StudentLoan = () => {
    const [currentStep, setCurrentStep] = useState(1);
    // const [validationErrors, setValidationErrors] = useState({});
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

    const dbref = collection(db, "formData");



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
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // if (validationErrors[name]) {
        //     setValidationErrors(prev => ({
        //         ...prev,
        //         [name]: ''
        //     }));
        // }

        // if (name === 'studentId' || name === 'loanAmount') {
        //     setTimeout(() => {
        //         validateMatricAndFee();
        //     }, 100);
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
        const updatedFormData = {
            ...formData,
            [e.target.name]: e.target.value
        };

        // Validate immediately
        // const errors = validateMatricAndFee(updatedFormData, validationData);
        // setValidationErrors(errors);

        // Calculate monthly payment if it's loan amount or repayment term
        // if (e.target.name === 'loanAmount') {
        //     calculateMonthlyPayment(formData.repaymentTerm, e.target.value);
        // }
    };

    // const canProceed = !validationErrors.studentId && !validationErrors.loanAmount &&
    //     formData.studentId && formData.loanAmount;

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

    // const validateMatricAndFee = () => {
    //     const errors = {};
    //     const studentRecord = validationData.find(record => record.matric === formData.studentId);

    //     if (formData.studentId && !studentRecord) {
    //         errors.studentId = 'Matric number not found in our records';
    //     }

    //     if (formData.loanAmount && studentRecord) {
    //         const enteredAmount = parseFloat(formData.loanAmount);
    //         if (enteredAmount !== studentRecord.fee) {
    //             errors.loanAmount = `Fee amount should be ₦${studentRecord.fee.toLocaleString()} for matric ${studentRecord.matric}`;
    //         }
    //     }

    //     setValidationErrors(errors);
    //     return Object.keys(errors).length === 0;
    // };

    // const validateMatricAndFee = (formData, validationData) => {
    //     const errors = {};
    //     const trimmedMatric = formData.studentId?.trim();
    //     const studentRecord = validationData.find(record => record.matric === trimmedMatric);

    //     if (trimmedMatric && !validateIdFormat(trimmedMatric)) {
    //         errors.studentId = 'ID must be in format: 25/TFR/001';
    //         return errors; 
    //     }


    //     if (trimmedMatric && !studentRecord && validateIdFormat(trimmedMatric)) {
    //         errors.studentId = 'ID not found in our records';
    //     }

    //     if (formData.loanAmount && studentRecord) {
    //         const enteredAmount = Number(formData.loanAmount);
    //         const expectedAmount = Number(studentRecord.fee);

    //         if (!isNaN(enteredAmount) && !isNaN(expectedAmount)) {
    //             if (enteredAmount !== expectedAmount) {
    //                 errors.loanAmount = `Fee amount should be ₦${expectedAmount.toLocaleString()} for ID ${studentRecord.matric}`;
    //             }
    //         } else {
    //             errors.loanAmount = 'Invalid amount entered';
    //         }
    //     }

    //     return errors;
    // };

    // useEffect(() => {
    //     const errors = validateMatricAndFee(formData, validationData);
    //     setValidationErrors(errors);
    // }, [formData.studentId, formData.loanAmount, validationData]);

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
        // const hasRequiredFields = requiredFields.every(field => formData[field]?.toString().trim());

        const hasRequiredFields = requiredFields.every(field => {
            const value = formData[field];
            return value !== null && value !== undefined && value.toString().trim() !== '';
        });
        
        if (step === 4) { // Changed from 5 to 4 since BankAccount is now step 4
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

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        if (!isStepValid(currentStep)) { // Added currentStep parameter
            alert('Please complete all required information and provide consent for automatic debit.');
            return;
        }

        const loanApplication = {
            ...formData,
            applicationId: 'LN' + Date.now(),
            applicationDate: new Date().toISOString(),
            status: 'pending_review'
        };

      
         e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await createLoanApplication(formData);
      
      if (result.success) {
        setMessage('Loan application submitted successfully!');
        // Reset form or redirect user
        console.log('Application ID:', result.id);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }

        console.log('Loan Application Submitted:', loanApplication);
        alert('Student loan application submitted successfully! You will receive an email confirmation shortly.');

        setCurrentStep(7);
    };

    const renderCurrentStep = () => {
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
            case 4: // BankAccount step
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
            case 5: // ReviewConsent step (changed from case 6)
                return (
                    <ReviewConsent
                        formData={formData}
                        handleInputChange={handleInputChange}
                    />
                );
            case 6: // SuccessPage step (changed from case 7)
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
                );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4 rounded-lg">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 mt-4">
                    <h1 className="text-4xl font-bold text-white mb-2">Student Registration</h1>
                    <p className="text-purple-200">Complete your profile to get started</p>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 lg:p-8 shadow-2xl border border-white/20">
                    <StepIndicator steps={steps} currentStep={currentStep} />

                    <div className="min-h-[500px]">
                        {renderCurrentStep()}
                    </div>

                    {/* Show navigation buttons for all steps except the final success page */}
                    {currentStep < 6 && ( // Changed from steps.length to 6 to exclude success page
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
}
export default StudentLoan;