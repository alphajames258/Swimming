import React from 'react';
import { LINK_WATER, MOODY_BLUE, PERSIAN_BLUE } from '../../constants/colors';

const headerStyle = {
  backgroundColor: MOODY_BLUE,
  color: LINK_WATER,
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `2px solid ${PERSIAN_BLUE}`,
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
};

function Header() {
  return (
    <div style={headerStyle}>
      <h1 style={titleStyle}>SwimBenchmark</h1>
    </div>
  );
}

export default Header;
