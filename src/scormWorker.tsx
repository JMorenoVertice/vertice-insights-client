document.addEventListener('DOMContentLoaded', function () {

  // DOM Variables 

  var panel = document.createElement('div');

  var output = document.createElement('div');

  var square1 = document.createElement('div');

  var square2 = document.createElement('div');

  var square3 = document.createElement('div');

  var square4 = document.createElement('div');

  var button = document.createElement('button');

  var clearButton = document.createElement('button');

  var counter = 1;

  var event = JSON.parse(localStorage.getItem('eventsData') || '[]');

  var trackingData = {

    eventsData: event

  };



  // Styles for Panel and Output 

  panel.style.cssText = 'position:fixed;top:10px;right:10px;width:300px;height:300px;background:#f0f0f0;border:1px solid #ccc;padding:10px;z-index:9999;';

  output.style.cssText = 'height:200px;overflow-y:scroll;border:1px solid #ddd;padding:5px;margin-bottom:10px;font-family:monospace;font-size:12px;';



  // Styles for the 4 Squares 

  square1.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px;height:100px;padding:20px;position:absolute;top:10%;left:10%;border:none;z-index:9999';

  square2.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px;height:100px;padding:20px;position:absolute;top:10%;left:55%;border:none;z-index:9999';

  square3.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px;height:100px;padding:20px;position:absolute;top:55%;left:10%;border:none;z-index:9999';

  square4.style.cssText = 'background:black;color:white;display:flex;justify-content:center;align-items:center;width:100px;height:100px;padding:20px;position:absolute;top:55%;left:55%;border:none;z-index:9999';



  // Styles for Buttons 

  clearButton.style.cssText = 'margin-left:20px';

  button.textContent = 'Test';

  clearButton.textContent = 'Clear';



  // Square Text Content 

  square1.textContent = 'TESTING1';

  square2.textContent = 'TESTING2';

  square3.textContent = 'TESTING3';

  square4.textContent = 'TESTING4';



  // Adding to the Window 

  panel.append(output);

  panel.append(button);

  panel.append(clearButton);

  document.body.append(square1);

  document.body.append(square2);

  document.body.append(square3);

  document.body.append(square4);

  document.body.append(panel);



  // Variables to track time 

  let mouseEnterTimeSquare1 = null;

  let mouseEnterTimeSquare2 = null;

  let mouseEnterTimeSquare3 = null;

  let mouseEnterTimeSquare4 = null;



  // Functions 

  function mouseCount() {

    return counter++;

  }



  function trackTimeSpentOverSquare(startTime, endTime, squareName) {

    const timeSpent = (endTime - startTime) / 1000; // Time in seconds 

    const message = `${squareName} - Mouse was over for ${timeSpent} seconds`;



    // Track the time spent and send it 

    trackEvent(squareName, timeSpent, message);

  }



  // Event listeners 

  button.addEventListener('click', function () {

    console.log('Button clicked');

    trackEvent('button_click', 0, 'Button clicked'); // Send time as 0 for button click 

  });



  clearButton.addEventListener('click', function () {

    localStorage.removeItem('eventsData');

    trackingData.eventsData = [];

    counter = 1; // Reset counter here 

    output.innerHTML = '';

  });



  square1.addEventListener('mouseover', function () {

    console.log('Mouse over square1 (Count: ' + mouseCount() + ')');

    mouseEnterTimeSquare1 = new Date();  // Track when the mouse enters square 1 

    trackEvent('mouseover_square1', 0, 'Mouse over square 1');

  });



  square1.addEventListener('mouseout', function () {

    if (mouseEnterTimeSquare1) {

      const mouseLeaveTime = new Date();  // Track when the mouse leaves square 1 

      trackTimeSpentOverSquare(mouseEnterTimeSquare1, mouseLeaveTime, 'Square 1');

    }

  });



  square2.addEventListener('mouseover', function () {

    console.log('Mouse over square2 (Count: ' + mouseCount() + ')');

    mouseEnterTimeSquare2 = new Date();  // Track when the mouse enters square 2 

    trackEvent('mouseover_square2', 0, 'Mouse over square 2');

  });



  square2.addEventListener('mouseout', function () {

    if (mouseEnterTimeSquare2) {

      const mouseLeaveTime = new Date();  // Track when the mouse leaves square 2 

      trackTimeSpentOverSquare(mouseEnterTimeSquare2, mouseLeaveTime, 'Mouse left square 2');

    }

  });



  square3.addEventListener('mouseover', function () {

    console.log('Mouse over square3 (Count: ' + mouseCount() + ')');

    mouseEnterTimeSquare3 = new Date();  // Track when the mouse enters square 3 

    trackEvent('mouseover_square3', 0, 'Mouse over square 3');

  });



  square3.addEventListener('mouseout', function () {

    if (mouseEnterTimeSquare3) {

      const mouseLeaveTime = new Date();  // Track when the mouse leaves square 3 

      trackTimeSpentOverSquare(mouseEnterTimeSquare3, mouseLeaveTime, 'Mouse left square 3');

    }

  });



  square4.addEventListener('mouseover', function () {

    console.log('Mouse over square4 (Count: ' + mouseCount() + ')');

    mouseEnterTimeSquare4 = new Date();  // Track when the mouse enters square 4 

    trackEvent('mouseover_square4', 0, 'Mouse over square 4');

  });



  square4.addEventListener('mouseout', function () {

    if (mouseEnterTimeSquare4) {

      const mouseLeaveTime = new Date();  // Track when the mouse leaves square 4 

      trackTimeSpentOverSquare(mouseEnterTimeSquare4, mouseLeaveTime, 'Mouse left square 4');

    }

  });



  window.addEventListener('scroll', function () {

    console.log('Page scrolled');

    trackEvent('scroll', 0, 'Page scrolled'); // Send time as 0 for scroll 

  });



  // Track and send event to the server 

  function trackEvent(eventType, timeSpent, description) {

    const eventData = {

      timestamp: new Date().toISOString(),

      event: eventType,

      description: description,

      timeSpent: timeSpent

    };



    // Save to localStorage 

    trackingData.eventsData.push(eventData);

    localStorage.setItem('eventsData', JSON.stringify(trackingData.eventsData));



    // Update output with the latest event information 

    output.innerHTML = `<b>Latest Event:</b> ${eventData.description} <br><b>Time Spent:</b> ${eventData.timeSpent} seconds <br><b>Timestamp:</b> ${eventData.timestamp} <br><br>` + output.innerHTML;



    // Send the event to the server 

    fetch('http://localhost:3000/api/userdata', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(eventData)

    })

      .then(response => response.json())

      .then(data => {

        console.log('Event sent to server:', data);

      })

      .catch((error) => {

        console.error('Error sending event to server:', error);

      });

  }



});

