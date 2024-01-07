const url = window.location.href;

// Function to toggle the liked status of a character
function toggleLike(characterId) {
  if(url.endsWith("/favourite.html")){
    let listlikedCharacters=JSON.parse(localStorage.getItem('character'));
    console.log(listlikedCharacters);
    const character = listlikedCharacters.find(c => c.id == characterId);
     
    character.liked = !character.liked;
    console.log(character);
    console.log(listlikedCharacters);
    localStorage.setItem('character', JSON.stringify(listlikedCharacters));
    loadFromLocalStorage();
    return;
  }
  else{
    console.log(characterId);
    const character = characterData.find(c => c.id == characterId);
    // if (character) {
        console.log(character.liked);
      character.liked = !character.liked;
      localStorage.setItem('character', JSON.stringify(characterData));
      
     // Update homepage after liking/unliking
      }
      
      
    
  }
  
  