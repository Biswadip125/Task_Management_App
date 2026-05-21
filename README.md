````md
# Task Manager App

A React Native Task Manager application with authentication, offline-first task management, Firestore synchronization, theming, and local reminder notifications.

---

# Features

- User Authentication using Firebase Auth
- Create, Update, Delete Tasks
- Toggle Task Completion
- Offline-first architecture using SQLite
- Automatic Firestore Sync when internet reconnects
- Light/Dark Theme Support
- Local Reminder Notifications
- Network Connectivity Detection
- Toast-based User Feedback

---

# Architecture Choice

The application follows a feature-based scalable architecture with proper separation of concerns.

## Folder Structure

src/
 ├── app/
 │    ├── navigation/
 │    ├── store/
 │
 ├── features/
 │    ├── auth/
 │    ├── tasks/
 │    ├── theme/
 │
 ├── database/
 │
 ├── services/
 │    ├── network/
 │    ├── sync/
 │    ├── notifications/
 │
 ├── theme/
````

---

# Why This Architecture?

## Feature-Based Structure

Each feature contains:

* screens
* hooks
* redux logic
* components

This improves:

* scalability
* maintainability
* modularity

---

## Redux Toolkit

Redux Toolkit is used for:

* centralized state management
* async handling using createAsyncThunk
* reducing boilerplate

---

## Offline-First Architecture

SQLite is used as the primary local database.

The app:

1. stores tasks locally first
2. marks tasks with sync status
3. syncs pending changes to Firestore when internet reconnects

This ensures:

* offline support
* better user experience
* reliable persistence

---

## Service Layer

External logic such as:

* notifications
* network monitoring
* synchronization

is isolated inside services for cleaner components and better reusability.

---

# Libraries Used

## Core Libraries

* React Native
* React Navigation
* Redux Toolkit
* React Redux

---

## Firebase

* @react-native-firebase/app
* @react-native-firebase/auth
* @react-native-firebase/firestore

---

## Local Database

* react-native-nitro-sqlite

---

## Notifications

* @notifee/react-native

---

## Utilities

* @react-native-community/netinfo
* react-native-toast-message
* react-native-safe-area-context
* @react-native-community/datetimepicker

---

# How to Run the App

# Prerequisites

Install:

* Node.js
* Android Studio
* Java 17
* React Native CLI environment

Official React Native setup guide:

https://reactnative.dev/docs/set-up-your-environment

---

# Clone Repository

```bash
git clone <repo-url>
cd TaskManagerApp
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Setup

Create environment files:

```txt
.env.development
.env.production
```

Example:

## .env.development

```env
API_URL=your_dev_api_url
APP_ENV=development
```

## .env.production

```env
API_URL=your_prod_api_url
APP_ENV=production
```

---

# Firebase Setup

Place your Firebase configuration file here:

```txt
android/app/google-services.json
```

---

# iOS Setup

```bash
cd ios
pod install
```

---

# Start Metro Server

```bash
npm start
```

---

# Run Android App

```bash
npx react-native run-android
```

---

# Build Release APK

```bash
cd android
./gradlew assembleRelease
```

APK location:

```txt
android/app/build/outputs/apk/release/
```

---

# Offline Sync Flow

## Offline

* Tasks are stored locally in SQLite
* Tasks receive sync statuses:

  * pending
  * synced
  * pending_delete

---

## Online

When internet reconnects:

* pending tasks sync to Firestore
* deleted tasks are removed from Firestore
* sync statuses update automatically

---

# Notifications

Local reminder notifications are implemented using Notifee.

Users can:

* select reminder date
* select reminder time
* receive scheduled local notifications

---

# Known Limitations

* Notifications currently support Android only
* No recurring reminders
* Basic Firestore conflict handling
* Theme persistence not implemented
* No task search/filter
* No pagination for very large task lists

---

# Future Improvements

* Recurring reminders
* Search and filtering
* Task categories
* Better sync conflict resolution
* Theme persistence
* Cloud backup restore

---

# Author

Developed by Biswadip Chowdhury

```
```
