import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { zhCN } from '@clerk/localizations'

import "@/styles/globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "云朵清单",
  description: "使用“云朵清单”，让你的每一天都充满高效和轻松，让任务管理不再枯燥，生活变得更加有条理，适合所有追求效率和生活品质的你！",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider localization={zhCN}>
      <html lang="zh" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute='class'
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <div className="flex w-full flex-col items-center">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
