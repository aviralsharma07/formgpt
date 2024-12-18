"use client";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { signInWithGoogle, loading } = useAuth();

  // if (loading) {
  //   // Render a loading spinner or screen while the app is fetching the session
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //     </div>
  //   );
  // }

  return (
    <div>
      <button onClick={signInWithGoogle} className="bg-white text-gray-800 px-8 py-3 rounded-2xl">
        LogIn with Google
      </button>
    </div>
  );
}
