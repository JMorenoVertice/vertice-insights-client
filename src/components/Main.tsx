import { useContext, useState } from 'react';
import { Box, TextInput, ResponsiveContext } from 'grommet';
import { Search } from 'grommet-icons';
import { Card } from './Card';

const cardsData = [
  {
    title: 'scorm-worker.js',
    description: 'Coordinador central que inicializa la comunicación con la API SCORM, gestiona el ciclo de vida del SCO y administra la captura de eventos y el procesamiento de datos entre módulos. Importa y conecta todas las funciones necesarias para el seguimiento y análisis.'
  },
  {
    title: 'scorm-events.js',
    description: 'Captura, registra y gestiona todos los eventos relevantes del usuario (clics, entradas, cambios, desplazamientos) dentro del contenido SCORM, estandarizando los datos para su posterior análisis.'
  },
  {
    title: 'getAPI()',
    description: 'Busca y verifica la presencia de la API SCORM en la ventana actual o superior, asegurando la integración y comunicación correcta con el LMS.'
  },
  {
    title: 'getFingerprint()',
    description: 'Genera un identificador único para el usuario y el dispositivo recopilando datos como nombre de usuario, ID, resolución de pantalla, idioma, memoria, y más, produciendo una huella digital segura y robusta.'
  },
  {
    title: 'logElementAction()',
    description: 'Registra las acciones del usuario sobre los elementos de la interfaz, como clics, entradas de texto o cambios en campos, asociando el contexto y los detalles del elemento.'
  },
  {
    title: 'addTracking()',
    description: 'Agrega listeners de eventos a un documento o contenedor para registrar automáticamente clics, entradas y cambios en campos de formularios, centralizando el seguimiento de la interacción del usuario.'
  },
  {
    title: 'initTracking()',
    description: 'Inicializa el seguimiento de eventos en el documento principal, contenedores específicos e iframes, asegurando una captura integral de interacciones en todo el contenido SCORM.'
  },
  {
    title: 'syncTipoEjerFromOpener()',
    description: 'Sincroniza la variable global de tipo de ejercicio entre ventanas, útil para pop-ups, manteniendo el estado consistente entre contextos.'
  },
  {
    title: 'patchExpander()',
    description: 'Modifica el comportamiento del componente Expander para actualizar dinámicamente los tipos de ejercicio y adaptar los estilos CSS según el contenido mostrado.'
  },
  {
    title: 'initializeModules()',
    description: 'Función principal que inicializa todos los módulos necesarios e invoca las funciones de seguimiento y registro de eventos al iniciar la aplicación.'
  }
];

export const Main = () => {
  const size = useContext(ResponsiveContext);
  const [search, setSearch] = useState('');
  let columns;
  if (size === 'small') columns = '1fr';
  else if (size === 'medium') columns = 'repeat(2, 1fr)';
  else columns = 'repeat(4, 1fr)';

  // Filter cards based on the search input
  const filteredCards = cardsData.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box pad={{ vertical: 'medium', horizontal: 'small' }} gap="medium">
      <Box
        direction="row"
        justify="end"
        margin={{ bottom: 'medium' }}
        width={size === 'small' ? '100%' : 'medium'}
        alignSelf={size === 'small' ? 'center' : 'end'}
      >
        <TextInput
          placeholder="Buscar"
          icon={<Search color="#001d4a" />}
          value={search}
          onChange={event => setSearch(event.target.value)}
          style={{
            background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 100%)',
            borderRadius: '18px',
            border: '2px solid rgb(116, 18, 155)',
            color: '#001d4a',
            fontWeight: 'bold',
            fontSize: '1.1em',
            minWidth: '180px',
          }}
        />
      </Box>
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: columns,
          gap: '1.5rem',
          justifyContent: 'center',
        }}
        pad={{ bottom: 'large' }}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <Card key={idx} title={card.title} description={card.description} />
          ))
        ) : (
          <Box gridArea="1 / -1" align="center" pad="large">
            <span style={{ color: '#fff', fontWeight: 'bold' }}>No se encontraron resultados.</span>
          </Box>
        )}
      </Box>
    </Box>
  );
};
