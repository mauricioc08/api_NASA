const titulo = document.querySelector('.titulo');
const paragrafo2 = document.querySelector('.paragrafo2');
const img = document.querySelector('img');
const btn = document.querySelector('.btn');
const autorImg = document.querySelector('.autorImg');
const data = document.querySelector('.data');
const loader = document.querySelector('#loading');
const video = document.querySelector('iframe');

function init(){
  btn.addEventListener('click',nasaFetchBtn);
  nasaFetchBtn();  
}

function nasaFetchBtn(){
  let dataAleatoria = getRandomDate();
  let dataFixa = "2022-12-04";
  buscaConteudo(dataAleatoria);
}

function buscaConteudo(date){
    showLoading();
    fetchNasa(date).then(api => {
      hideLoading();
      exibeInfo(api);
      exibeConteudo(api.media_type, api.url)
  })
}

function fetchNasa(date){
  return fetch(`https://api.nasa.gov/planetary/apod?api_key=d9uGpPTLUvVRTjG3Zlike9qKbAOaL3bkTIeDX11q&date=${date}`)
  .then(resolve => resolve.json())
  .catch(erro => {
    alert("Não foi possivel buscar api")
    console.log(erro);
  })
}

function getRandomDate(){
  let ramdonMonth = Math.round(Math.random()*11);
  let randomDay = Math.round(Math.random()*31);
  let randonDate = new Date(2022,ramdonMonth,randomDay);
  return randonDate.toISOString().substring(0,10)
}

function showLoading(){
  loader.style.display = "block"
  img.style.display = "none"
  video.style.display = "none"
}

function hideLoading(){
  loader.style.display = "none"
}

function exibeInfo(api){
  titulo.innerText = api.title;
  paragrafo2.innerText = api.explanation;
  data.innerText = api.date;
  autorImg.innerText = api.copyright? api.copyright: ""; 
}

function exibeConteudo(media_type, url){
  switch (media_type) {
    case "video": 
      img.style.display = "none"
      video.style.display = "block"
      video.src = url;
      break;
    case "image":
      img.style.display = "block"
      video.style.display = "none"
      img.src = url;
      break;

    default: console.log(media_type);
      break;
  }
}


