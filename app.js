document.addEventListener(`DOMContentLoaded`, () => {
    const filmsList = document.getElementById('films');
    const filmDetails = document.getElementById('film-details');
    const buyTicketButton =document.getElementById('buy-ticket');

    let currentFilm; // Store currently displayed film data
    let availableTickets; // Number of available tickets

    //fetch movie data from API endpoint
    fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => {
        
      })
})