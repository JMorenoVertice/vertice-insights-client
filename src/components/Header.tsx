import { useState } from 'react';
import { Box, Nav, Button, Layer, ResponsiveContext, Text } from 'grommet';
import { Home, PlayFill, MailOption, UserExpert } from 'grommet-icons';

const BurgerIcon = ({ size = 40, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <rect y="8" width="40" height="5" rx="2.5" fill={color} />
    <rect y="18" width="40" height="5" rx="2.5" fill={color} />
    <rect y="28" width="40" height="5" rx="2.5" fill={color} />
  </svg>
);

const navLinks = [

  { icon: <Home size="40px" color="white" />, label: "Home", onClick: () => alert("Home") },
  { icon: <PlayFill size="40px" color="white" />, label: "Functionalities", onClick: () => alert("Functionalities") },
  { icon: <MailOption size="40px" color="white" />, label: "Contact", onClick: () => alert("Contact") },
  { icon: <UserExpert size="40px" color="white" />, label: "Credits", onClick: () => alert("Coral Jácome") },
];

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          direction="row"
          align="center"
          justify="between"
          pad={{ vertical: 'small', horizontal: 'large' }}
          style={{
            background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 100%)',
            top: 0,
            zIndex: 100,
            minHeight: '110px',
            borderTopLeftRadius: '18px',
            borderTopRightRadius: '18px',
          }}
          elevation="medium"
        >
          {size !== 'small' ? (
            <>
              <Nav direction="row" gap="xlarge" align="center">
                {navLinks.slice(0, 2).map(link => (
                  <Button
                    key={link.label}
                    plain
                    onClick={link.onClick}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginRight: '2.5rem'
                    }}
                  >
                    <Box
                      background="linear-gradient(135deg, #6200c5 0%, #ff27fc 100%)"
                      round="full"
                      pad="small"
                      margin={{ bottom: 'xsmall' }}
                      style={{
                        border: '3px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px 0 rgba(98,0,197,0.15)'
                      }}
                    >
                      {link.icon}
                    </Box>
                    <Text weight="bold" color="white" size="large" style={{ marginTop: '4px' }}>
                      {link.label}
                    </Text>
                  </Button>
                ))}
              </Nav>
              <Nav direction="row" gap="xlarge" align="center">
                {navLinks.slice(2).map(link => (
                  <Button
                    key={link.label}
                    plain
                    onClick={link.onClick}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginLeft: '2.5rem'
                    }}
                  >
                    <Box
                      background="linear-gradient(135deg, #6200c5 0%, #ff27fc 100%)"
                      round="full"
                      pad="small"
                      margin={{ bottom: 'xsmall' }}
                      style={{
                        border: '3px solid black',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px 0 rgba(98,0,197,0.15)'
                      }}
                    >
                      {link.icon}
                    </Box>
                    <Text weight="bold" color="white" size="large" style={{ marginTop: '4px' }}>
                      {link.label}
                    </Text>
                  </Button>
                ))}
              </Nav>
            </>
          ) : (
            <>
              {/* BUTTON BURGER HEADER */}
              <Button
                plain
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  background: '#6200c5',
                  borderRadius: '50%',
                  padding: 8,
                  marginLeft: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #fff',
                  boxShadow: 'none'
                }}
                focusIndicator={false}
                aria-label={showMenu ? "Cerrar menú" : "Abrir menú"}
              >
                <BurgerIcon color="#fff" />
              </Button>

              {/* MENU */}
              <Box flex align="center" justify="center">
                <Text weight="bold" color="white" size="large">
                  Tracking Data
                </Text>
              </Box>

              {/* MENU LAYER LINKS */}
              {showMenu && (
                <Layer
                  onEsc={() => setShowMenu(false)}
                  onClickOutside={() => setShowMenu(false)}
                  background="linear-gradient(135deg, #6200c5 0%, #ff27fc 100%)"
                  modal
                  responsive={false}
                  animation="fadeIn"
                >
                  <Box
                    align="center"
                    justify="start"
                    pad={{ vertical: 'xlarge', horizontal: 'large' }}
                    gap="medium"
                    fill
                    style={{
                      minHeight: '100vh',
                      minWidth: '100vw',
                    }}
                  >
                    {/* BUTTON CLOSE */}
                    <Button
                      plain
                      onClick={() => setShowMenu(false)}
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '2rem'
                      }}
                      focusIndicator={false}
                      aria-label="Cerrar menú"
                    >
                      <Box
                        background="#001d4a"
                        round="full"
                        pad="small"
                        margin={{ bottom: 'xsmall' }}
                        style={{
                          border: '3px solid #61dafb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px 0 rgba(98,0,197,0.15)'
                        }}
                      >
                      </Box>
                      <Text weight="bold" color="white" size="large" style={{ marginTop: '80px', fontSize: '40px' }}>
                        <Button><Box
                          background="linear-gradient(135deg, #6200c5 0%, #ff27fc 100%)"
                          round="full"
                          pad="small"
                          margin={{ bottom: 'xsmall' }}
                          style={{
                            border: '3px solid black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px 0 rgba(98,0,197,0.15)',
                            width: 60,
                            height: 60,
                          }}
                        >
                          <Button
                            plain
                            onClick={() => setShowMenu(false)}
                            style={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              background: 'transparent',
                              padding: 0,
                            }}
                            focusIndicator={false}
                            aria-label="Cerrar menú"
                          >
                            <Text
                              weight="bold"
                              color="white"
                              size="40px"
                              style={{
                                fontSize: 40,
                                lineHeight: 1,
                                textAlign: 'center',
                                userSelect: 'none',
                              }}
                            >
                              X
                            </Text>
                          </Button>
                        </Box>
                        </Button>
                      </Text>
                    </Button>
                    {navLinks.map(link => (
                      <Button
                        key={link.label}
                        plain
                        onClick={() => { link.onClick(); setShowMenu(false); }}
                        style={{
                          cursor: 'pointer',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          marginBottom: '1.2rem',
                        }}
                        focusIndicator={false}
                      >
                        <Box
                          background="linear-gradient(135deg, #6200c5 0%, #ff27fc 100%)"
                          round="full"
                          pad="small"
                          margin={{ bottom: 'xsmall' }}
                          style={{
                            border: '3px solid black',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px 0 rgb(99, 0, 197)'
                          }}
                        >
                          {link.icon}
                        </Box>
                        <Text weight="bold" color="black" size="large" style={{ marginTop: '4px' }}>
                          {link.label}
                        </Text>
                      </Button>
                    ))}
                  </Box>
                </Layer>

              )}


            </>

          )}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
};
