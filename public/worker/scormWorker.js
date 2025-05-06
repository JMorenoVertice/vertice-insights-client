import { logElementAction } from './logElementAction.js';

console.log("////////// SCORM WORKER INITIALIZED //////////");

self.onmessage = (event) => {
  if (event.data.type === 'log-action') {
    logElementAction(event.data.context, event.data.elementInfo, event.data.action);
    self.postMessage({ status: 'logged' });
  }
};
// ALL MODULED BY CORAL JÁCOME
