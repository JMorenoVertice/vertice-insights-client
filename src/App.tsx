// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';  // Importa el archivo CSS para los estilos

// Definir tipo para las métricas
interface Metric {
  title: string;
  front: string;
}

const App = () => {
  const [startTime] = useState<number>(Date.now());
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Mnejo del tiempo en pantalla
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      console.log(`Tiempo en pantalla: ${timeSpent} segundos`);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [startTime]);

  // funcion de manejo de clics
  const handleClick = useCallback((e: React.MouseEvent) => {
    console.log(`Click en: ${e.currentTarget.tagName}, Texto: ${e.currentTarget.textContent}`);
  }, []);

  // alterna inforacion extra en las metricas 
  const toggleExtraInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('open');
  };

  // Lista de métricas
  const metrics: Metric[] = [
    { title: 'scorm-worker.js', front: 'Es un script que gestiona la comunicación entre un curso eLearning y un LMS compatible con SCORM, usualmente desde un Web Worker.' },
    { title: 'scorm-events.js', front: 'Maneja los eventos relacionados con SCORM, como el seguimiento del progreso y la interacción del usuario dentro del curso.' },
    { title: 'getAPI', front: 'Es una función que busca y devuelve el objeto SCORM API del LMS para permitir la comunicación con el curso.' },
    { title: 'getFingerprint', front: 'Es una función que genera un identificador único del usuario o dispositivo, normalmente usando características del navegador para fines de seguimiento o análisis.' },
    { title: 'logElementsActions', front: 'Es una función que registra las acciones del usuario sobre elementos del curso, como clics o interacciones, para fines de seguimiento o análisis.' },
    { title: 'addTracking', front: 'Es una función que registra eventos o interacciones del usuario para llevar un seguimiento de su progreso en el curso.' },
    { title: 'initTracking', front: 'Es una función que inicializa el sistema de seguimiento del curso, preparando la recopilación de datos del usuario desde el inicio.' },
    { title:'syncTipoEjerFromoPener', front: 'Es una función que sincroniza el tipo de ejercicio desde la ventana principal (opener) al curso actual, útil en entornos con ventanas emergentes.' },
    { title: 'PatchExpander', front: 'Es una función o clase que aplica ajustes o expansiones a elementos del curso, posiblemente para corregir o mejorar su comportamiento visual o funcional.' },
    { title: 'initializeModules', front: 'Genera una huella digital única para cada dispositivo, permitiendo su identificación y seguimiento sin el uso de cookies.' },
  ];

  // funcion manejo de solicitud de informacion
  const handleRequestInfo = () => {
    alert('Gracias por tu interés. Te contactaremos pronto.');
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div
      onClick={handleClick}
      className={darkMode ? 'dark-mode' : 'light-mode'}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDarkMode();
        }}
        className="toggle-mode-btn top-right"
        aria-label="Alternar modo claro/oscuro"
      >
        {darkMode ? (
          
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a259e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z"/>
          </svg>
        ) : (
          
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a259e6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        )}
      </button>
      <header>
        <h1 className="purple-text">SCORM Analytics</h1>
        <p className="purple-text">Soluciones inteligentes para el aprendizaje personalizado</p>
      </header>

      <div className="container">
        <section className="section">

          <div className="metrics-grid">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-box" onClick={toggleExtraInfo}>
                <div className="metric-box-inner">
                  <div className="metric-box-front">
                    <h3 className="purple-text">{metric.title}</h3>
                    <p className="purple-text">{metric.front}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section why-choose-us">
          <h2 className="purple-text">¿Por qué elegirnos?</h2>
          <p className="purple-text">
            Nuestra tecnología convierte datos en conocimiento útil, permitiendo una formación más eficaz, personalizada y orientada a resultados.
          </p>
          <button onClick={handleRequestInfo}>
            Solicitar más información
          </button>
        </section>
      </div>

      <footer>
        <span className="purple-text">
          &copy; 2025 Formación Digital Inteligente · Innovación y aprendizaje impulsados por datos.
        </span>
      </footer>
    </div>
  );
};

export default App;
