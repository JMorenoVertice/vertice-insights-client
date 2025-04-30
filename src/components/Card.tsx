import { Box, Text } from 'grommet';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export const Card = ({ title, children }: CardProps) => (
  <Box
    align="center"
    width="medium"
    elevation="xlarge"
    background={{
      color: 'light-1',
      opacity: 'strong',
    }}
    round={{ size: '32px' }}
    pad="large"
    margin={{ horizontal: 'small', vertical: 'medium' }}
    style={{
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      border: '2px solid #7D4CDB',
      backdropFilter: 'blur(4px)',
    }}
    hoverIndicator={{
      background: { color: 'accent-1', opacity: 'weak' },
      elevation: 'large',
    }}
  >
    <Box
      background="brand"
      round="large"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      margin={{ bottom: 'medium' }}
      width="100%"
      align="center"
      style={{
        boxShadow: '0 4px 16px 0 rgba(125, 76, 219, 0.15)',
      }}
    >
      <Text color="white" weight="bold" size="xlarge" style={{ letterSpacing: '1px' }}>
        {title}
      </Text>
    </Box>
    <Text color="dark-2" size="large" textAlign="center">
      {children}
    </Text>
  </Box>
);
