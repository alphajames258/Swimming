import { Aleo } from 'next/font/google';
import { createTheme } from '@mui/material';

const archivo = Aleo({
  weight: ['400', '700'],
  subsets: ['latin'],
});

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: archivo.style.fontFamily,
  },
});

export default theme;
