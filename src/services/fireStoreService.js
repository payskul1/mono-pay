import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
  limit, 
  writeBatch,
  setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../connector/firebaseConnector';

// Collection name for loan applications
const COLLECTION_NAME = 'loanApplications';

const cleanData = (data) => {
    const cleaned = {};
    Object.keys(data).forEach(key => {
        if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
            cleaned[key] = data[key];
        }
    });
    return cleaned;
};

// export const saveApplicationData = async (applicationId, stepData, stepNumber) => {
//     try {
//         const applicationRef = doc(db, 'applications', applicationId);
        
//         // Check if document exists
//         const docSnap = await getDoc(applicationRef);
        
//         if (docSnap.exists()) {
//             // Update existing document
//             await updateDoc(applicationRef, {
//                 [`step${stepNumber}`]: stepData,
//                 lastUpdated: serverTimestamp(),
//                 currentStep: stepNumber
//             });
//         } else {
//             // Create new document
//             await setDoc(applicationRef, {
//                 [`step${stepNumber}`]: stepData,
//                 createdAt: serverTimestamp(),
//                 lastUpdated: serverTimestamp(),
//                 currentStep: stepNumber,
//                 status: 'in_progress'
//             });
//         }
        
//         return { success: true };
//     } catch (error) {
//         console.error('Error saving application data:', error);
//         return { success: false, error: error.message };
//     }
// };

export const saveApplicationData = async (applicationId, stepData, stepNumber) => {
    try {
        const applicationRef = doc(db, 'applications', applicationId);
        
        // Clean the step data to remove undefined values
        const cleanedStepData = cleanData(stepData);
        
        // Only proceed if there's actual data to save
        if (Object.keys(cleanedStepData).length === 0) {
            console.log('No valid data to save for step', stepNumber);
            return { success: true };
        }
        
        // Check if document exists
        const docSnap = await getDoc(applicationRef);
        
        if (docSnap.exists()) {
            // Update existing document
            await updateDoc(applicationRef, {
                [`step${stepNumber}`]: cleanedStepData,
                lastUpdated: serverTimestamp(),
                currentStep: stepNumber
            });
        } else {
            // Create new document
            await setDoc(applicationRef, {
                [`step${stepNumber}`]: cleanedStepData,
                createdAt: serverTimestamp(),
                lastUpdated: serverTimestamp(),
                currentStep: stepNumber,
                status: 'in_progress'
            });
        }
        
        return { success: true };
    } catch (error) {
        console.error('Error saving application data:', error);
        return { success: false, error: error.message };
    }
};

export const getApplicationData = async (applicationId) => {
    try {
        const applicationRef = doc(db, 'applications', applicationId);
        const docSnap = await getDoc(applicationRef);
        
        if (docSnap.exists()) {
            return { success: true, data: docSnap.data() };
        } else {
            return { success: false, error: 'Application not found' };
        }
    } catch (error) {
        console.error('Error fetching application data:', error);
        return { success: false, error: error.message };
    }
};

export const finalizeApplication = async (applicationId, finalData) => {
    try {
        const applicationRef = doc(db, 'applications', applicationId);
        
        await updateDoc(applicationRef, {
            ...finalData,
            status: 'submitted',
            submittedAt: serverTimestamp(),
            lastUpdated: serverTimestamp()
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error finalizing application:', error);
        return { success: false, error: error.message };
    }
};

// Create a new loan application
export const createLoanApplication = async (formData) => {
  try {
    // Handle file upload if profile image exists
    let profileImageUrl = null;
    if (formData.profileImage) {
      profileImageUrl = await uploadProfileImage(formData.profileImage, formData.email);
    }

    // Generate application ID
    const applicationId = `LN${Date.now()}`;

    // Prepare data for Firestore (remove file object and add URL)
    const dataToSave = {
      ...formData,
      applicationId,
      profileImage: profileImageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'pending_review', // Default status
      // Add calculated fields
      totalRepaymentAmount: calculateTotalRepayment(formData.loanAmount, formData.repaymentTerm),
      applicationDate: new Date().toISOString(),
      // Add notification status
      emailSent: false,
      smsNotificationSent: false
    };

    // Add document to Firestore
    const docRef = await setDoc(doc(db, COLLECTION_NAME), dataToSave);

    // const docRef = await addDoc(collection(db, COLLECTION_NAME), dataToSave);
    console.log("Firestore Document written with ID: ", docRef.id);
    
    // Send notification email (you can implement this)
    await sendApplicationNotification(dataToSave);
    
    return {
      success: true,
      id: docRef.id,
      applicationId,
      message: 'Loan application submitted successfully!'
    };
  } catch (error) {
    console.error('Error creating loan application:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Calculate total repayment amount
const calculateTotalRepayment = (loanAmount, repaymentTerm) => {
  const principal = parseFloat(loanAmount) || 0;
  const term = parseFloat(repaymentTerm) || 0;
  const interestRate = 0.165; // 16.5% annual interest rate
  
  // Simple interest calculation for student loans
  const totalInterest = principal * interestRate * term;
  return principal + totalInterest;
};

// Upload profile image to Firebase Storage
const uploadProfileImage = async (file, userEmail) => {
  try {
    const timestamp = new Date().getTime();
    const fileName = `profile-images/${userEmail}_${timestamp}`;
    const storageRef = ref(storage, fileName);
    
    // Upload file
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Update an existing loan application
export const updateLoanApplication = async (id, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Loan application updated successfully!'
    };
  } catch (error) {
    console.error('Error updating loan application:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Update application status
export const updateApplicationStatus = async (id, newStatus, adminNotes = '') => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status: newStatus,
      adminNotes,
      statusUpdatedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Application status updated successfully!'
    };
  } catch (error) {
    console.error('Error updating application status:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get a specific loan application by ID
export const getLoanApplication = async (id) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        success: true,
        data: { id: docSnap.id, ...docSnap.data() }
      };
    } else {
      return {
        success: false,
        error: 'Loan application not found'
      };
    }
  } catch (error) {
    console.error('Error getting loan application:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get loan application by application ID
export const getLoanApplicationByAppId = async (applicationId) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('applicationId', '==', applicationId)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        success: true,
        data: { id: doc.id, ...doc.data() }
      };
    } else {
      return {
        success: false,
        error: 'Application not found'
      };
    }
  } catch (error) {
    console.error('Error getting loan application by app ID:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all loan applications (with optional filtering)
export const getLoanApplications = async (filters = {}) => {
  try {
    let q = collection(db, COLLECTION_NAME);
    
    // Apply filters if provided
    if (filters.email) {
      q = query(q, where('email', '==', filters.email));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters.institution) {
      q = query(q, where('institution', '==', filters.institution));
    }
    if (filters.studentId) {
      q = query(q, where('studentId', '==', filters.studentId));
    }
    
    // Add limit if specified
    if (filters.limit) {
      q = query(q, limit(filters.limit));
    }
    
    // Order by creation date (newest first)
    q = query(q, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    const applications = [];
    
    querySnapshot.forEach((doc) => {
      applications.push({ id: doc.id, ...doc.data() });
    });
    
    return {
      success: true,
      data: applications
    };
  } catch (error) {
    console.error('Error getting loan applications:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get applications with real-time updates
export const subscribeToLoanApplications = (callback, filters = {}) => {
  try {
    let q = collection(db, COLLECTION_NAME);
    
    // Apply filters
    if (filters.email) {
      q = query(q, where('email', '==', filters.email));
    }
    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }
    
    // Order by creation date
    q = query(q, orderBy('createdAt', 'desc'));
    
    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const applications = [];
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      callback(applications);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to loan applications:', error);
    return null;
  }
};

// Delete a loan application
export const deleteLoanApplication = async (id) => {
  try {
    // Get the document first to check if it has a profile image
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      
      // Delete profile image from storage if it exists
      if (data.profileImage) {
        try {
          const imageRef = ref(storage, data.profileImage);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.warn('Error deleting profile image:', imageError);
        }
      }
    }
    
    // Delete the document
    await deleteDoc(docRef);
    
    return {
      success: true,
      message: 'Loan application deleted successfully!'
    };
  } catch (error) {
    console.error('Error deleting loan application:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get applications statistics
export const getApplicationStats = async () => {
  try {
    const applications = await getLoanApplications();
    
    if (!applications.success) {
      throw new Error(applications.error);
    }
    
    const stats = {
      total: applications.data.length,
      pending: applications.data.filter(app => app.status === 'pending_review').length,
      approved: applications.data.filter(app => app.status === 'approved').length,
      rejected: applications.data.filter(app => app.status === 'rejected').length,
      disbursed: applications.data.filter(app => app.status === 'disbursed').length,
      totalLoanAmount: applications.data.reduce((sum, app) => sum + (parseFloat(app.loanAmount) || 0), 0)
    };
    
    return {
      success: true,
      data: stats
    };
  } catch (error) {
    console.error('Error getting application stats:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Send notification email (placeholder - implement with your email service)
const sendApplicationNotification = async (applicationData) => {
  try {
    // Implement email notification logic here
    // You can use services like EmailJS, SendGrid, or Firebase Functions
    console.log('Sending notification email for application:', applicationData.applicationId);
    
    // Example: Update the emailSent flag
    // await updateDoc(doc(db, COLLECTION_NAME, applicationData.id), {
    //   emailSent: true,
    //   emailSentAt: serverTimestamp()
    // });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { success: false, error: error.message };
  }
};

// Batch operations for admin
export const batchUpdateApplications = async (applicationIds, updateData) => {
  try {
    const batch = writeBatch(db);
    
    applicationIds.forEach(id => {
      const docRef = doc(db, COLLECTION_NAME, id);
      batch.update(docRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
    
    return {
      success: true,
      message: `${applicationIds.length} applications updated successfully!`
    };
  } catch (error) {
    console.error('Error in batch update:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Export validation data functions
export const validateStudentData = async (studentId, feeAmount) => {
  try {
    // You can store validation data in Firestore instead of hardcoding
    const validationQuery = query(
      collection(db, 'validationData'),
      where('matric', '==', studentId)
    );
    
    const querySnapshot = await getDocs(validationQuery);
    
    if (querySnapshot.empty) {
      return {
        valid: false,
        error: 'Student ID not found in records'
      };
    }
    
    const studentRecord = querySnapshot.docs[0].data();
    
    if (parseFloat(feeAmount) !== studentRecord.fee) {
      return {
        valid: false,
        error: `Fee amount should be ₦${studentRecord.fee.toLocaleString()}`
      };
    }
    
    return {
      valid: true,
      studentData: studentRecord
    };
  } catch (error) {
    console.error('Error validating student data:', error);
    return {
      valid: false,
      error: error.message
    };
  }
};