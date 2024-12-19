"use client";
import { createContext, ReactNode, useContext, useEffect, useReducer, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

interface AuthState {
  user: User | null;
  googleAccessToken: string | null;
  loading: boolean;
}

type AuthAction = { type: "SET_USER"; payload: { user: User | null; googleAccessToken: string | null } } | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  googleAccessToken: null,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload.user, googleAccessToken: action.payload.googleAccessToken, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface AuthContextProps {
  user: User | null;
  googleAccessToken: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  googleAccessToken: null,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  loading: true,
});

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fetch the current user session from Supabase when the component mounts
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        dispatch({ type: "SET_USER", payload: { user: session?.user ?? null, googleAccessToken: session?.provider_token ?? null } });
      } catch (error) {
        console.error("Error fetching session", error);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch({ type: "SET_USER", payload: { user: session?.user ?? null, googleAccessToken: session?.provider_token ?? null } });
    });

    fetchSession();

    return () => data.subscription.unsubscribe();
  }, []);

  // Sign in with Google function
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/form-builder`,
          scopes: "https://www.googleapis.com/auth/forms.body https://www.googleapis.com/auth/drive.file",
        },
      });
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  const value: AuthContextProps = {
    user: state.user,
    googleAccessToken: state.googleAccessToken,
    signInWithGoogle,
    signOut,
    loading: state.loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
