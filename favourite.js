// Function to load characters from local storage
let savedCharacters=[];
let likedCharacters=[]

function loadFromLocalStorage(){
    savedCharacters=JSON.parse(localStorage.getItem('character'));
    savedCharacters.forEach(character=>{
        if(character.liked){
            likedCharacters.push(character);
        }
    })
    renderFavoritesPage();
}
// function loadFromLocalStorage() {
//     savedCharacters = JSON.parse(localStorage.getItem('character'));
// //     console.log(savedCharacters[0]);
// //   if (savedCharacters) {
// //     characterData.forEach(character => {
// //       const savedCharacter = savedCharacters.find(c => c.id === character.id);
// //       if (savedCharacter) {
// //         character.liked = savedCharacter.liked;
// //       }
// //     });
// //   }
//   renderFavoritesPage();
// }
document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

// Function to render liked characters on the favorites page
function renderFavoritesPage() {
    const favoritespage = document.getElementById('fav-container');
    favoritespage.innerHTML = '';
  
    //const likedCharacters = savedCharacters.filter(character => character.liked);
    if(likedCharacters.length!=0){
        
        let Rows='';
    likedCharacters.forEach(character => {
       
        Rows+=  `
                    <div id="card" class="card">
                        <img  src="${character.image}"/>
                        <a id="fav-card-a" href="./character.html?id=${character.id}" target="_blank">
                            <div>${character.title}</div>
                        </a>
                    </div>
                `;
      
      document.getElementById('fav-container').innerHTML=Rows;
    });
}
  }
  

