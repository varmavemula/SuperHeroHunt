const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let dataLoad = '';
const Charurl = `${baseCharactersUrl}characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const ComicUrl = `${baseCharactersUrl}characters/${id}/comics?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
const EventUrl = `${baseCharactersUrl}characters/${id}/events?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
console.log(EventUrl);

//console.log(Charurl);
fetch(Charurl).then(function (response) {
  return response.json();
})
  .then(res => {
    //console.log(res);
    let data = res.data.results;
    console.log(data);
    dataLoad += ` <div class="char-cover">
                        <img class="char-cover-pic" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}"/>`;
    dataLoad += `   <div class="char-content">
                            <h1 style="color:red">${data[0].name}</h1>
                            <p >${data[0].description}</p>
                            <button id="fav-button">Favorite</button>
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
    //console.log(res);
    let data = res.data.results;
    let currData = '<div id="com-div">';
    if(data.length>0){
    data.forEach(element => {
      currData += `<div class="com-card">
                            <img src="${element.images[0].path}.${element.images[0].extension}">
                           <div class="com-title"><a href="./comic.html?id=${element.id}">${element.title}</a></div>
                        </div>`
      if(!comicsBool.get(element.id)){
        //console.log(element.id);
        comicsBool.set(element.id, true);
        ComicsData.push(element);
      }
      
      localStorage.setItem('Comics', JSON.stringify(ComicsData));
      //console.log(element.title);
    });}
    else{
      currData+=`<h2>No Comics to show</h2>`;
    }
    currData += '</div>';
    console.log(currData);
    document.getElementById('comics').innerHTML += currData;
  });



  let EventsData = [];
 
  fetch(EventUrl).then(function (response) {
    return response.json();
  })
    .then(res => {
      //console.log(res);
      let data = res.data.results;
      let currData = '<div id="event-div">';
  
      data.forEach(element => {
        currData += `<div class="event-card">
                              <img src="${element.images[0].path}.${element.images[0].extension}">
                             <div class="com-title"><a href="./comic.html?id=${element.id}">${element.title}</a></div>
                          </div>`
        if(!comicsBool.get(element.id)){
          //console.log(element.id);
          comicsBool.set(element.id, true);
          ComicsData.push(element);
        }
        
        localStorage.setItem('Comics', JSON.stringify(ComicsData));
        //console.log(element.title);
      });
      currData += '</div>';
      document.getElementById('comics').innerHTML += currData;
    });