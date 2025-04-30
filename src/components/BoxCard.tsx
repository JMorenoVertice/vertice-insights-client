import { ReactNode } from 'react';
import { Box, Text } from 'grommet';

interface BoxCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  roundedTitle?: string;
  roundedContent?: string;
  backgroundTitle?: string;
  backgroundContent?: string;
}

export const BoxCard = ({
  title,
  subtitle,
  children,
  roundedTitle = 'xlarge',
  roundedContent = 'medium',
  backgroundTitle = 'black',
  backgroundContent = 'black',
}: BoxCardProps) => (
  <Box align="center">
    <Box
      background={backgroundTitle}
      round={roundedTitle}
      pad={{ horizontal: 'large', vertical: 'small' }}
      margin={{ bottom: 'small' }}
      width="100%"
      align="center"
    >
      <Text color="white" weight="bold" size="large">
        {title}
      </Text>
    </Box>
    {subtitle && (
      <Text color="white" size="medium" margin={{ bottom: 'xsmall' }}>
        {subtitle}
      </Text>
    )}
    <Box
      background={backgroundContent}
      round={roundedContent}
      pad="large"
      width="100%"
      align="center"
      justify="center"
    >
      {typeof children === 'string' ? (
        <Text color="white" size="medium">{children}</Text>
      ) : (
        children
      )}
    </Box>
  </Box>
);
