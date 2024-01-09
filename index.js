
const Baseurl = `${baseCharactersUrl}characters?&ts=1&apikey=${publicKey}&hash=${hash}`;
let flag = true;
console.log(Baseurl);

//EventListener is added to invoke the function start() when DOMContent is loaded
document.addEventListener('DOMContentLoaded', function(e) {
  start();

  //EventListener on scroll function
  document.addEventListener('scroll', function(e) {
      let documentHeight = document.body.scrollHeight;
      let currentScroll = window.scrollY + window.innerHeight;
      // When the user is [modifier]px from the bottom, fire the event.
      let modifier = 1; 
      if(currentScroll + modifier > documentHeight) {
          console.log('You are at the bottom! fetching Data')
          if(flag){
          start();}
      }
  })
})

//limit is no.of characters loaded for every time when scroll reach its bottom
const limit = 20;
//offset is increased for everytime by limit value to get new characters
let offset = 0;
//datasofar used to create html data after getting the response data
let dataSoFar = '';
//characters data is stored in an array for further use
let allCharacters = [];
let characterData =[];
//characters map is used to filter the duplicate data when we use search
const characters = new Map();


  

//start function to load initial characters on the home page
function start(){
  const CharUrl = `${baseCharactersUrl}characters?limit=${limit}&offset=${offset}&ts=1&apikey=${publicKey}&hash=${hash}`;
  console.log(CharUrl);
  fetch(url).then(function(response){
            return response.json();
  }).then(res => {
      console.log(res);
      let data = res.data.results;
      console.log(allCharacters);
      let currRows = '';
      data.map(function(item)
      {
        // console.log(typeof(item.thumbnail.extension));

          if(item.description!='')
          {
              currRows += `<table><tbody>
                <tr>
                  <td class='character'>
                    <img class="profile" href='./HTML/character.html?id=${item.id}' src="${item.thumbnail.path}.${item.thumbnail.extension}"/>
                  </td>`;
              currRows +=`
                  <td class='name-cell'>
                    <a href="./HTML/character.html?id=${item.id}" target="_blank">
                      <div class='name-div'>${item.name}</div>
                    </a>
                    <button class='add-fav' onclick="toggleLike(${item.id})">
                      <i class="fa-solid fa-star fa-beat"></i>
                    </button>
                  </td>
                </tr></tbody></table>`;
              if(!characters.get(item.id))
              {
                  characterData.push({'id': `${item.id}`, 'title':`${item.name}`, 'image':`${item.thumbnail.path}.${item.thumbnail.extension}`, liked:false});
                  allCharacters.push(item);
                  characters.set(item.id,true);
                  localStorage.setItem('character', JSON.stringify(characterData));
              }
          } 
      });         
      dataSoFar += currRows;
      document.getElementById('results-container').innerHTML = formatTable(dataSoFar);
      offset+=limit;
      });

      const ComicsUrl = `${baseCharactersUrl}characters?limit=${limit}&offset=${offset}&ts=1&apikey=${publicKey}&hash=${hash}`;
  console.log(ComicsUrl);
  fetch(ComicsUrl).then(function(response){
            return response.json();
  }).then(res => {
      console.log(res);
      let data = res.data.results;
      console.log(allCharacters);
      let currRows = '';
      data.map(function(item)
      {
        // console.log(typeof(item.thumbnail.extension));

          if(item.description!='')
          {
              currRows += `<table><tbody>
                <tr>
                  <td class='character'>
                    <img class="profile" href='./HTML/character.html?id=${item.id}' src="${item.thumbnail.path}.${item.thumbnail.extension}"/>
                  </td>`;
              currRows +=`
                  <td class='name-cell'>
                    <a href="./HTML/character.html?id=${item.id}" target="_blank">
                      <div class='name-div'>${item.name}</div>
                    </a>
                    <button class='add-fav' onclick="toggleLike(${item.id})">
                      <i class="fa-solid fa-star fa-beat"></i>
                    </button>
                  </td>
                </tr></tbody></table>`;
              if(!characters.get(item.id))
              {
                  characterData.push({'id': `${item.id}`, 'title':`${item.name}`, 'image':`${item.thumbnail.path}.${item.thumbnail.extension}`, liked:false});
                  allCharacters.push(item);
                  characters.set(item.id,true);
                  localStorage.setItem('character', JSON.stringify(characterData));
              }
          } 
      });         
      dataSoFar += currRows;
      document.getElementById('results-container').innerHTML = formatTable(dataSoFar);
      offset+=limit;
      });

}

function formatTable(dataString) {
  return  `${dataString}`;
}


function fetchData(url) 
{
    console.log(url);
    fetch(url).then(function(response) {
            return response.json();
      }).then(res => {
            console.log(res);
            let data = res.data.results;
            console.log(allCharacters);
            let currRows = '';
            data.map(function(item)
            {
                  currRows += `<table><tbody><tr >
                      <td class='character'>
                        <img class="profile" href='./HTML/character.html?id=${item.id}'  src="${item.thumbnail.path}.${item.thumbnail.extension}"/>
                      </td>`;
                  currRows +=`
                      <td class='name-cell'>
                        <a href="./HTML/character.html?id=${item.id}" onclick="loadData(${item})">
                          <div class='name-div'>${item.name}</div>
                        </a>
                        <button id="fav-Char-${item.id}" onclick="toggleLike(${item.id})" class='add-fav'>
                          <i class="fa-solid fa-star fa-beat"></i>
                        </button>
                      </td></tr></tbody></table>`;
                  if(!characters.get(item.id))
                  {
                    characterData.push({id: `${item.id}`, title:`${item.name}`, image:`${item.thumbnail.path}.${item.thumbnail.extension}`, liked:false});
                    allCharacters.push(item);
                    characters.set(item.id,true);
                    localStorage.setItem('character', JSON.stringify(characterData));
                  }
            });
              document.getElementById('results-container').innerHTML = formatTable(currRows);
              offset+=limit;
        });
}






//getting the input value from the search box and fetching the data according to it
function updateValue()
{
    let input = document.getElementById('mySearchInput');
    let filter = input.value;
    if(filter.length >0)
    { 
      flag=false;
      let container = document.getElementById('results-container');
      container.innerHTML = '';
      let searchUrl = `${baseCharactersUrl}characters?nameStartsWith=${filter}&ts=1&apikey=${publicKey}&hash=${hash}`;
      fetchData(searchUrl);
      
    }
    else
    {
      fetchData(Baseurl);
      flag=true;
    }
}





