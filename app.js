document.addEventListener(`DOMContentLoaded`, () => {
    const filmsList = document.getElementById('films');
    const filmDetails = document.getElementById('film-details');
    const buyTicketButton =document.getElementById('buy-ticket');

    let currentFilm; // Store currently displayed film data
    let availableTickets; // Number of available tickets

    //fetch movie data from API endpoint
    fetch('https://my-json-server.typicode.com/BRAVIN842/WEEK3CODECHALLENGE/films')
      .then(response => response.json())
      .then(films => {
        //Load details of first movie when page loads
        currentFilm = films[0];
        availableTickets = currentFilm.capacity - currentFilm.tickets_sold;

        //Display movie details
        displayMovieDetails(currentFilm);

        //Click event handler for "Buy Ticket" button
        buyTicketButton.addEventListener('click', () => {
            if(availableTickets > 0) {
                //if tickets are available,decrement count and update display
                availableTickets--;
                currentFilm.tickets_sold++;
                displayMovieDetails(currentFilm);

                //Check if movie is sold out
                if(availableTickets === 0) {
                    buyTicketButton.textContent = 'Sold Out';
                    buyTicketButton.classList.add('sold-out');
                }
            }
        });

        //Populate menu of all movies
        films.forEach(film => {
            const filmItem = document.createElement('li');
            filmItem.textContent = film.title;
            filmItem.className = 'film-item';
            filmsList.appendChild(filmItem);

            //Click event handler for movie selection
            filmItem.addEventListener('click',() => {
                currentFilm = film;
                availableTickets = currentFilm.capacity - currentFilm.tickets_sold;
                displayMovieDetails(currentFilm);

                //Reset the "Buy Ticket" button when switching movies
                buyTicketButton.textContent = 'Buy Ticket';
                buyTicketButton.classList.remove('sold-out');
            })
            
        });

      })
      .catch(error => console.error('Error fetching movie data:' , error));

      //Helper function to display movie details
      function displayMovieDetails(film) {
        //Update DOM elements with movie details
        document.getElementById('film-poster').src = film.poster;
        document.getElementById('film-title').textContent = film.title;
        document.getElementById('film-runtime').textContent = `Runtime: ${film.runtime} minutes`;
        document.getElementById('film-showtime').textContent = `Showtime: ${film.showtime}`;
        document.getElementById('film-tickets').textContent = `Available Tickets: ${availableTickets}`;
      }
});