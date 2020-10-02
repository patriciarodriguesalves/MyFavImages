//Ao inserir um array vazio após o OU, não dá problema na primeira vez que não tiver nada para resgatar
//do localStorage

//Variables

//O JSON Parse irá converter a string para um array
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image');
const button = document.querySelector('button');

//Events

//Ao clicar no botão pegar imagem externa --será uma funcionalidade por que irá se repetir
button.onclick = () => updateImage();
//clicar no container da imagem
imageContainer.onclick = () => updateAll();

//Methods
function getState(){
    const imageSource = document.querySelector('.image img').src;

    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;

    return{imageSource, index, existsInLocalStorage}
}

function updateAll(){
    updateFavorites();
    updateClasses();
}

function updateFavorites(){
     
    const {existsInLocalStorage, index, imageSource } = getState();

    //Salve to LocalStorage
    //Push insere algo dentro, nesse caso insere a imageSource dentro do array 
    //É o próprio if /else
    existsInLocalStorage ? favorites.splice(index, 1) : favorites.push(imageSource)

    //O Stringify do JSON, vai criar uma estrutura tipo array
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateClasses(){ 

    const {existsInLocalStorage } = getState();

    imageContainer.classList.remove('fav');

    if(existsInLocalStorage){
        imageContainer.classList.add('fav');
    }
}

async function updateImage(){
    await getExternalImage();
    updateClasses();
}

//Pegar imagem externa
async function getExternalImage(){
    const response = await fetch('https://source.unsplash.com/random');

    imageContainer.innerHTML = `<img src="${response.url}">`;

}

getExternalImage();





