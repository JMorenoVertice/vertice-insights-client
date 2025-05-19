// src/App.tsx
import React, { useEffect, useState, useCallback } from 'react';
import './App.css';  // Importa el archivo CSS para los estilos
import { Main } from './components/Main';
import { AboutUs } from './components/AboutUs';
import { Welcome } from './components/Welcome';

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
        <Welcome/>
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
          <Main/>
        </section>

        <section className="section why-choose-us">
          <h2>¿Por qué elegirnos?</h2>
          <AboutUs/>
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
