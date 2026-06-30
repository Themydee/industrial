import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

export const metadata = {
  title: "Industrialise Africa Community",
  description: "The premier community for Africa's industrialisation — led by Prof. Banji Oyelaran-Oyeyinka.",
  icons: {
    icon: '/prof.jpg',
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
