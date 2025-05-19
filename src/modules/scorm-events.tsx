import { Kafka } from 'kafkajs';
import { logElementAction } from './scorm/logElementAction';

// ...importar otras funciones según sea necesario...

console.log("////////// EVENTS MODULE LOADED //////////");

// --- GLOBAL VARIABLE FOR EXERCISE TYPE ---
declare global {
    interface Window {
        tipoEjer: string | null;
        scoEjerciciosTipo?: { url: string; tipo: string }[];
        hs?: any;
    }
}
window.tipoEjer = null;

// --- CONFIGURACIÓN DE KAFKA ---
const kafka = new Kafka({
    clientId: 'vertice-insights-client',
    brokers: ['localhost:9092'], // Cambia esto si tu broker está en otra dirección
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });

// --- FUNCIÓN PARA CREAR UN TOPIC ---
export async function createTopic(topicName: string): Promise<void> {
    const admin = kafka.admin();
try {
    await admin.connect();
    await admin.createTopics({
        topics: [{ topic: topicName }],
    });
    console.log(`Topic "${topicName}" creado exitosamente.`);
} catch (error) {
        console.error(`Error al crear el topic "${topicName}":`, error);
    } finally {
    await admin.disconnect();
}
}

// --- FUNCIÓN PARA PRODUCIR MENSAJES ---
export async function produceMessage(topicName: string, message: object): Promise<void> {
try {
    await producer.connect();
    await producer.send({
        topic: topicName,
        messages: [{ value: JSON.stringify(message) }],
    });
    console.log(`Mensaje enviado al topic "${topicName}":`, message);
} catch (error) {
        console.error(`Error al enviar mensaje al topic "${topicName}":`, error);
    } finally {
    await producer.disconnect();
}
}

// --- FUNCIÓN PARA CONSUMIR MENSAJES ---
export async function consumeMessages(topicName: string): Promise<void> {
try {
    await consumer.connect();
    await consumer.subscribe({ topic: topicName, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Mensaje recibido del topic "${topic}": ${message.value?.toString()}`);
        },
    });
} catch (error) {
        console.error(`Error al consumir mensajes del topic "${topicName}":`, error);
    }
}

// --- Export initTracking for external control ---
export async function initTracking(): Promise<void> {
    const topicName = 'user-events';
    await createTopic(topicName); // Asegurarse de que el topic exista

    document.addEventListener('click', async e => {
        const event = {
            type: 'click',
            target: (e.target as HTMLElement).tagName,
            timestamp: new Date().toISOString(),
        };
        await produceMessage(topicName, event);
    });

    document.addEventListener('input', async e => {
        const target = e.target as HTMLElement;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
            const event = {
                type: 'input',
                target: target.tagName,
                value: (e.target as HTMLInputElement).value,
                timestamp: new Date().toISOString(),
            };
            await produceMessage(topicName, event);
        }
    });

    document.addEventListener('change', async e => {
        const target = e.target as HTMLElement;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
            const event = {
                type: 'change',
                target: target.tagName,
                value: (e.target as HTMLInputElement).value,
                timestamp: new Date().toISOString(),
            };
            await produceMessage(topicName, event);
        }
    });
}
