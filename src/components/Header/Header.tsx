import React from 'react';
import { LINK_WATER, MOODY_BLUE, PERSIAN_BLUE } from '../../constants/colors';
import { Button, Link } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const headerStyle = {
  backgroundColor: 'white',
  color: 'white',
  padding: '5px 20px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle bottom shadow
};

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => {
        router.push('/home');
      }}
      style={{ cursor: 'pointer' }}
      alt='swim benchmark logo'
      src='/logos/swimBenchmarkv8.png'
      width={375}
      height={50}
      layout='intrinsic'
    ></Image>
  );
};

function Header() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push('/Form');
  };

  return (
    <div style={headerStyle}>
      <Logo />
    </div>
  );
}

export default Header;
