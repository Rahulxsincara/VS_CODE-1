// Firebase configuration for My Library
// This configuration allows centralized user management across devices

// Check if we're running in a browser environment
if (typeof window !== 'undefined') {
  // Try to initialize Firebase
  try {
    // Firebase app configuration
    const firebaseConfig = {
      // TODO: Replace with your actual Firebase project configuration
      // For now, using placeholder values - you'll need to create your own Firebase project
      apiKey: "YOUR_API_KEY",
      authDomain: "your-project-id.firebaseapp.com",
      projectId: "your-project-id",
      storageBucket: "your-project-id.appspot.com",
      messagingSenderId: "123456789012",
      appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz"
    };

    // Only initialize Firebase if the API key is valid
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize Firebase services
      const auth = firebase.auth();
      const db = firebase.firestore();

      // Export for use in other modules
      window.firebaseAuth = auth;
      window.firebaseDb = db;
    } else {
      console.warn("Firebase not configured - using localStorage fallback");
      // Set up fallback functions
      window.firebaseAuth = undefined;
      window.firebaseDb = undefined;
    }
  } catch (error) {
    console.warn("Firebase initialization failed - using localStorage fallback:", error);
    // Set up fallback functions
    window.firebaseAuth = undefined;
    window.firebaseDb = undefined;
  }
} else {
  // Not in browser environment
  window.firebaseAuth = undefined;
  window.firebaseDb = undefined;
}