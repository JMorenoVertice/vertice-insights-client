import React, { useState, useEffect } from 'react';

interface Actividad {
    contador: number;
    tiempo: number;
    activo: boolean;
    intervalo: NodeJS.Timeout | null;
}

interface Actividades {
    video: Actividad;
    lectura: Actividad;
}

const formatearTiempo = (s: number): string => {
    return `${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor((s%3600)/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
};

const ScormWorker: React.FC = () => {
    const [actividades, setActividades] = useState<Actividades>({
        video: { contador: 0, tiempo: 0, activo: false, intervalo: null },
        lectura: { contador: 0, tiempo: 0, activo: false, intervalo: null }
    });

    const actualizarContador = (tipo: 'video' | 'lectura') => {
        setActividades(prev => ({
            ...prev,
            [tipo]: {
                ...prev[tipo],
                contador: prev[tipo].contador,
                tiempo: prev[tipo].tiempo
            }
        }));
    };

    const toggleActividad = (tipo: 'video' | 'lectura') => {
        setActividades(prev => {
            const actividad = prev[tipo];
            if (!actividad.activo) {
                const intervalo = setInterval(() => {
                    setActividades(current => ({
                        ...current,
                        [tipo]: {
                            ...current[tipo],
                            tiempo: current[tipo].tiempo + 1
                        }
                    }));
                }, 1000);

                return {
                    ...prev,
                    [tipo]: {
                        ...actividad,
                        activo: true,
                        intervalo
                    }
                };
            } else {
                if (actividad.intervalo) {
                    clearInterval(actividad.intervalo);
                }
                console.log(`Has ${tipo === 'video' ? 'visto un video' : 'leído una página'}. Tiempo: ${formatearTiempo(actividad.tiempo)}`);
                
                return {
                    ...prev,
                    [tipo]: {
                        ...actividad,
                        activo: false,
                        intervalo: null,
                        contador: actividad.contador + 1
                    }
                };
            }
        });
    };

    const reiniciarContador = (tipo: 'video' | 'lectura' | 'todos') => {
        setActividades(prev => {
            if (tipo === 'todos') {
                Object.keys(prev).forEach(key => {
                    const actividad = prev[key as 'video' | 'lectura'];
                    if (actividad.intervalo) {
                        clearInterval(actividad.intervalo);
                    }
                });
                console.log('Todos los contadores reiniciados a 0');
                return {
                    video: { contador: 0, tiempo: 0, activo: false, intervalo: null },
                    lectura: { contador: 0, tiempo: 0, activo: false, intervalo: null }
                };
            }

            const actividad = prev[tipo];
            if (actividad.intervalo) {
                clearInterval(actividad.intervalo);
            }
            console.log(`Contador de ${tipo === 'video' ? 'videos' : 'páginas'} reiniciado a 0`);
            
            return {
                ...prev,
                [tipo]: {
                    contador: 0,
                    tiempo: 0,
                    activo: false,
                    intervalo: null
                }
            };
        });
    };

    // Cleanup intervals on component unmount
    useEffect(() => {
        return () => {
            Object.values(actividades).forEach(actividad => {
                if (actividad.intervalo) {
                    clearInterval(actividad.intervalo);
                }
            });
        };
    }, []);

    return (
        <div>
            <h1>Contador de Actividades</h1>
            <p>Haz clic en cualquiera de las cajas para iniciar/detener la actividad</p>
            
            <div 
                className={`cuadrado verde ${actividades.video.activo ? 'activo' : ''}`}
                onClick={() => toggleActividad('video')}
                style={{
                    width: '100px',
                    height: '100px',
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#4CAF50',
                    border: actividades.video.activo ? '3px solid red' : 'none'
                }}
            >
                Ver Video
            </div>
            
            <div 
                className={`cuadrado amarillo ${actividades.lectura.activo ? 'activo' : ''}`}
                onClick={() => toggleActividad('lectura')}
                style={{
                    width: '100px',
                    height: '100px',
                    margin: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#FFD700',
                    border: actividades.lectura.activo ? '3px solid red' : 'none'
                }}
            >
                Leer Página
            </div>

            <div style={{ margin: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <h3>Contadores:</h3>
                <p>Videos vistos: {actividades.video.contador}</p>
                <p>Paginas leidas: {actividades.lectura.contador}</p>
                <p>Tiempo en videos: {formatearTiempo(actividades.video.tiempo)}</p>
                <p>Tiempo en lectura: {formatearTiempo(actividades.lectura.tiempo)}</p>
            </div>

            <div>
                <h3>Reiniciar contadores:</h3>
                <button onClick={() => reiniciarContador('video')} style={{ margin: '5px' }}>
                    Reiniciar contador de videos
                </button>
                <button onClick={() => reiniciarContador('lectura')} style={{ margin: '5px' }}>
                    Reiniciar contador de paginas
                </button>
                <button onClick={() => reiniciarContador('todos')} style={{ margin: '5px' }}>
                    Reiniciar todos los contadores
                </button>
            </div>
        </div>
    );
};

export default ScormWorker; 