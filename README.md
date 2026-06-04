# NextGen ICT Club - Deployment Guide

This project is built with Next.js and Firebase. Follow these steps to host it on Netlify.

## How to Upload to GitHub

১. আপনার কম্পিউটারের প্রোজেক্ট ফোল্ডারে যান।
২. **নিচের ফাইল ও ফোল্ডারগুলো অবশ্যই আপলোড করবেন:**
   - `src/` (ফোল্ডার)
   - `docs/` (ফোল্ডার)
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `tailwind.config.ts`
   - `tsconfig.json`
   - `netlify.toml`
   - `.gitignore`
   - `components.json`

৩. **নিচের ফাইল ও ফোল্ডারগুলো আপলোড করবেন না (এগুলো .gitignore অটোমেটিক বাদ দিবে):**
   - `node_modules/`
   - `.next/`
   - `.env`

## How to Host on Netlify

### Step 1: Push code to GitHub
Create a new repository on GitHub and push your local files there.

### Step 2: Connect to Netlify
1. Go to [Netlify](https://www.netlify.com/) and log in.
2. Click **"Add new site"** -> **"Import from existing project"**.
3. Select **GitHub** and authorize Netlify.
4. Choose your repository.

### Step 3: Add Environment Variables
1. Go to your Site Settings in Netlify.
2. Navigate to **Environment variables**.
3. Add the following keys from your Firebase Console:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

---
© 2026 NextGen ICT Club
