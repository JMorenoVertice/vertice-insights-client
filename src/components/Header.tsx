import React from 'react';
import { Box, Menu, Text, ResponsiveContext } from 'grommet';
import { Menu as MenuIcon } from 'grommet-icons';
import reactLogo from '../assets/react.svg';

const menuItems = [
  { label: 'Inicio', onClick: () => alert('Ir a Inicio') },
  { label: 'Funcionalidades', onClick: () => alert('Ir a Funcionalidades') },
  { label: 'Contacto', onClick: () => alert('Ir a Contacto') },
  { label: 'Créditos', onClick: () => alert('Créditos: Coral Jácome') },
];

export const Header = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <Box
      direction="row"
      background="black"
      pad={{ horizontal: 'large', vertical: 'small' }}
      align="center"
      justify="between"
      height="xsmall"
      gap="medium"
    >
      <Box
        background="white"
        round="full"
        width="60px"
        height="60px"
        align="center"
        justify="center"
        overflow="hidden"
        flex={false}
      >
        <img
          src={reactLogo}
          alt="React Logo"
          style={{ width: '40px', height: '40px', display: 'block' }}
        />
      </Box>
      {size === 'small' || size === 'xsmall' ? (
        <Menu
          icon={<MenuIcon color="white" />}
          items={menuItems}
          dropBackground="black"
          a11yTitle="Menú de navegación"
        />
      ) : (
        <Box direction="row" gap="large" align="center" flex={false}>
          {menuItems.map(({ label, onClick }) => (
            <Text
              key={label}
              color="white"
              size="large"
              weight="bold"
              style={{ cursor: 'pointer', userSelect: 'none' }}
              onClick={onClick}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick();
                }
              }}
              role="link"
              aria-label={label}
            >
              {label}
            </Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
