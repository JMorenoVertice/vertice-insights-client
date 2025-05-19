import React, { useState, useEffect } from 'react';
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

const getGridColumns = (width) => {
  if (width < 600) return '1fr';
  if (width < 1024) return 'repeat(2, 1fr)';
  return 'repeat(4, 1fr)';
};

export const Main = () => {
  const [search, setSearch] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = getGridColumns(windowWidth);

  // Filtrar por título o descripción (ambos en español)
  const filteredCards = cardsData.filter(card => {
    const searchTerm = search.toLowerCase();
    return (
      card.title.toLowerCase().includes(searchTerm) ||
      card.description.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="main-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por función o descripción..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
          aria-label="Buscar función o descripción"
        />
        <span className="search-icon" aria-hidden="true">🔍</span>
      </div>
      <div
        className="cards-grid"
        style={{
          gridTemplateColumns: columns
        }}
      >
        {filteredCards.length > 0 ? (
          filteredCards.map((card, idx) => (
            <Card key={idx} title={card.title} description={card.description} />
          ))
        ) : (
          <div className="no-results">
            <span>No se encontraron resultados.</span>
          </div>
        )}
      </div>
    </div>
  );
};
