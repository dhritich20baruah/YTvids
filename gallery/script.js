data = [
    {
        number: "1",
        image: "/images/1.jpg" 
    },
    {
        number: "2",
        image: "/images/2.jpg" 
    },
    {
        number: "3",
        image: "/images/3.jpg" 
    },
    {
        number: "4",
        image: "/images/4.jpg" 
    },
    {
        number: "5",
        image: "/images/5.jpg" 
    },
    {
        number: "6",
        image: "/images/6.jpg" 
    },
    {
        number: "7",
        image: "/images/7.jpg" 
    },
    {
        number: "8",
        image: "/images/8.jpg" 
    },
    {
        number: "9",
        image: "/images/9.jpg" 
    },
    {
        number: "10",
        image: "/images/10.jpg" 
    },
    {
        number: "11",
        image: "/images/11.jpg" 
    },
    {
        number: "12",
        image: "/images/12.jpg" 
    },
]

const imageDiv = document.getElementById('imageDiv')
const imageTitle = document.getElementById('img-title')
const modal = document.getElementById('modal')
const image = document.getElementById('image')
let index

data.forEach(element => {
    imageDiv.innerHTML += `<img src=${element.image} alt="" onclick="openModal(); showImg(${element.number})"/>`
});


function openModal(){
    modal.classList.toggle('hide')
}
function closeModal(){
    modal.classList.toggle('hide')
}
function showImg(n){
    index = n
    image.innerHTML = `<img src="/images/${n}.jpg" alt="">`;
    return index
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