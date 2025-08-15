import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./context/ReactQueryProvider";
import { AuthProvider } from "./context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Personal Expense Tracker",
  description: "Track and manage your personal expenses easily with this app.",
  keywords: "personal finance, expense tracker, budget, money management",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  themeColor: "#60E5AE",
  openGraph: {
    title: "Personal Expense Tracker",
    description:
      "Track and manage your personal expenses easily with this app.",
    type: "website",
    url: "https://your-deployed-app.com",
    siteName: "Personal Expense Tracker",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
