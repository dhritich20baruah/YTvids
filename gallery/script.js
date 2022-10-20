data = [
    {
        number: 1,
        title: "MAGNA FEUGIAT LOREM",
        image: "/assets/images/01.jpg" 
    },
    {
        number: 2,
        title: "NISL ADIPISCING",
        image: "/assets/images/02.jpg" 
    },
    {
        number: 3,
        title: "TEMPUS ALIQUAM VEROEROS",
        image: "/assets/images/03.jpg" 
    },
    {
        number: 4,
        title: "ALIQUAM IPSUM SED DOLORE",
        image: "/assets/images/04.jpg" 
    },
    {
        number: 5,
        title: "CURSIS ALIQUAM NISL",
        image: "/assets/images/05.jpg" 
    },
    {
        number: 6,
        title: "SED CONSEQUAT PHASELLUS",
        image: "/assets/images/06.jpg" 
    },
    {
        number: 7,
        title: "MAURIS ID TELLUS ARCU",
        image: "/assets/images/07.jpg" 
    },
    {
        number: 8,
        title: "NUNC VEHICULA ID NULLA",
        image: "/assets/images/08.jpg" 
    },
    {
        number: 9,
        title: "NEQUE ET FAUCIBUS VIVERRA",
        image: "/assets/images/09.jpg" 
    },
    {
        number: 10,
        title: "MATTIS ANTE FERMENTUM",
        image: "/assets/images/10.jpg" 
    },
    {
        number: 11,
        title: "SED AC ELEMENTUM ARCU",
        image: "/assets/images/11.jpg" 
    },
    {
        number: 12,
        title: "VEHICULA ID NULLA DIGNISSIM",
        image: "/assets/images/12.jpg" 
    },
]

const imageDiv = document.getElementById('imageDiv')
const imageTitle = document.getElementById('img-title')
const modal = document.getElementById('modalImg')
data.forEach(element => {
    imageDiv.innerHTML += `<img src=${element.image} alt="" onclick="openModal(); currentImg(${element.number})"/>`
    // imageTitle.innerHTML +=`<h3>hello</h3>`
});


function openModal(){
    document.getElementById("modal").style.display = "block"
}
function closeModal(){
    document.getElementById("modal").style.display = "none"
}
function currentImg(n){
    console.log(n)
    document.getElementById(`img${n}`).style.display = "block"
}
function closeImg(n){
    document.getElementById(`img${n}`).style.display = "none"
}