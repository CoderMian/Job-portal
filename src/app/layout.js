import { Suspense } from "react";
import "./globals.css";
import Loading from "./loading";
import CommonLayout from "@/components/common-layout";
import { ClerkProvider } from "@clerk/nextjs";
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Suspense fallback={<Loading />}>
            <CommonLayout children={children} />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
