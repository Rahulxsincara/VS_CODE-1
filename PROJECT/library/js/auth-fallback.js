// Fallback authentication system for when Firebase is not configured
// This maintains compatibility with the existing localStorage implementation

class FallbackAuth {
  constructor() {
    this.initializeDefaultUsers();
  }

  // Initialize default users if they don't exist
  initializeDefaultUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if admin user already exists
    const adminExists = users.some(user => user.studentId === 'admin');
    
    if (!adminExists) {
      // Create default admin user
      const adminUser = {
        id: 'admin-' + Date.now(),
        name: 'Administrator',
        studentId: 'admin',
        password: 'admin123', // Default password - should be changed after first login
        year: '4',
        registered: new Date().toISOString(),
        lastLogin: null
      };
      
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Admin user created with default credentials');
    }
  }

  // Simulate Firebase authentication sign in
  signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      // Extract student ID from email (studentId@mylibrary.com)
      const studentId = email.replace('@mylibrary.com', '');
      
      // Validate credentials
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.studentId === studentId && u.password === password);
      
      if (user) {
        // Update last login time
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('users', JSON.stringify(users));
        
        // Resolve with user credential object similar to Firebase
        resolve({
          user: {
            uid: user.id || studentId,
            email: email
          }
        });
      } else {
        // Reject with error object similar to Firebase
        reject({
          code: 'auth/invalid-credentials',
          message: 'Invalid credentials'
        });
      }
    });
  }

  // Simulate Firebase authentication create user
  createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      // Extract student ID from email (studentId@mylibrary.com)
      const studentId = email.replace('@mylibrary.com', '');
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find(u => u.studentId === studentId);
      
      if (existingUser) {
        // Reject with error object similar to Firebase
        reject({
          code: 'auth/email-already-in-use',
          message: 'User with this student ID already exists'
        });
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: '', // Will be updated when user data is saved
        studentId: studentId,
        password: password,
        year: '', // Will be updated when user data is saved
        registered: new Date().toISOString(),
        lastLogin: null
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Resolve with user credential object similar to Firebase
      resolve({
        user: {
          uid: newUser.id,
          email: email
        }
      });
    });
  }

  // Simulate Firebase sign out
  signOut() {
    return new Promise((resolve) => {
      // Nothing to do for localStorage implementation
      resolve();
    });
  }
}

// Fallback Firestore implementation
class FallbackFirestore {
  constructor() {
    // Nothing to initialize
  }

  // Simulate Firestore collection
  collection(collectionName) {
    return new FallbackCollection(collectionName);
  }
}

// Fallback Collection implementation
class FallbackCollection {
  constructor(collectionName) {
    this.collectionName = collectionName;
  }

  // Simulate Firestore doc
  doc(docId) {
    return new FallbackDocument(this.collectionName, docId);
  }

  // Simulate Firestore where query
  where(field, operator, value) {
    return new FallbackQuery(this.collectionName, field, operator, value);
  }

  // Simulate Firestore add
  add(data) {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Find user by studentId and update
          const studentId = data.studentId;
          const userIndex = users.findIndex(u => u.studentId === studentId);
          
          if (userIndex !== -1) {
            // Update existing user
            users[userIndex] = { ...users[userIndex], ...data };
            localStorage.setItem('users', JSON.stringify(users));
            
            resolve({
              id: users[userIndex].id
            });
          } else {
            reject(new Error('User not found'));
          }
        } else {
          // For other collections, just resolve
          resolve({
            id: Date.now().toString()
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Fallback Document implementation
class FallbackDocument {
  constructor(collectionName, docId) {
    this.collectionName = collectionName;
    this.docId = docId;
  }

  // Simulate Firestore get
  get() {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find(u => u.id === this.docId || u.studentId === this.docId);
          
          if (user) {
            resolve({
              exists: true,
              data: () => user
            });
          } else {
            resolve({
              exists: false,
              data: () => null
            });
          }
        } else {
          // For other collections, just resolve with empty data
          resolve({
            exists: false,
            data: () => null
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Simulate Firestore set
  set(data) {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Find user by ID or studentId and update
          const userIndex = users.findIndex(u => u.id === this.docId || u.studentId === this.docId);
          
          if (userIndex !== -1) {
            // Update existing user
            users[userIndex] = { ...users[userIndex], ...data, id: this.docId };
          } else {
            // Add new user
            users.push({ ...data, id: this.docId });
          }
          
          localStorage.setItem('users', JSON.stringify(users));
          resolve();
        } else {
          // For other collections, just resolve
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Simulate Firestore update
  update(data) {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const userIndex = users.findIndex(u => u.id === this.docId || u.studentId === this.docId);
          
          if (userIndex !== -1) {
            // Update existing user
            users[userIndex] = { ...users[userIndex], ...data };
            localStorage.setItem('users', JSON.stringify(users));
            resolve();
          } else {
            reject(new Error('User not found'));
          }
        } else {
          // For other collections, just resolve
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // Simulate Firestore delete
  delete() {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const filteredUsers = users.filter(u => u.id !== this.docId && u.studentId !== this.docId);
          
          if (filteredUsers.length !== users.length) {
            localStorage.setItem('users', JSON.stringify(filteredUsers));
            resolve();
          } else {
            reject(new Error('User not found'));
          }
        } else {
          // For other collections, just resolve
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Fallback Query implementation
class FallbackQuery {
  constructor(collectionName, field, operator, value) {
    this.collectionName = collectionName;
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  // Simulate Firestore get
  get() {
    return new Promise((resolve, reject) => {
      try {
        if (this.collectionName === 'users') {
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          
          // Apply filter
          let filteredUsers = [];
          if (this.operator === '==') {
            filteredUsers = users.filter(u => u[this.field] === this.value);
          }
          
          // Convert to query snapshot format
          const docs = filteredUsers.map(user => ({
            data: () => user
          }));
          
          resolve({
            docs: docs,
            empty: docs.length === 0,
            forEach: (callback) => {
              docs.forEach(callback);
            }
          });
        } else {
          // For other collections, just resolve with empty data
          resolve({
            docs: [],
            empty: true,
            forEach: (callback) => {}
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

// Initialize fallback if Firebase is not available
if (typeof firebaseAuth === 'undefined' || typeof firebaseDb === 'undefined') {
  console.log("Firebase not configured - using fallback authentication system");
  window.firebaseAuth = new FallbackAuth();
  window.firebaseDb = new FallbackFirestore();
}