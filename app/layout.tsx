import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/custom/theme-provider';

import { SidebarProvider } from '@/components/ui/sidebar';
import { SandPackCSS } from '@/components/custom/sandpack-styles';
import Header from '@/components/custom/header';

export const metadata: Metadata = {
  title: 'composely',
  description: 'Build email templates with ease',
  keywords: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Server Components',
    'Radix UI',
    'Generative UI',
    'AI Design',
    'Code Generation',
    'Email Templates',

    'UI Design',
  ],
  authors: [
    {
      name: 'Steve Alden',
      url: 'https://stevealden.com',
    },
  ],
  creator: 'Steve Alden',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://composely.dev',
    siteName: 'composely',
    title: 'composely',
    description: 'Build email templates with ease',
  },
  twitter: {
    title: 'composely',
    description: 'Build email templates with ease',
    creator: 'Steve Alden',
    creatorId: '@SteeveeAlden',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <SandPackCSS />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <main className='flex min-h-screen flex-col items-center justify-between'>
            <SidebarProvider>
              <Header />
              <div className='z-10 w-full justify-between text-sm'>
                <div className='fixed mt-[calc(3rem+4px)] ml-0 px-2 h-[calc(100%-4rem+4px)] w-full md:w-full'>
                  {children}
                </div>
              </div>
            </SidebarProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
