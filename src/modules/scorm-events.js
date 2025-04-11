console.log("///////////////////////////////////////////////////////////////////////EVENTOS");

// GLOBAL VARIABLES 

let clickCount = 0;
let idClickCount = 0;
let classClickCount = 0;
let idclassClickCount = 0;
let elementClickCount = 0;
const MAX_CLICK_DELAY = 300;

// GLOBAL EVENT LISTENER PARA CLIC Y DOBLE CLIC 

document.addEventListener("pointerdown", function (e) {
    const clickedElement = e.target;
    if (!clickedElement) return;
    const now = new Date();
    const timestamp = now.toLocaleTimeString("es-ES", { hour12: false });
    clickCount++;

    setTimeout(() => {

        if (clickCount === 1) {

            // CLICK SIMPLE 
            getLogElement(clickedElement, "CLICKED", timestamp);

        } else if (clickCount === 2) {

            // DOBLE CLIC 
            getLogElement(clickedElement, "DOUBLE CLICKED", timestamp);

        }

        clickCount = 0;

    }, MAX_CLICK_DELAY);

});



// TRACKING ELEMENTS 

function getLogElement(clickedElement, action, timestamp) {

    const id = clickedElement.getAttribute("id");
    const className = clickedElement.getAttribute("class");

    if (id && className) {

        idclassClickCount++;
        console.log(`${action} - AT ${timestamp} - ID: ${id} / CLASS: ${className} - TOTAL ID AND CLASS CLICKS: ${idclassClickCount}`);
        idclassClickCount = 0;

    } else if (id) {

        idClickCount++;
        console.log(`${action} - AT ${timestamp} - ID: ${id} - TOTAL ID CLICKS: ${idClickCount}`);
        idClickCount = 0;

    } else if (className) {

        classClickCount++;
        console.log(`${action} - AT ${timestamp} - CLASS: ${className} - TOTAL CLASS CLICKS: ${classClickCount}`);
        classClickCount = 0;

    } else {

        elementClickCount++;
        console.log(`${action} - AT ${timestamp} - ELEMENT HAS NO ID OR CLASS - TOTAL NO ID OR CLASS CLICKS: ${elementClickCount}`);

    }

} 