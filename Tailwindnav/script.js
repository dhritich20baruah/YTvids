const imageArr = [
    {
        number: 1,
        title: '"Iron Man" Extended Cut',
        imageLandscape: "/images/ironman1l.jpeg",
        imagePoster: "/images/iron man1.jpg",
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
        imagePoster: "/images/fordvsferrari2.jpg",
        duration: "2:45"

    },
    {
        number: 4,
        title: '"Mr. Robot" Final Season',
        imageLandscape: "/images/mrrobot1.jpg",
        imagePoster: "/images/mrrobot2.jpg",
        duration: "2:01"

    },
]

const dropDownMain = document.getElementById('dropDown-main')
const language = document.getElementById('language')
const search = document.getElementById('search')
const dropArrow = document.getElementsByClassName('dropArrow')
const searchClass = document.querySelectorAll('searchClass')
const mainThumb = document.getElementById('main-thumbnail')

mainThumb.innerHTML = 
        `<div id="primary-image" class="">
            <img src="/images/ironman1l.jpeg" alt="">
        </div>
        <div id="secondary-image" class="">
            <img src="/images/iron man1.jpg" alt="" class="w-48 h-auto absolute bottom-6 left-10 drop-shadow-xl">
            <i class="material-icons absolute left-8 bottom-[43.5%] text-black" style="font-size: 3em; opacity: 0.7;">bookmark</i>
            <span class="absolute left-11 bottom-[45.5%] text-white text-3xl ">+</span>
        </div> 
        <i class="material-icons absolute bottom-16 left-60 text-white hover:text-yellow-400 hover:cursor-pointer" style="font-size: 5em;">play_circle_outline</i>
        <div class="absolute bottom-16 left-80">
            <h2 id="title" class=" text-white text-4xl">"Iron Man" Extended cut <span class="text-gray-400 text-xl ml-5">2:01</span></h2>
            <p class="text-white text-2xl">Watch the Trailer</p>
        </div>`

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
