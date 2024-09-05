document.getElementById('fetchButton').addEventListener('click', searchPlayer);
document.getElementById('playerName').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchPlayer();
    }
});

function searchPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    
    if (playerName) {
        // Replace spaces with underscores for Wikipedia URLs
        const formattedName = playerName.replace(/\s+/g, '_');
        const wikipediaUrl = https://en.wikipedia.org/wiki/${formattedName};
        
        // Redirect to Wikipedia page
        window.location.href = wikipediaUrl;
    } else {
        alert('Please enter a player name.');
    }
}
