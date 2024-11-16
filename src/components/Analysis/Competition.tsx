import { Box, Link, styled, Typography } from '@mui/material';

const styles = {
  leftAnalysisText: {
    margin: '10px 0',
    color: 'black',
  },
  analysisText: {
    margin: '10px 0',
    color: 'black',
    padding: '10px',
  },
  analysisContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'stretch',
  },
};

const StyledLink = styled(Link)(({ theme }) => ({
  'textDecoration': 'none',
  'color': theme.palette.primary.main,
  'fontWeight': 'bold',
  '&:hover': {
    textDecoration: 'underline',
    color: theme.palette.primary.dark,
  },
  '&:active': {
    color: theme.palette.primary.light,
  },
}));

const Competition = ({ analysis, isSmallScreen }) => {
  const { ranking } = analysis;

  if (ranking === 0) {
    return (
      <Box
        sx={{
          color: 'black',
          width: isSmallScreen ? '100%' : '60%',
          padding: isSmallScreen ? '10px 0px' : '10px',
        }}
      >
        <Typography variant='body1'>
          <StyledLink
            style={{ fontSize: '20px' }}
            target='_blank'
            href={analysis.bestSwimmer.profileLink}
          >
            {analysis.bestSwimmer.name}
          </StyledLink>{' '}
          is the next fastest swimmer with a time of{' '}
          <strong style={{ fontSize: '20px' }}>
            {analysis.bestSwimmer.time}s
          </strong>
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        color: 'black',
        width: isSmallScreen ? '100%' : '60%',
        padding: isSmallScreen ? '10px 0px' : '10px',
      }}
    >
      {ranking !== 1 && (
        <Typography variant='body1'>
          <StyledLink
            style={{ fontSize: '20px' }}
            target='_blank'
            href={analysis.slightlyBetterSwimmer.profileLink}
          >
            {analysis.slightlyBetterSwimmer.name}
          </StyledLink>{' '}
          is slightly faster than you at{' '}
          <strong style={{ fontSize: '20px' }}>
            {analysis.slightlyBetterSwimmer.time}s
          </strong>
        </Typography>
      )}

      <Typography variant='body1'>
        <StyledLink
          style={{ fontSize: '20px' }}
          target='_blank'
          href={analysis.betterSwimmer.profileLink}
        >
          {analysis.betterSwimmer.name}
        </StyledLink>{' '}
        is faster than you at{' '}
        <strong style={{ fontSize: '20px' }}>
          {analysis.betterSwimmer.time}s
        </strong>
      </Typography>
    </Box>
  );
};

export default Competition;
