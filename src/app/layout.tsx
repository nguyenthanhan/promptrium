import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '../contexts/ToastContext';
import { PromptProvider } from '../contexts/PromptContext';
import { ToastContainer } from '../components/UI/Toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promptrium - AI Prompt Manager",
  description: "Offline web application to manage, store and reuse AI prompts efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}>
        <ToastProvider>
          <PromptProvider>
            {children}
            <ToastContainer />
          </PromptProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
