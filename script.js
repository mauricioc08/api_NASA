const titulo = document.querySelector('.titulo');
const paragrafo2 = document.querySelector('.paragrafo2');
const img = document.querySelector('img');
const btn = document.querySelector('.btn');
const autorImg = document.querySelector('.autorImg');
const data = document.querySelector('.data');

function getRandomDate(){
  var ramdonMonth = Math.round(Math.random()*11);
  var randomDay = Math.round(Math.random()*31);
  var randonDate = new Date(2022,ramdonMonth,randomDay);
  return randonDate.toISOString().substring(0,10)
}


function nasaFetch(){
  fetch(`https://api.nasa.gov/planetary/apod?api_key=d9uGpPTLUvVRTjG3Zlike9qKbAOaL3bkTIeDX11q&date=${getRandomDate()}`)
  .then(resolve => resolve.json())
  .then(api => {
    titulo.innerText = api.title;
    paragrafo2.innerText = api.explanation;
    img.src = api.url;
    data.innerText = api.date;
    autorImg.innerText = api.copyright;
    if(api.copyright === undefined){
      autorImg.innerText = " ";
    }
  })
}
nasaFetch();
btn.addEventListener('click', nasaFetch);
