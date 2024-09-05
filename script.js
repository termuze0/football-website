// Mock function to simulate API response
function fetchPlayers(query) {
    const suggestionsList = document.getElementById('suggestions');

    // Clear previous suggestions
    suggestionsList.innerHTML = '';

    // Dummy players data for testing
    const players = [
        { player: { name: "Lionel Messi" } },
        { player: { name: "Cristiano Ronaldo" } },
        { player: { name: "Neymar Jr" } },
        { player: { name: "Kylian Mbappe" } },
        { player: { name: "Zlatan Ibrahimović" } }
    ];

    // Simulate matching players based on query
    const filteredPlayers = players.filter(player => 
        player.player.name.toLowerCase().includes(query)
    );

    // Populate suggestions
    if (filteredPlayers.length > 0) {
        filteredPlayers.forEach(player => {
            const option = document.createElement('option');
            option.value = `${player.player.name}`;
            suggestionsList.appendChild(option);
        });
    } else {
        // If no players are found, show a message
        const option = document.createElement('option');
        option.value = "No players found";
        suggestionsList.appendChild(option);
    }
}
