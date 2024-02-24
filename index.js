
const Baseurl = `${baseCharactersUrl}characters?&ts=1&apikey=${publicKey}&hash=${hash}`;
let flag = true;
console.log(Baseurl);

//EventListener is added to invoke the function start() when DOMContent is loaded
document.addEventListener('DOMContentLoaded', function (e) {
  start();

  //EventListener on scroll function
  document.addEventListener('scroll', function (e) {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When the user is [modifier]px from the bottom, fire the event.
    let modifier = 1;
    if (currentScroll + modifier > documentHeight) {
      console.log('You are at the bottom! fetching Data')
      if (flag) {
        fetchAndLoadData();
      }
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
let characterData = [];
//characters map is used to filter the duplicate data when we use search
const characters = new Map();

//generateMarkup function is used to render data on homepage.
//This same function is used for search any character, load first time data on page.
function generateMarkup(data, currRows = '') {
  data.map(function (item) {
    //conditional loop added to filter/remove characters which dont have description
    if (item.description != '') {
      imgSrc = item.image || `${item.thumbnail.path}.${item.thumbnail.extension}`;
      currRows += `<table><tbody>
                <tr>
                  <td class='character'>
                    <img class="profile" href='./HTML/character.html?id=${item.id}' src="${imgSrc}"/>
                  </td>`;
      currRows += `
                  <td class='name-cell'>
                    <a href="./HTML/character.html?id=${item.id}" >
                      <div class='name-div'>${item.name}</div>
                    </a>
                    <button id="fav-Char-${item.id}" class='add-fav' onclick="toggleLike(${item.id})" style='color: ${item.liked ? "red" : "none"}' ">
                      <i class="fa-solid fa-star fa-beat"></i>
                    </button>
                  </td>
                </tr></tbody></table>`;
      //Conditional loop to avoid duplicate character rendering to the page
      if (!characters.get(item.id)) {
        characterData.push({ 'id': `${item.id}`, 'name': item.name, 'image': imgSrc, liked: item.liked || false });
        characters.set(item.id, true);
        //Adding data to local storage to save previous actions on the character
        localStorage.setItem('character', JSON.stringify(characterData));
      }
    }
  });

  return currRows;
}

//To fetch data after scrollEvent is triggered
function fetchAndLoadData() {
  const ComicsUrl = `${baseCharactersUrl}characters?limit=${limit}&offset=${offset}&ts=1&apikey=${publicKey}&hash=${hash}`;
  console.log(ComicsUrl);
  fetch(ComicsUrl).then(function (response) {
    return response.json();
  }).then(res => {
    // console.log(res);
    let data = res.data.results;
    // console.log(allCharacters);
    let currRows = generateMarkup(data);
    dataSoFar += currRows;
    document.getElementById('results-container').innerHTML = formatTable(dataSoFar);
    offset += limit;
  });
}


//start function to load initial characters on the home page
function start() {
  //getting previous data from localstorage to avoid missing of liked characters after re-rendering of page
  const prevData = JSON.parse(localStorage.getItem('character')) || [];
  //Conditional for checking whether localstorage have any characters saved.
  if (prevData.length > 0) {
    dataSoFar = generateMarkup(prevData);
    document.getElementById('results-container').innerHTML = formatTable(dataSoFar);
    offset += prevData.length;
    return;
  }
  //else characters are fetched from the API
  fetchAndLoadData();
}


function formatTable(dataString) {
  return `${dataString}`;
}


//function to fetch data for searched character.
function fetchData(url) {
  console.log(url);
  fetch(url).then(function (response) {
    return response.json();
  }).then(res => {
    let data = res.data.results;
    const currRows = generateMarkup(data);
    document.getElementById('results-container').innerHTML = formatTable(currRows);
    offset += limit;
  });

}

//getting the input value from the search box and fetching the data according to it
function updateValue() {
  let input = document.getElementById('mySearchInput');
  let filter = input.value;
  if (filter.length > 0) {

    flag = false;
    let container = document.getElementById('results-container');
    container.innerHTML = '';
    let searchUrl = `${baseCharactersUrl}characters?nameStartsWith=${filter}&ts=1&apikey=${publicKey}&hash=${hash}`;
    fetchData(searchUrl);

  }
  else {
    fetchData(Baseurl);
    flag = true;
  }
}
