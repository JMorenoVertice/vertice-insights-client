var trackingData = {
    events: JSON.parse(localStorage.getItem('events') || '[]')
};
// Create panel
var panel = document.createElement('div');
panel.style.cssText = 'position:fixed;top:10px;right:10px;width:300px;height:300px;background:#f0f0f0;border:1px solid #ccc;padding:10px;z-index:9999;';

// Create output area
var output = document.createElement('div');
output.style.cssText = 'height:200px;overflow-y:scroll;border:1px solid #ddd;padding:5px;margin-bottom:10px;font-family:monospace;font-size:12px;';
panel.appendChild(output);

// Create testing elements 
var square = document.createElement('div');
var square1 = document.createElement('div');
square.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px; height:100px;padding:20px, position:initial;border:none; z-index:99999';
square.textContent = 'TESTING1';
square1.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px; height:100px;padding:20px, position:initial;border:none; z-index:99999;margin-Top:20px';
square1.textContent = 'TESTING2';
document.body.appendChild(square);
document.body.appendChild(square1);

// Add panel to body
document.body.appendChild(panel);

// Loading events from localStorage
loadEvents();

// Create the buttons
var button = document.createElement('button');
var clearButton = document.createElement('button');
button.textContent = 'Test';
clearButton.textContent = 'Clear';
clearButton.style.marginLeft = '20px';
panel.appendChild(button);
panel.appendChild(clearButton);

// Tracking function
function track(event) {
    //var counter = 0;
    var now = new Date().toString().split(" ");
    var message = "Timestamp(h/m/s): " + now[4] + ' - ' + event; // + " Count: " + counter++;
    output.innerHTML += message + '<br>';
    output.scrollTop = output.scrollHeight;
    console.log(message);
    trackingData.events.push(message);
    saveData();
}

function saveData(){
   try {
        localStorage.setItem('events', JSON.stringify(trackingData.events));
   } catch (error) {
        console.error('Error saving the data', error);
   }
}

// Loading the events
function loadEvents() {
    try {
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        trackingData.events = events;
        output.innerHTML = '';
        events.forEach(function (e) {
            output.innerHTML += e + '<br>';
    });
    output.scrollTop = output.scrollHeight;
        
    } catch (error) {
        console.error('Error loading the data', error);
        output.innerHTML = 'Error loading the data';
    }
    
}

// Event listeners
button.addEventListener('click', function () {
    track('Button clicked');
});

clearButton.addEventListener('click', function () {
    localStorage.removeItem('events');
    trackingData.events = [];
    output.innerHTML = '';
});

square.addEventListener('mouseover', function () {
    track('Mouse over square1');
});

square1.addEventListener('mouseover', function () {
    track('Mouse over square2');
});

window.addEventListener('scroll', function () {
    track('Page scrolled');
});
