import React, { useState } from 'react';
import { Box } from 'grommet';
import { Card } from './Card';
import { ArrowNavigation } from './ArrowNavigation';

const cardsData = [
  { title: 'LoadScript', content: 'Carga dinámicamente un archivo JavaScript externo en la página.' },
  { title: 'getAPI', content: 'Busca y verifica la presencia de la API SCORM en la ventana actual o en la ventana padre.' },
  { title: 'getFingerprint', content: 'Obtiene datos del usuario, del dispositivo y del estado de la lección, y genera un "fingerprint" único.' },
  { title: 'logElementAction', content: 'Registra las acciones del usuario sobre elementos de la interfaz, como clics, entradas de texto o cambios en campos de formulario.' },
  { title: 'addTracking', content: 'Cada acción se registra con el contexto y el elemento afectado.' },
  { title: 'initTracking', content: 'Inicializa el tracking.' },
  { title: 'syncTipoEjerFromOpener', content: 'Sincroniza la variable global tipoEjer con la ventana que abrió la actual (window.opener), útil si el contenido se abre como pop-up.' },
  { title: 'patchExpander', content: 'Modifica, actualiza y muestra según el tipo de ejercicio.' },
  { title: 'initAll', content: 'Ejecuta, sincroniza e inicializa el script completamente.' },
  { title: 'Créditos', content: 'Coral Jácome' },
];

export const Main = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? cardsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === cardsData.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      flex
      background={{
        image: 'linear-gradient(180deg, #3a2d7d 0%, #c49fff 100%)',
      }}
      pad="large"
      align="center"
      justify="center"
      style={{ minHeight: '70vh' }}
    >
      <Box direction="row" gap="large" justify="center" align="start" margin={{ bottom: 'medium' }}>
        <Card title={cardsData[activeIndex].title}>
          {cardsData[activeIndex].content}
        </Card>
      </Box>
      <ArrowNavigation onPrevious={handlePrevious} onNext={handleNext} />
    </Box>
  );
};
