import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, googleProvider, appleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// This page is now handled by AuthPage.tsx
export default function SignUp() {
  return <div className="min-h-screen flex items-center justify-center text-gray-500">Please use /login or /signup route. This page is deprecated.</div>;
}