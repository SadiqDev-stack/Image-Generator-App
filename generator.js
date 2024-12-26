
let sources = []

const $ = ele => ele.includes('*') ?
  document.querySelectorAll(ele.replace('*', '')) :
  document.querySelector(ele);

const IMAGES = $('.images');
const GENERATE = $('.generate');
const reloadInterval = 1;
const maxTries = 20;

let viewImage;
const viewer = $('.viewer');
const closeBtn = $('.close');
const generatedImages = [];
const generationPerClick = 5;
const endpoints = "https://picsum.photos/200/300";
const LOADER = `
<div>
 <div class="loader"></div>
</div>
`

const view = src => {
  viewer.querySelector('img').src = src;
  viewer.style.display = 'flex'
}

closeBtn.onclick = e => viewer.style.display = 'none'

const addImage = (src,card) => {
  const opener = document.createElement('button');
  opener.className = 'opener';
  opener.textContent = 'Open Image'
  opener.onclick = e => { 
    view(src)
  }
  
  const add = e => {
   const image = new Image();
   image.src = src;
   image.onerror = e => setTimeout(add,reloadInterval * 1000)
   image.onload = e => {
     card.innerHTML = '';
     card.appendChild(image);
     card.appendChild(opener)
   }
  }
  
  add()
}


const fetchImage = e => {
  return fetch(endpoints)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.url
  })
}

const generateImages = (gpc = 5) => {
  let i = 0;
  while(i < gpc){
  const IMG = document.createElement('div');
  IMG.innerHTML = LOADER;
  IMG.className = 'image'
  IMAGES.append(IMG)
  i++
  let tries = 0;
  const loadImage = async e => {
  try{
    const src = await fetchImage();
    if(!sources.includes(src)){
      addImage(src,IMG);
      sources.push(src)
    }else{
      loadImage()
      tries++
    }
    if(tries > maxTries){
      IMAGES.removeChild(IMG);
      alert('Fail To Load, Retry...')
    }
  }catch{
    setTimeout(loadImage,reloadInterval * 1000)
  }
  }
  
  loadImage()
  }
}

GENERATE.onclick = e => generateImages()