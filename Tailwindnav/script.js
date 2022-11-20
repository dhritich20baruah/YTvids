const imageArr = [
    {
        number: 1,
        title: '"Iron Man" Extended Cut',
        imageLandscape: "/images/ironman1l.jpeg",
        imagePoster: "/images/ironman2.jpg",
        duration: "2:01"

    },
    {
        number: 2,
        title: '"Rocket Boys" Season 1',
        imageLandscape: "/images/rocketboys1.jpg",
        imagePoster: "/images/rocketboys2.jpg",
        duration: "1:50"

    },
    {
        number: 3,
        title: 'Ford vs Ferrari',
        imageLandscape: "/images/fordvsferrari1.jpg",
        imagePoster: "/images/fordvsferrari2.png",
        duration: "2:45"

    },
    {
        number: 4,
        title: '"Mr. Robot" Final Season',
        imageLandscape: "/images/mrrobot1.jpg",
        imagePoster: "/images/mrrobot2.jpg",
        duration: "2:01"

    },
    {
        number: 5,
        title: 'The Imitation Game',
        imageLandscape: "/images/imitationgame1.jpg",
        imagePoster: "/images/imitationgame2.jpg",
        duration: "2:11"

    },
]

const dropDownMain = document.getElementById('dropDown-main')
const sideMenu = document.getElementById('sideMenu')
const language = document.getElementById('language')
const search = document.getElementById('search')
const dropArrow = document.getElementsByClassName('dropArrow')
const searchClass = document.querySelectorAll('searchClass')
const mainThumb = document.getElementById('main-thumbnail')
const cards = document.getElementById('cards')
const smSearch = document.getElementById('smSearch')

const sideHead = document.getElementsByClassName('sideHead');
const sideList = document.getElementsByClassName('sideList');
const sideHeadLen = sideHead.length;
const sideListLen = sideList.length;

let index = 0
let index2 = 1

display(index)

function display(index){
    mainThumb.innerHTML = 
    `<div id="primaryImage" class="primeImage">
        <img src=${imageArr[index].imageLandscape} alt="">
        <div id="secondary-image" class="">
            <img src=${imageArr[index].imagePoster}  alt="" class="md:w-48 h-auto absolute bottom-0 left-10 max-w-[26%]">
            <i class="material-icons absolute left-8 bottom-[42%] text-black" style="font-size: 3em; opacity: 0.7;">bookmark</i>
            <span class="absolute left-11 bottom-[44%] text-white text-3xl ">+</span>
        </div> 
        <i class="material-icons absolute bottom-16 md:left-60 right-40 text-white hover:text-yellow-400 hover:cursor-pointer" style="font-size: 5em">play_circle_outline</i>        
        <span class="text-gray-400 text-xl ml-5 md:hidden block absolute bottom-16 right-24">${imageArr[index].duration}</span>
        <div class="absolute md:bottom-16 md:left-80 left-40 bottom-0">
            <h2 id="title" class=" text-white text-xl md:text-4xl">${imageArr[index].title} <span class="text-gray-400 text-xl ml-5 md:inline-block hidden">${imageArr[index].duration}</span></h2>
            <p class="text-white md:text-2xl">Watch the Trailer</p>
        </div>
    </div>`
}

function nextSlide(){
//    mainThumb.classList.add('slideLeft')
    index = index + 1
    if(index> imageArr.length - 1){
        index = 0
    }
    display(index) 
}


function prevSlide(){
    index = index - 1
    if(index < 0){
        index = imageArr.length - 1
    }
  display(index)
}

//Thumbnails display
displayCard(index2)

function displayCard(index2){
    cards.innerHTML = ""
    for (var j = 0; j < 3; j++) {
      // console.log(imageArr[(i + j) % imageArr.length])
    //   console.log((index2 + j) % imageArr.length)
      cards.innerHTML += `
      <div class="card flex flex-row">
      <img src=${imageArr[(index2 + j) % imageArr.length].imagePoster} alt="" class="w-28">
      <div class="m-2 text-white">
          <p>
              <i class="material-icons">play_circle_outline</i> ${imageArr[(index2 + j) % imageArr.length].duration}
          </p>
          <h3 class="text-2xl">${imageArr[(index2 + j) % imageArr.length].title}</h3>
          <p>Watch the Trailer</p>
      </div>
      </div>`
  }
  }
 
  function nextThumbs(){
    index2 = index2 +1
    displayCard(index2)
  }

    function prevThumbs(){
        index2 = index2 - 1
        if(index2 == 0){
            index2 = imageArr.length 
        }
        console.log(index2)
        displayCard(index2)
    }
// Main menu
function slide() {
    dropDownMain.classList.toggle('slideDown')
}

function slideUp() {
    dropDownMain.classList.toggle('slideDown')
    dropDownMain.classList.add('slideUp')
    dropDownMain.classList.remove('translate-y-[-100%]')
}

function showSearch() {
    search.classList.add('showSearch')
    search.classList.remove('hidden')
    search.classList.remove('hideSearch')
    dropArrow[1].classList.remove('hidden')
    dropArrow[0].classList.add('hidden')
}

function hideSearch() {
    search.classList.remove('showSearch')
    search.classList.add('hideSearch')
    dropArrow[0].classList.remove('hidden')
    dropArrow[1].classList.add('hidden')
}

// Language functions
function showLang() {
    language.classList.add('showLang')
    language.classList.remove('hidden')
    language.classList.remove('hideLang')
    dropArrow[3].classList.remove('hidden')
    dropArrow[2].classList.add('hidden')
}

function hideLang() {
    language.classList.remove('showLang')
    language.classList.add('hideLang')
    dropArrow[2].classList.remove('hidden')
    dropArrow[3].classList.add('hidden')
}

function toggleDisplay(){
    smSearch.classList.toggle('hidden')
}

function displayList(i){
    sideList[i].classList.toggle('hidden');

    for(var j = 0; j < sideListLen; j++){
        if(j == i){
            continue;
        }
        if(!sideList[j].classList.contains('hidden')){
            sideList[j].classList.add('hidden')
        }
    }
}

function slideIn() {
    sideMenu.classList.toggle('slideIn')
    sideMenu.classList.remove('slideOut')
}

function slideOut() {
    sideMenu.classList.toggle('slideIn')
    sideMenu.classList.add('slideOut')
    sideMenu.classList.remove('translate-x-[-100%]')
}

setInterval(() => {
    nextSlide()
    nextThumbs()
}, 5000);