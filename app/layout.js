"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarTop from "../Components/navbar/navbarTop";
import { createContext } from "react";
import { ContextWrapper } from "@/context";
import { UserContextWrapper } from "@/context/user";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AppWrapper> */}

        <ContextWrapper>
          <UserContextWrapper>
            <NavbarTop />
            {children}
          </UserContextWrapper>
        </ContextWrapper>
        {/* </AppWrapper> */}
      </body>
    </html>
  );
}
