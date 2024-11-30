import MyContextProvider from "@/lib/providers/MyContextProvider";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxStoreProvider from "@/redux/ReduxStoreProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: {
    default: "Booksy.buzz",
    template: "%s | Booksy.buzz "
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={` ${inter.className} antialiased`}
      >
        <MyContextProvider>
          <ReduxStoreProvider>
            <NextUiProvider>
              <Toaster />
              <div className="text-[#02060A]">{children}</div>
            </NextUiProvider>
          </ReduxStoreProvider>
        </MyContextProvider>
      </body>
    </html>
  );
}
