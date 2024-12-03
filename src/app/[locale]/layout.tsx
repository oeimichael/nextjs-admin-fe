'use client';

import Sidebar from '@/components/sidebar';
import '@/styles/global.css';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const pathArray = window.location.pathname.split('/');

  if (pathArray[1] === 'login') {
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
          <div className="h-screen w-80 overflow-y-auto bg-black">
            <Sidebar />
          </div>
          <div>
            {props?.children}
          </div>

        </body>
      </html>
    );
  }
}
