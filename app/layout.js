"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
        <Provider store={store}>
          <body>
            <ToastContainer />
            {children}
          </body>
        </Provider>
      </SessionProvider>
    </html>
  );
}
