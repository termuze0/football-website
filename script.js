const apiKey = '44fea313c88ac1a697560f71ebd8e8bb'; // Your API key
const apiUrl = 'https://api-football-v1.p.rapidapi.com/v4/players'; // API endpoint

// Event listener to trigger the search as the user types
document.getElementById('playerName').addEventListener('input', function () {
    const input = this.value.trim();

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
        const players = data.response; // Adjust based on actual API response structure

        if (players.length > 0) {
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.player.name; // Adjust based on actual API response structure
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
    const playerName = document.getElementById('playerName').value.trim();
    
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
