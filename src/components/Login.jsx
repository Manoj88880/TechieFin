"use client";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Login({ user }) {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <img
            src={user.photoURL}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm font-medium">{user.displayName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={handleLogin}
        className="bg-white text-gray-900 font-semibold px-6 py-2 rounded-xl flex items-center gap-2 hover:bg-gray-100"
      >
        🔐 Sign in with Google
      </button>
    </div>
  );
}