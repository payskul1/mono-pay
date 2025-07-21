import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA6QYSDLO8rarMZye6BI68kN4YAA9o9pxY",
  authDomain: "payskul-2242f.firebaseapp.com",
  projectId: "payskul-2242f",
  storageBucket: "payskul-2242f.firebasestorage.app",
  messagingSenderId: "127420370068",
  appId: "1:127420370068:web:9996eb2a1759ef38deb881",
  measurementId: "G-QZZWPCL89X"
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// export const db = getFirestore(app);


const COLLECTION_NAME = 'waitlistApplication';

export const db = getFirestore(app);

// Database Service Class
class DatabaseService {
  constructor() {
    this.db = db;
    this.collections = {
      WAITLIST: 'waitlist',
      USERS: 'users',
      SCHOOLS: 'schools',
      SUBMISSIONS: 'form_submissions'
    };
  }

  // Generic method to save data to any collection
  async saveToCollection(collectionName, data) {
    try {
      const docRef = await addDoc(collection(this.db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      console.log(`Document written to ${collectionName} with ID: `, docRef.id);
      return {
        success: true,
        id: docRef.id,
        message: 'Data saved successfully'
      };
    } catch (error) {
      console.error(`Error adding document to ${collectionName}: `, error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to save data'
      };
    }
  }

  // Save waitlist form data
  async saveWaitlistData(formData) {
    try {
      // Validate required fields
      const requiredFields = ['contactName', 'contactEmail', 'schoolName'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        return {
          success: false,
          error: `Missing required fields: ${missingFields.join(', ')}`,
          message: 'Please fill in all required fields'
        };
      }

      // Prepare data for database
      const waitlistData = {
        // Contact Information
        contact: {
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone || '',
          role: formData.contactRole || ''
        },
        
        // School Information
        school: {
          name: formData.schoolName,
          type: formData.schoolType || '',
          address: {
            street: formData.schoolAddress || '',
            city: formData.schoolCity || '',
            // state: formData.schoolState || '',
            // zip: formData.schoolZip || ''
          },
          website: formData.schoolWebsite || ''
        },
        
        // Student Information
        students: {
          total: parseInt(formData.totalStudents) || 0,
          ageGroups: formData.ageGroups || [],
          newPerYear: parseInt(formData.newStudentsPerYear) || 0
        },
        
        // Program Details
        // program: {
        //   interest: formData.programInterest || '',
        //   startDate: formData.startDate || '',
        //   currentProvider: formData.currentProvider || ''
        // },
        
        // Additional Information
        additional: {
          additionalInfo: formData.specificNeeds || '',
          marketingSource: formData.marketingSource || '',
          comments: formData.additionalComments || ''
        },
        
        // Metadata
        status: 'new',
        priority: this.calculatePriority(formData),
        submissionId: `WL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ipAddress: null, 
        userAgent: navigator.userAgent
      };

      return await this.saveToCollection(this.collections.WAITLIST, waitlistData);
      
    } catch (error) {
      console.error('Error in saveWaitlistData:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to save waitlist data'
      };
    }
  }

  // Calculate priority based on form data
  calculatePriority(formData) {
    let priority = 'medium';
    const totalStudents = parseInt(formData.totalStudents) || 0;
    
    if (totalStudents > 500) {
      priority = 'high';
    } else if (totalStudents > 100) {
      priority = 'medium';
    } else {
      priority = 'low';
    }
    
    // Boost priority for certain roles
    if (['principal', 'administrator'].includes(formData.contactRole)) {
      priority = priority === 'low' ? 'medium' : 'high';
    }
    
    return priority;
  }

  // Get all waitlist entries
  async getWaitlistEntries(filters = {}) {
    try {
      let q = collection(this.db, this.collections.WAITLIST);
      
      // Apply filters
      if (filters.status) {
        q = query(q, where('status', '==', filters.status));
      }
      
      if (filters.priority) {
        q = query(q, where('priority', '==', filters.priority));
      }
      
      // Order by creation date
      q = query(q, orderBy('createdAt', 'desc'));
      
      // Apply limit
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }
      
      const querySnapshot = await getDocs(q);
      const entries = [];
      
      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        success: true,
        data: entries,
        count: entries.length
      };
      
    } catch (error) {
      console.error('Error getting waitlist entries:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // Get single waitlist entry by ID
  async getWaitlistEntry(id) {
    try {
      const docRef = doc(this.db, this.collections.WAITLIST, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          success: true,
          data: {
            id: docSnap.id,
            ...docSnap.data()
          }
        };
      } else {
        return {
          success: false,
          error: 'Document not found',
          data: null
        };
      }
    } catch (error) {
      console.error('Error getting waitlist entry:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }

  // Update waitlist entry status
  async updateWaitlistStatus(id, status, notes = '') {
    try {
      const docRef = doc(this.db, this.collections.WAITLIST, id);
      await updateDoc(docRef, {
        status: status,
        statusNotes: notes,
        updatedAt: serverTimestamp()
      });
      
      return {
        success: true,
        message: 'Status updated successfully'
      };
    } catch (error) {
      console.error('Error updating status:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to update status'
      };
    }
  }

  // Delete waitlist entry
  async deleteWaitlistEntry(id) {
    try {
      await deleteDoc(doc(this.db, this.collections.WAITLIST, id));
      return {
        success: true,
        message: 'Entry deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting entry:', error);
      return {
        success: false,
        error: error.message,
        message: 'Failed to delete entry'
      };
    }
  }

  // Search waitlist entries
  async searchWaitlist(searchTerm) {
    try {
      // Note: Firestore doesn't support full-text search natively
      // You might want to use Algolia or implement a more sophisticated search
      const q = query(
        collection(this.db, this.collections.WAITLIST),
        where('contact.email', '>=', searchTerm),
        where('contact.email', '<=', searchTerm + '\uf8ff')
      );
      
      const querySnapshot = await getDocs(q);
      const results = [];
      
      querySnapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return {
        success: true,
        data: results,
        count: results.length
      };
      
    } catch (error) {
      console.error('Error searching waitlist:', error);
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }

  // Get analytics data
  async getWaitlistAnalytics() {
    try {
      const allEntries = await this.getWaitlistEntries();
      
      if (!allEntries.success) {
        return allEntries;
      }
      
      const data = allEntries.data;
      
      // Calculate statistics
      const totalEntries = data.length;
      const statusCount = data.reduce((acc, entry) => {
        acc[entry.status] = (acc[entry.status] || 0) + 1;
        return acc;
      }, {});
      
      const priorityCount = data.reduce((acc, entry) => {
        acc[entry.priority] = (acc[entry.priority] || 0) + 1;
        return acc;
      }, {});
      
      const schoolTypeCount = data.reduce((acc, entry) => {
        const type = entry.school?.type || 'unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      
      return {
        success: true,
        data: {
          totalEntries,
          statusCount,
          priorityCount,
          schoolTypeCount,
          averageStudents: data.reduce((sum, entry) => sum + (entry.students?.total || 0), 0) / totalEntries || 0
        }
      };
      
    } catch (error) {
      console.error('Error getting analytics:', error);
      return {
        success: false,
        error: error.message,
        data: null
      };
    }
  }
}

// Create and export a single instance

const databaseService = new DatabaseService();

export default databaseService;

// Export specific methods for easier importing
export const {
  saveWaitlistData,
  getWaitlistEntries,
  getWaitlistEntry,
  updateWaitlistStatus,
  deleteWaitlistEntry,
  searchWaitlist,
  getWaitlistAnalytics
} = databaseService;