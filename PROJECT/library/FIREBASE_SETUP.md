# Firebase Setup Guide for My Library

This guide will help you set up Firebase for centralized user authentication and data storage.

## About the Fallback System

This application includes a fallback system that works with localStorage when Firebase is not configured. This means the application will work immediately without any Firebase setup, but user data will be stored locally on each device.

To enable centralized data storage and cross-device access, follow the Firebase setup instructions below.

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter "My Library" as the project name
4. Accept the terms and conditions
5. Disable Google Analytics (optional)
6. Click "Create project"

## Step 2: Register Your Web App

1. In the Firebase Console, click the web icon (</> ) to register a new web app
2. Enter "My Library" as the app name
3. Check "Also set up Firebase Hosting for this app" (optional)
4. Click "Register app"
5. Copy the firebaseConfig object values

## Step 3: Update Firebase Configuration

1. Open `js/firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnopqrstuvwxyz"
};
```

## Step 4: Enable Authentication

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Click the "Sign-in method" tab
4. Enable "Email/Password" sign-in provider
5. Click "Save"

## Step 5: Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Select "Start in test mode"
4. Click "Next"
5. Choose a location closest to you
6. Click "Enable"

## Step 6: Set Up Security Rules

1. In the Firestore Database section, click the "Rules" tab
2. Replace the default rules with these more secure rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admins can read all user documents
    match /users/{userId} {
      allow read: if request.auth != null && 
                  exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
                  get(/databases/$(database)/documents/users/$(request.auth.uid)).data.studentId == 'admin';
    }
    
    // Allow creation of user documents
    match /users/{userId} {
      allow create: if request.auth != null;
    }
  }
}
```

## Step 7: Create Initial Admin User

After deploying your application, you'll need to create an initial admin user:

1. Register a new user with:
   - Name: Administrator
   - Student ID: admin
   - Academic Year: 4
   - Password: admin123

2. In the Firebase Console, go to "Authentication" > "Users"
3. Find the admin user and copy their User UID
4. Go to "Firestore Database" and find the users collection
5. Update the admin user document to ensure the studentId field is set to 'admin'

## Deployment

After completing these steps, deploy your application to GitHub Pages. All user data will now be stored centrally in Firebase Firestore, allowing users to log in from any device and for you to see all user details when logged in as admin.

If you choose not to set up Firebase, the application will continue to work with the localStorage fallback system, but user data will remain device-specific.