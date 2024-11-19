'use client';
import './globals.css';
import Header from '../components/Header/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import About from '../components/About/About';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

const metadata = {
  title: 'Tools for Young Competitive Swimmers | Improve Performance',
  description:
    'Analytical tools to help young competitive swimmers track progress and improve performance. Enhance your swimming skills with our platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </Head>
      <body>
        <Header />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <About />
        <Analytics />
      </body>
    </html>
  );
}
