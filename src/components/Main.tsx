import { useContext, useState } from 'react';
import { Box, TextInput, ResponsiveContext } from 'grommet';
import { Search } from 'grommet-icons';
import { Card } from './Card';

const cardsData = [
  {
    title: 'scorm-worker.js',
    description: 'Central coordinator that initializes communication with the SCORM API, manages the SCO lifecycle, and manage event capturing and data processing across modules. Imports and connects all necessary functions for tracking and analysis.'
  },
  {
    title: 'scorm-events.js',
    description: 'Captures, logs, and manages all relevant user events (clicks, inputs, changes, scrolls) within the SCORM content, standardizing data for further analysis.'
  },
  {
    title: 'getAPI()',
    description: 'Searches and verifies the presence of the SCORM API in the current or parent window, ensuring proper LMS integration and communication.'
  },
  {
    title: 'getFingerprint()',
    description: 'Generates a unique identifier for the user and device by collecting data such as username, ID, screen resolution, language, memory, and more, producing a secure and robust fingerprint.'
  },
  {
    title: 'logElementAction()',
    description: 'Logs user actions on interface elements, such as clicks, text inputs, or field changes, associating context and element details.'
  },
  {
    title: 'addTracking()',
    description: 'Adds event listeners to a document or container to automatically record clicks, inputs, and form field changes, centralizing user interaction tracking.'
  },
  {
    title: 'initTracking()',
    description: 'Initializes event tracking on the main document, specific containers, and iframes, ensuring comprehensive interaction capture throughout the SCORM content.'
  },
  {
    title: 'syncTipoEjerFromOpener()',
    description: 'Synchronizes the global exercise type variable between windows, useful for pop-ups, maintaining consistent state across contexts.'
  },
  {
    title: 'patchExpander()',
    description: 'Modifies the Expander component behavior to dynamically update exercise types and adapt CSS styles based on displayed content.'
  },
  {
    title: 'initializeModules()',
    description: 'Core function that initializes all necessary modules and invokes event tracking and logging functions when the application starts.'
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
          placeholder="Search"
          icon={<Search color="#001d4a" />}
          value={search}
          onChange={event => setSearch(event.target.value)}
          style={{
            background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 100%)',
            borderRadius: '18px',
            border: '2px solidrgb(116, 18, 155)',
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
