const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let dataLoad = '';
const Charurl = `${baseCharactersUrl}characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const ComicUrl = `${baseCharactersUrl}characters/${id}/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const EventUrl = `${baseCharactersUrl}characters/${id}/events?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

fetch(Charurl).then(function (response) {
  return response.json();
})
  .then(res => {
    let data = res.data.results;
    dataLoad += ` <div class="char-cover">
                        <img class="char-cover-pic" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}"/>`;
    dataLoad += `   <div class="char-content">
                            <h1 style="color:red">${data[0].name}</h1>
                            <p >${data[0].description}</p>
                           
                        </div>
                        
                      </div>
                      
                      `;

    document.getElementById('char-details').innerHTML += dataLoad;
  });


let ComicsData = [];
let comicsBool = new Map();
fetch(ComicUrl).then(function (response) {
  return response.json();
})
  .then(res => {
    let data = res.data.results;
    let currData = '<div id="com-div">';

    if (data.length != 0) {
      data.forEach(element => {
        currData += `<div class="com-card">
                            <img src="${element.thumbnail.path}.${element.thumbnail.extension}">
                           <div class="com-title"><a href="./comic.html?id=${element.id}">${element.title}</a></div>
                        </div>`
        if (!comicsBool.get(element.id)) {

          comicsBool.set(element.id, true);
          ComicsData.push(element);
        }

        localStorage.setItem('Comics', JSON.stringify(ComicsData));
      });
    }
    else {
      currData += `<h2>No Comics to show</h2>`;
    }
    currData += '</div>';
    document.getElementById('comics').innerHTML += currData;
  });



let EventsData = [];

fetch(EventUrl).then(function (response) {
  return response.json();
})
  .then(res => {
    let data = res.data.results;
    console.log(data);
    let currData = '<div id="event-div">';
    if (data.length != 0) {
      data.forEach(element => {
        currData += `<div class="event-card">
                              <h2>${element.title}</h2>
                              <img src="${element.thumbnail.path}.${element.thumbnail.extension}">
                          </div>`
      });
    }
    else {
      currData += `<h2>No Events to show</h2>`;
    }
    currData += '</div>';
    document.getElementById('events').innerHTML += currData;
  });