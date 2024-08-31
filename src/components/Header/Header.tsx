import React from 'react';
import { LINK_WATER, MOODY_BLUE, PERSIAN_BLUE } from '../../constants/colors';
import { Button, Link } from '@mui/material';
import Image from 'next/image';
import PoolIcon from '@mui/icons-material/Pool';

const headerStyle = {
  backgroundColor: 'white',
  color: 'white',
  padding: '5px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle bottom shadow
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: PERSIAN_BLUE,
};

const buttonStyle = {
  fontSize: '24px',
  fontWeight: 'bold',

  padding: '0',
};

const Logo = () => {
  return (
    <Image
      alt='swim benchmark logo'
      src='/logos/swimBenchmarkv8.png'
      width={375}
      height={50}
      layout='intrinsic'
    ></Image>
  );
};

function Header() {
  return (
    <div style={headerStyle}>
      <Logo />
      <Button variant='outlined' sx={buttonStyle}>
        Test Your Speed
      </Button>
    </div>
  );
}

export default Header;
