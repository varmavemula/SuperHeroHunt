const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

let dataLoad='';
const url = `${baseCharactersUrl}characters/${id}?&ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  console.log(url);
    fetch(url).then(function(response) {
            return response.json();
      })
        .then(res => {
                console.log(res);
                let data = res.data.results;

        dataLoad += ` <div class="char-cover">
                        <img class="char-cover-pic" src="${data[0].thumbnail.path}.${data[0].thumbnail.extension}"/>`;
        dataLoad += `   <div class="char-content">
                            <h1>${data[0].name}</h1>
                            <p>${data[0].description}</p>
                        </div>
                      </div>
                      <button>like</button>`;

        document.getElementById('char-details').innerHTML+=dataLoad;

    });


