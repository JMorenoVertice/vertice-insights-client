import React from 'react';

export const AboutUs = () => (
  <div className="aboutus-box">
    <p>
      Este proyecto se centra en el desarrollo de un script diseñado para integrarse con cursos SCORM y ampliar significativamente las capacidades de seguimiento de interacción del usuario.
      <br /><br />
      Mientras que los estándares SCORM tradicionales permiten registrar datos básicos como progreso y puntuaciones, nuestro script captura eventos detallados de usuario, tales como clicks y movimientos de scroll dentro del contenido del curso. Esta información se almacena de manera eficiente en la base de datos (Kafka) utilizando los canales estándar de SCORM, garantizando compatibilidad y facilidad de integración.
      <br /><br />
      El análisis de estos datos permite obtener estadísticas precisas y valiosas sobre cómo los estudiantes interactúan con los cursos, facilitando la toma de decisiones informadas para mejorar el diseño, la usabilidad y la efectividad de futuros contenidos educativos.
      <br /><br />
      Conscientes de las limitaciones técnicas de almacenamiento en SCORM, nuestro enfoque incluye técnicas para optimizar y comprimir la información recopilada, asegurando un rendimiento óptimo sin comprometer la calidad del seguimiento.
      <br /><br />
      En resumen, el script <span className="aboutus-highlight">scorm-worker.js</span> representa un avance significativo en el seguimiento y análisis de la experiencia de aprendizaje digital, proporcionando a desarrolladores y educadores herramientas para crear cursos más adaptados y efectivos.
    </p>
  </div>
);
