async function fetchCharacterData(url) {
    console.log(url);
    return fetch(url)
            .then(res=>res.json())
            .then(res=>res);
} 

function getLastPart(resourceUrl) {
    const parts = resourceUrl.split('/');
    return parts.at(-1);
  }
async function loadComicCharacter(characterItem) {

    const characterData = await fetchCharacterData(`${baseCharactersUrl}/characters/${getLastPart(characterItem.resourceURI)}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
    let data = characterData.data.results[0];
    console.log(data);
    const currData = `<div class="com-card">
                <button id="fav-Char-${data.id}" class='add-fav' onclick="toggleLike(${data.id})">
                    <i class="fa-solid fa-star fa-beat"></i>
                </button>
                <img src="${data.thumbnail.path}.${data.thumbnail.extension}">
                <div class="com-title"><a href="./character.html?id=${data.id}">${data.name}</a></div>
            </div>`

    document.getElementById('com-div').innerHTML += currData;
}

function loadComicPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const comicId = urlParams.get('id');

    let wholeComicData = JSON.parse(localStorage.getItem('Comics'));

    const Comic = wholeComicData.find(e => e.id == comicId);
    console.log(Comic);

    let dataLoad = '';
    dataLoad += ` <div class="char-cover">
                        <img class="char-cover-pic" src="${Comic.images[0].path}.${Comic.images[0].extension}"/>`;
    dataLoad += `   <div class="char-content">
                            <h1 style="color:red">${Comic.title}</h1>
                            <p >${Comic.description}</p>
                            <button id="fav-button">Favorite</button>
                        </div>
                        
                      </div>
                      
                      `;

    document.getElementById('char-details').innerHTML += dataLoad;
    //console.log(data[0].comics.items[0].resourceURI)

    Comic.characters.items.forEach(character => {
        loadComicCharacter(character)
    });

}

document.addEventListener('DOMContentLoaded', loadComicPage);