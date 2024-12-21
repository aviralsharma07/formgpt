import React from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon, Github, Star, Wand2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const { signInWithGoogle, loading, user } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCreateForm = () => {
    if (user) {
      router.push("/form-builder");
    } else {
      signInWithGoogle();
    }
  };

  return (
    <section className="h-[calc(100vh-64px)] flex items-center flex-col justify-center gap-12">
      <div className="space-y-4">
        <h1 className="text-gray-200 text-center text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
          Generate Google Forms with <span className="gradient-text">AI</span>, <br className="hidden sm:inline" />
          Instantly.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-[42rem] mx-auto">Transform your ideas into structured forms in seconds with AI-powered Google Forms. Streamline your workflow with intelligent form generation.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 min-w-[240px]">
        <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35" onClick={handleCreateForm}>
          Create My Form
          <Wand2 className="ml-2 h-4 w-4" />
        </Button>
        {!user && (
          <Button size="lg" variant="outline" className="border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-gray-600 transition-colors bg-transparent" onClick={signInWithGoogle}>
            <svg viewBox="0 0 48 48" className="w-5 h-5 mr-2">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
            </svg>
            Sign in with Google
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex transition-colors items-center text-indigo-500 hover:text-indigo-400 active:text-indigo-600 gap-1">
          <Star className="h-4 w-4" aria-label="Star Icon" />
          <span className="transition-colors">Open Source</span>
        </div>
        <div className="h-1 w-1 rounded-full bg-muted-foreground" />
        <Link href="https://github.com/aviralsharma07/formgpt" target="_blank" className="flex items-center gap-1 transition-colors text-indigo-500 hover:text-indigo-400 active:text-indigo-600" aria-label="Star on GitHub">
          <Github className="h-4 w-4" />
          <span>Star on GitHub</span>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
