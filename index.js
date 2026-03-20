// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";
//handle the click event for the button
document.getElementById('fetch-alerts').addEventListener('click', 
  getWeatherAlerts);

// a function to get the weather alerts for a given state
async function getWeatherAlerts(state) {
    //receive the state abbreviation from the input field and sets state
    state = document.getElementById('state-input');
    fetch(weatherApi + state.value)
    .then(response => {
      if (!response.ok) {  
        throw new Error(`HTTP error! status: ${response.status}`);}
        //clears and hides error div if the fetch is successful
        const errorMessageDiv = document.getElementById('error-message');
        errorMessageDiv.textContent = '';
        errorMessageDiv.classList.add('hidden');
      return response.json();

    })
    .then(data => {
      //display the weather alerts in the DOM
      displayAlerts(data);
    })
    .catch(error => {
        //if fetch fails, log the error and display an error message in the DOM
      console.error('Error fetching weather alerts:', error.message);
      const errorMessageDiv = document.getElementById('error-message');
      errorMessageDiv.textContent = error.message;
      errorMessageDiv.classList.remove('hidden');
    });
// a function to display the weather alerts in the DOM
function displayAlerts(alertData) {
  const displayDiv = document.getElementById('alerts-display');
  displayDiv.innerHTML = `<h2>${alertData.title}: ${alertData.features.length}</h2>`;       
  alertData.features.forEach(alert => {
    const alertElement = document.createElement('p');
    //adds headline and number of same reports to the DOM
    alertElement.textContent = alert.properties.headline+`: ${alertData.features.filter(a => a.properties.headline === alert.properties.headline).length}`;

    displayDiv.appendChild(alertElement);
  });}
 state.value= ''; //clears the input field after clicking fetch

}