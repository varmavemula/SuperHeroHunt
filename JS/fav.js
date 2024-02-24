const url = window.location.href;

// Function to toggle the liked status of a character
function toggleLike(characterId) {
  let allCharacters = JSON.parse(localStorage.getItem('character'));

  if (url.endsWith("/favourite.html")) {
    //let listlikedCharacters=JSON.parse(localStorage.getItem('character'));
    //console.log(listlikedCharacters);
    const character = allCharacters.find(c => c.id == characterId);

    character.liked = !character.liked;
    console.log(character);
    //console.log(listlikedCharacters);
    localStorage.setItem('character', JSON.stringify(allCharacters));
    loadFromLocalStorage();
    return;
  }
  else {
    console.log(characterId);
    const character = allCharacters.find(c => c.id == characterId);
    // if (character) {
    console.log(character.liked);
    character.liked = !character.liked;
    // document.getElementById("fav-Char").style.backgroundColor=('red');
    console.log("fav-Char-" + `${characterId}`);
    document.getElementById("fav-Char-" + `${characterId}`).style.color = ('red');

    localStorage.setItem('character', JSON.stringify(allCharacters));
  }
}
function formatTable(dataString) {
  return `${dataString}`;
}

function renderHeroPage() {
  let currRows = '';
  allCharacters.map(item => {
    currRows += `<table><tbody><tr >
                        <td class='character'>
                          <img class="profile" href='./HTML/character.html?id=${item.id}'  src="${item.image}"/>
                        </td>`;
    currRows += `
                        <td class='name-cell'>
                          <a href="./HTML/character.html?id=${item.id}" onclick="loadData(${item})">
                            <div class='name-div'>${item.name}</div>
                          </a>
                          <button id="fav-Char-${item.id}" onclick="toggleLike(${item.id})" class='add-fav'>
                            <i class="fa-solid fa-star fa-beat"></i>
                          </button>
                        </td></tr></tbody></table>`;
  });

  document.getElementById('results-container').innerHTML = formatTable(currRows);
}


