const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let dataLoad = '';
const Charurl = `${baseCharactersUrl}characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const ComicUrl = `${baseCharactersUrl}characters/${id}/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}`


console.log(Charurl);
fetch(Charurl).then(function (response) {
  return response.json();
})
  .then(res => {
    console.log(res);
    let data = res.data.results;

    dataLoad += ` <div class="char-cover">
                        <img class="char-cover-pic" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}"/>`;
    dataLoad += `   <div class="char-content">
                            <h1 style="color:red">${data[0].name}</h1>
                            <p >${data[0].description}</p>
                            <button id="fav-button">${favStatus}</button>
                        </div>
                        
                      </div>
                      
                      `;

    document.getElementById('char-details').innerHTML += dataLoad;
    console.log(data[0].comics.items[0].resourceURI);
  });

fetch(ComicUrl).then(function (response) {
  return response.json();
})
  .then(res => {
    console.log(res);
    let data = res.data.results;
    let currData = '<div id="com-div">';

    data.forEach(element => {
      currData += `<div class="com-card">
                            <button id="fav-Char-${element.id}" class='add-fav' onclick="toggleLike(${element.id})">
                                <i class="fa-solid fa-star fa-beat"></i>
                            </button>
                            <img src="${element.images[0].path}.${element.images[0].extension}">
                           <div class="com-title"><p>${element.title}</p></div>
                        </div>`

      console.log(element.title);
    });
    currData += '</div>';
    document.getElementById('comics').innerHTML += currData;
  });


