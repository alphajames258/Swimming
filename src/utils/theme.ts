import { Aleo, Inter } from 'next/font/google';
import { createTheme } from '@mui/material';

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
