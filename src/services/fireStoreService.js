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
  serverTimestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../connector/firebaseConnector';

// Collection name for loan applications
const COLLECTION_NAME = 'loanApplications';

// Create a new loan application
export const createLoanApplication = async (formData) => {
  try {
    // Handle file upload if profile image exists
    let profileImageUrl = null;
    if (formData.profileImage) {
      profileImageUrl = await uploadProfileImage(formData.profileImage, formData.email);
    }

    // Prepare data for Firestore (remove file object and add URL)
    const dataToSave = {
      ...formData,
      profileImage: profileImageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: 'pending' // Default status
    };

    // Add document to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), dataToSave);
    
    return {
      success: true,
      id: docRef.id,
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

// Upload profile image to Firebase Storage
const uploadProfileImage = async (file, userEmail) => {
  try {
    const timestamp = new Date().getTime();
    const fileName = `profile-images/${userEmail}_${timestamp}`;
    const storageRef = ref(storage, fileName);
    
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

// Delete a loan application
export const deleteLoanApplication = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
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