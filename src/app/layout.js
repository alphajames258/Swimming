'use client';
import './globals.css';
import Header from '../components/Header/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../utils/theme';
import About from '../components/About/About';

const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <About />
      </body>
    </html>
  );
}
