// Function to toggle the liked status of a character
function toggleLike(characterId) {
    console.log(characterId);
    const character = characterData.find(c => c.id == characterId);
    // if (character) {
        console.log(character.liked);
      character.liked = !character.liked;
      localStorage.setItem('character', JSON.stringify(characterData));
    //   renderHomePage(); // Update homepage after liking/unliking
  
      // Update favorites page
      //renderFavoritesPage();
    
  }
  
  