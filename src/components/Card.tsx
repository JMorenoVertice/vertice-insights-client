import { Box, Text } from 'grommet';

interface CardProps {
  title: string;
  description: string;
}

export const Card = ({ title, description }: CardProps) => (
  <Box
    pad="large"
    background={{ color: '#fff133', opacity: 0.18 }}
    round="large"
    elevation="medium"
    align="center"
    style={{
      minHeight: '220px',    
      minWidth: '220px',     
      width: '100%',        
      boxShadow: '0 2px 16px 0 rgba(98,0,197,0.10)',
      border: '2px solid',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white',
      margin: 0,            
    }}
  >
    <Text
      weight="bold"
      color="white"
      size="medium"
      style={{
        marginBottom: '8px',
        fontSize: '1.2em',
      }}
    >
      {title}
    </Text>
    <Text
      color="white"
      alignSelf="center"
      style={{
        fontSize: '1.1em',
      }}
    >
      {description}
    </Text>
  </Box>
);
