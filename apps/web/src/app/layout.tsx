import "~/styles/globals.css";

import { type ReactNode } from "react";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Travel Guide",
  description: "Share and discover travel posts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} bg-background text-foreground antialiased`}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
