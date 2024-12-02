import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

import "../globals.css";
import Topbar from "@/components/shared/Topbar";
import BottomBar from "@/components/shared/BottomBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import RightSideBar from "@/components/shared/RightSideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  console.log("Current user:", user?.id);

  if (user) {
    const userInfo = await fetchUser(user.id);
    console.log("Fetched user info:", userInfo);
    if (!userInfo?.onboarded) {
      console.log("Redirecting to onboarding because userInfo is:", userInfo);
      redirect("/onboarding");
    }
  }

  return (
    <ClerkProvider
      afterSignOutUrl="/welcome"
    >
      <html lang='en'>
        <body className={inter.className}>
          {user && (
            <>
              <Topbar />
              <main className='flex flex-row'>
                <LeftSideBar />
                <section className='main-container'>
                  <div className='w-full max-w-4xl'>{children}</div>
                </section>
                <RightSideBar />
              </main>
              <BottomBar />
            </>
          )}
          {!user && children}
        </body>
      </html>
    </ClerkProvider>
  );
}