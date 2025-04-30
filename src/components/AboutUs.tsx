import { Box, Text } from 'grommet';

export const AboutUs = () => (
    <Box
        align="center"
        justify="center"
        pad={{ vertical: 'xlarge', horizontal: 'medium' }}
        width="100%"
    >
        <Box
            background="black"
            round="xlarge"
            pad={{ vertical: 'large', horizontal: 'large' }}
            align="center"
            width={{ max: '700px' }}
            elevation="large"
            style={{
                boxShadow: '0 4px 32px 0 rgba(31, 38, 135, 0.18)',
            }}
        >
            <Text
                color="white"
                weight="bold"
                size="xxlarge"
                textAlign="center"
                margin={{ bottom: 'small' }}
                style={{ letterSpacing: '1px' }}
            >
                Sobre la elección del diseño:
            </Text>
            <Text
                color="white"
                size="large"
                textAlign="center"
                style={{ opacity: 0.85, lineHeight: 1.6 }}
            >
                He diseñado esta landing page utilizando componentes React de manera óptima y reutilizable, asegurando un código limpio, modular y fácil de mantener.
                Cada sección está construida con bloques independientes que facilitan la escalabilidad y la personalización, permitiendo una experiencia de usuario fluida y consistente a lo largo de toda la página.
                Hecho por Coral Jácome.
            </Text>
        </Box>
    </Box>
);
