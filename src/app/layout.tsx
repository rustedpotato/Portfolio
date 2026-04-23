import type { Metadata } from "next";
import { Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CursorProvider } from "@/components/CursorContext";
import { SoundProvider } from "@/components/SoundContext";
import InteractiveBackground from "@/components/InteractiveBackground";
import SplashAnimation from "@/components/SplashAnimation";


const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Chaitanyagali",
  description: "Senior UI/UX Designer crafting AI-integrated digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="dark">
          <SoundProvider>
            <CursorProvider>
              <SplashAnimation />
              <InteractiveBackground />
              <Navbar />
              {children}

              <Cursor />
            </CursorProvider>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
