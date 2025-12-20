// app/layout.tsx
import React from "react";
import "./globals.css";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "AI Chat Profile",
  description: "AI chatbot with memory and personality profiling",
};

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="en">
        <body
          className={openSans.variable}
          style={{
            height: "100vh",   
            margin: 0,
            overflow: "hidden",    // page never scrolls
          }}
        >
          {children}
        </body>
      </html>
    );
}
