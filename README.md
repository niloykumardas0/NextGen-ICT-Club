# NextGen ICT Club - National Olympiad Portal

This is a professional ICT Olympiad and Learning Management System for **NextGen ICT Club**.

## 🚀 How to Deploy to Netlify

### 1. Push code to GitHub
Upload all project files to GitHub **except** `node_modules` and `.env`. Use the `GITHUB_UPLOAD_CHECKLIST.md` for reference.

### 2. Connect to Netlify
Import the repository to Netlify and use the following build settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`

### 3. Environment Variables (CRITICAL)
For the database and login system to work, you must add these values in Netlify's **Site Settings > Environment Variables**:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## 🛠️ Key Features
- **Smart MCQ Terminal**: Fully responsive exam portal for mobile and desktop.
- **AI Admin Tools**: Generate notices and quiz questions using AI.
- **Digital Vanguard ID**: Future-tech membership cards for all club members.
- **Registration Countdown**: Real-time timer synced with Firestore.

---
© 2026 NextGen ICT Club | Empowering the Future Leaders