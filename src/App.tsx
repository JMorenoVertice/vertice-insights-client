<<<<<<< HEAD
import { Grommet, Box } from 'grommet';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { CoralDev } from './components/CoralDev';
import { AboutUs } from './components/AboutUs';

const theme = {
  global: {
    colors: {
      brand: '#6200c5',
      background: 'linear-gradient(90deg, #6200c5 0%, #ff27fc 300%)',
    },
    font: {
      family: 'Arial',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme} full>
      <Box
        fill
        background="linear-gradient(135deg, #6200c5 0%, #ff27fc 600%)"
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CoralDev />
        <Box flex="grow" width="100%">
          <Main />
          <AboutUs />
        </Box>
        <Footer />
      </Box>
    </Grommet>
  );
}
export default App;
=======
// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';  // Importa el archivo CSS para los estilos

// Definir tipo para las métricas
interface Metric {
  title: string;
  front: string;
  back: string;
}

const App = () => {
  const [startTime] = useState<number>(Date.now());

  // Manejo del tiempo en pantalla
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      console.log(`Tiempo en pantalla: ${timeSpent} segundos`);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [startTime]);

  // Función de manejo de clics
  const handleClick = useCallback((e: React.MouseEvent) => {
    console.log(`Click en: ${e.currentTarget.tagName}, Texto: ${e.currentTarget.textContent}`);
  }, []);

  // Alternar información extra en las métricas
  const toggleExtraInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('open');
  };

  // Lista de métricas
  const metrics: Metric[] = [
    {
      title: 'getDataAttributes',
      front: 'Extrae atributos personalizados de los elementos HTML para capturar datos clave del usuario o del contenido.',
      back: 'Extrae información personalizada de los elementos HTML usando atributos especiales, lo que permite capturar datos clave del usuario o contenido de forma sencilla.',
    },
    {
      title: 'getParentStructure',
      front: 'Identifica y estructura jerárquicamente los elementos contenedores para entender el contexto del usuario.',
      back: 'Identifica y organiza los elementos HTML en una estructura jerárquica para entender mejor el contexto en el que se encuentra el usuario.',
    },
    {
      title: 'mouseMovementTracker',
      front: 'Registra los movimientos del mouse para analizar el interés y la atención del usuario en tiempo real.',
      back: 'Registra los movimientos del mouse para analizar en tiempo real qué áreas de la página captan más la atención del usuario.',
    },
    {
      title: 'updateTipoEjerOnClick',
      front: 'Actualiza dinámicamente el tipo de ejercicio seleccionado al hacer clic, permitiendo adaptar la experiencia formativa.',
      back: 'Cambia el tipo de ejercicio de forma automática cuando se hace clic, adaptando así la experiencia de aprendizaje al usuario.',
    },
    {
      title: 'logElementAction',
      front: 'Función central que registra las acciones del usuario e integra todas las funciones anteriores para un análisis completo.',
      back: 'Registra todas las acciones del usuario y combina la información de las funciones anteriores para un análisis completo del comportamiento.',
    },
    {
      title: 'fingerprint',
      front: 'Genera una huella digital única para cada dispositivo, permitiendo su identificación y seguimiento sin el uso de cookies.',
      back: 'Crea una identificación única para cada dispositivo, permitiendo su seguimiento sin necesidad de usar cookies.',
    },
  ];

  // Función para manejar la solicitud de más información
  const handleRequestInfo = () => {
    alert('Gracias por tu interés. Te contactaremos pronto.');
  };

  return (
    <div onClick={handleClick}>
      <header>
        <h1>SCORM Analytics</h1>
        <p>Soluciones inteligentes para el aprendizaje personalizado</p>
      </header>

      <div className="container">
        <section className="section">
          <h2>¿Qué ofrecemos?</h2>
          <p>
            Ofrecemos una solución integral de analítica de comportamiento orientada a la formación digital. Nuestro sistema recopila y analiza datos clave como clics, navegación, tiempo en pantalla y más, para detectar puntos de fricción, abandono o desinterés en el proceso formativo. Gracias a esta información, personalizamos el recorrido de aprendizaje de cada usuario, adaptando contenidos, formatos y ejercicios a sus necesidades reales. Esto se traduce en una experiencia educativa más eficiente, atractiva y centrada en el usuario.
          </p>
        </section>

        <section className="section">
          <h2>¿Qué medimos?</h2>
          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-box" onClick={toggleExtraInfo}>
                <div className="metric-box-inner">
                  <div className="metric-box-front">
                    <h3>{metric.title}</h3>
                    <p>{metric.front}</p>
                  </div>
                  <div className="metric-box-back">
                    <p>{metric.back}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section why-choose-us">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            Nuestra tecnología convierte datos en conocimiento útil, permitiendo una formación más eficaz, personalizada y orientada a resultados.
          </p>
          <button onClick={handleRequestInfo}>
            Solicitar más información
          </button>
        </section>
      </div>

      <footer>
        &copy; 2025 Formación Digital Inteligente · Innovación y aprendizaje impulsados por datos.
      </footer>
    </div>
  );
};

export default App;
>>>>>>> 35c9b5f292afb60d8d4566794280902d04c5d839
