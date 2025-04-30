import { Box, Text } from 'grommet';

export const Footer = () => (
  <Box
    as="footer"
    background="black"
    pad={{ vertical: 'large', horizontal: 'medium' }}
    align="center"
    justify="center"
    gap="medium"
    direction="row-responsive"
    wrap
  >
    <Text color="white" size="large" weight="bold" textAlign="center">
      © 2025 Coral Jácome. Todos los derechos reservados.
    </Text>
  </Box>
);
