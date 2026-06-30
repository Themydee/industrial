import "./globals.css";

export const metadata = {
  title: "Industrialise Africa | Prof. Banji Oyelaran-Oyeyinka",
  description: "The premier community for Africa's industrialisation, led by Prof. Banji Oyelaran-Oyeyinka. Access exclusive networks, masterclasses, and deal boards.",
  openGraph: {
    title: "Industrialise Africa Community",
    description: "Africa has the answers. Let's build them together.",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
