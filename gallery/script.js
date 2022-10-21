// The above array contains the names and locations of the image files
data = [
    {
        name: "1",
        image: "/images/1.jpg" 
    },
    {
        name: "2",
        image: "/images/2.jpg" 
    },
    {
        name: "3",
        image: "/images/3.jpg" 
    },
    {
        name: "4",
        image: "/images/4.jpg" 
    },
    {
        name: "5",
        image: "/images/5.jpg" 
    },
    {
        name: "6",
        image: "/images/6.jpg" 
    },
    {
        name: "7",
        image: "/images/7.jpg" 
    },
    {
        name: "8",
        image: "/images/8.jpg" 
    },
    {
        name: "9",
        image: "/images/9.jpg" 
    },
    {
        name: "10",
        image: "/images/10.jpg" 
    },
    {
        name: "11",
        image: "/images/11.jpg" 
    },
    {
        name: "12",
        image: "/images/12.jpg" 
    },
]

const imageDiv = document.getElementById('imageDiv')
const imageTitle = document.getElementById('img-title')
const modal = document.getElementById('modal')
const image = document.getElementById('image')
let index

data.forEach(element => {
    imageDiv.innerHTML += `<img src=${element.image} alt="" onclick="openModal(); showImg(${element.name})"/>`
});


function openModal(){
    modal.classList.remove('hide')
}
function closeModal(){
    modal.classList.add('hide')
}
function showImg(n){
    index = n
    image.innerHTML = `<img src="/images/${n}.jpg" alt="">`;
}

function nextImage(){
    if(index < data.length){
        showImg(index+1)
    }
}

function prevImage(){
    if(index >1){
        showImg(index-1)
    }
}