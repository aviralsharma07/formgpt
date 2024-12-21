import type { Metadata } from "next";

import "./styles/globals.css";
import { AuthProvider } from "./context/AuthContext";

export const metadata: Metadata = {
  title: "FormGPT | AI Powered Form Builder",
  description: "Generate Google Forms, Typeform, and more using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="grid-bg">{children}</body>
      </AuthProvider>
    </html>
  );
}
