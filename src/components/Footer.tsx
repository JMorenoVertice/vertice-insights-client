import { Box, Text } from 'grommet';

export const Footer = () => (
  <Box
    align="center"
    justify="center"
    pad={{ vertical: 'medium', horizontal: 'small' }}
    width="100%"
    style={{
      background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 100%)',
      borderBottomLeftRadius: '18px',
      borderBottomRightRadius: '18px',
      minHeight: '70px',
      textAlign: 'center',
    }}
    elevation="medium"
  >
    <Text
      color="white"
      weight="bold"
      size="medium"
      style={{
        letterSpacing: '0.5px',
        width: '100%',
        textAlign: 'center',
        bottom: '0',
      }}
    >
      © {new Date().getFullYear()} Tracking Data. Coral Jácome. All rigths reserved.
    </Text>
  </Box>
);
