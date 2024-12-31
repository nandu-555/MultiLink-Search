// let tabInterval; // Global variable to store the interval reference

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('Service Worker registered:', registration))
      .catch(error => console.log('Service Worker registration failed:', error));
  }

let intervalId;
const linksTextArea = document.getElementById("urls");
const delayInput = document.getElementById("delay");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

startButton.addEventListener("click", () => {
  const links = linksTextArea.value.split('\n').map(link => link.trim()).filter(link => link !== '');
  const delay = parseInt(delayInput.value) * 1000; // Convert delay to milliseconds

  if (links.length > 0 && delay > 0) {
    let index = 0;
    
    // Disable start button and enable stop button
    stopButton.disabled = false;
    startButton.disabled = true;

    // Set up an interval to open links one at a time
    intervalId = setInterval(() => {
      if (index >= links.length) {
        clearInterval(intervalId);
        stopButton.disabled = true;
        startButton.disabled = false;
        return;
      }
      
      // Open each link in a new tab and attempt to prevent focus shift
      const newTab = window.open(links[index], '_blank', 'noopener,noreferrer');
      
      // Attempt to close the tab immediately to suppress visible behavior (only works in some browsers)
      if (newTab) {
        newTab.blur(); // Try to remove focus from the tab
        window.focus(); // Refocus the current window
      }

      index++;
    }, delay);
  } else {
    alert("Please enter valid URLs and delay time.");
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  stopButton.disabled = true;
  startButton.disabled = false;
});
