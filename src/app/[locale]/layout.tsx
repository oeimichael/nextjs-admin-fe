'use client';

import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import '@/styles/global.css';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const pathArray = window.location.pathname.split('/');

  if (pathArray[1] === 'login' || pathArray[1] === 'register') {
    return (
      <html lang="en">
        <body suppressHydrationWarning>
          {props?.children}
        </body>
      </html>
    );
  } else {
    return (
      <html lang="en">
        <body className="flex overflow-hidden" suppressHydrationWarning>
          <div className="h-screen min-w-80 overflow-y-auto bg-black">
            <Sidebar />
          </div>
          <div className="flex w-full flex-col overflow-hidden">
            <div className="w-full overflow-hidden shadow-md">
              <Navbar />
            </div>
            <div className="overflow-auto p-4">
              {props?.children}
            </div>
          </div>

        </body>
      </html>
    );
  }
}
