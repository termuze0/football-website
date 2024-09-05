const apiKey = '1d2871803fc437ad5423fd255dc3fcd3'; // Replace with your API key
const apiUrl = 'https://v3.football.api-sports.io/players'; // API endpoint

// Event listener to trigger the search as the user types
document.getElementById('playerName').addEventListener('input', function () {
    const input = this.value.trim().toLowerCase();

    if (input.length >= 2) { // Start fetching after 2 characters
        fetchPlayers(input);
    } else {
        // Clear suggestions if input is less than 2 characters
        document.getElementById('suggestions').innerHTML = '';
    }
});

function fetchPlayers(query) {
    const suggestionsList = document.getElementById('suggestions');

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Fetch player data from the API
    fetch(`${apiUrl}?search=${query}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Extract player names from the API response
        const players = data.response; // Adjust this based on actual API response structure

        if (players.length > 0) {
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = `${player.player.name}`;
                suggestionsList.appendChild(option);
            });
        } else {
            // Optionally add a "No players found" option
            const option = document.createElement('option');
            option.value = "No players found";
            suggestionsList.appendChild(option);
        }
    })
    .catch(error => console.error('Error fetching players:', error));
}

// Function to search the player on Wikipedia
function searchPlayer() {
    const playerName = document.getElementById('playerName').value.trim().toLowerCase();
    
    if (playerName) {
        const formattedName = playerName.replace(/\s+/g, '_');
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${formattedName}`;
        window.location.href = wikipediaUrl;
    } else {
        alert('Please enter a player name.');
    }
}

// Event listeners for button click and "Enter" key press
document.getElementById('fetchButton').addEventListener('click', searchPlayer);
document.getElementById('playerName').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
});
