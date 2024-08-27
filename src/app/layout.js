import { Inter } from "next/font/google";
import "./globals.scss";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Zenith Accelerator Blocks",
  description: "Explore Zenith Accelerator Blocks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href={process.env.NEXT_PUBLIC_ZENITHCLIENT_FAVICON}
          type="image/png"
        />
      </Head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
