import { Urbanist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/providers/reduxProvider";

const urbanist = Urbanist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Pasto",
  description: "Pasto - A Food Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className} suppressHydrationWarning>
        <ReduxProvider>
          <Toaster position="top-right" richColors />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
