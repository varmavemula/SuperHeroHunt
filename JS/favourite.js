// Function to load characters from local storage
let savedCharacters = [];
let likedCharacters = [];

function loadFromLocalStorage() {
    likedCharacters = []
    savedCharacters = JSON.parse(localStorage.getItem('character'));
    savedCharacters.forEach(character => {
        if (character.liked) {
            likedCharacters.push(character);
        }
    })
    renderFavoritesPage();
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Function to render liked characters on the favorites page
function renderFavoritesPage() {
    const favoritespage = document.getElementById('fav-container');
    favoritespage.innerHTML = '';

    //const likedCharacters = savedCharacters.filter(character => character.liked);
    if (likedCharacters.length != 0) {

        let Rows = '';
        likedCharacters.forEach(character => {

            Rows += `   
                
                    
                    <div id="card" class="card">
                    <a class="remove" id="remove" onclick="toggleLike(${character.id})">X</a>
                        <img  src="${character.image}"/>
                        <a id="fav-card-a" href="./character.html?id=${character.id}" target="_blank">
                            <div class="text-wrap">${character.name}</div>
                        </a>
                    </div>
                
                `;

            document.getElementById('fav-container').innerHTML = Rows;
        });
    }
    else {
        document.getElementById('fav-container').innerHTML += `<h2>nothing is liked to show here!</h2>`;
    }
}
