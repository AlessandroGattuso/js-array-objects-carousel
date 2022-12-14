//Creo array immagini
const imagesArray = [
    {
        titolo: "Marvel's Spider-Man: Miles Morales",
        descrizione: "The latest adventure in the Spider-Man universe will build on and expand ‘Marvel’s Spider-Man’ through an all-new story. Players will experience the rise of Miles Morales as he masters new powers to become his own Spider-Man"
    },
    {
        titolo: "Ratchet & Clank: Rift Apart",
        descrizione: "Ratchet and Clank have been doing the whole “saving the universe” thing for quite some time, and their latest adventure, Rift Apart, amusingly acknowledges that right from the start"
    },
    {
        titolo: "Fortnite",
        descrizione: "Why you should play warzone 2 instead of Fortnite. Warzone is a grittier take on the Battle Royale, featuring Call of Duty's tight gunplay, and the interesting Gulag System.  Warzone is there for the hardcore gamers. It requires a lot more shooting skill, and in a lot of ways, more tactical skill"
    },
    {
        titolo: "Stray",
        descrizione: "Stray is a third-person cat adventure game set amidst the detailed, neon-lit alleys of a decaying cybercity and the murky environments of its seedy underbelly"
    },
    {
        titolo: "Marvel's Avengers",
        descrizione: "Marvel's Avengers combines an original story with single-player and co-operative gameplay in the definitive Avengers gaming experience. Assemble into teams of up to four players online, master extraordinary abilities, customize a growing roster of Heroes, and defend the Earth from escalating threats"
    }
]

//Metto ad ogni oggetto dell'array l'url della sua relativa immagine
imagesArray.forEach((element, index) => {
    element.url = `./img/0${index+1}.webp`;
});

//Creiamo dinamicamente i div con le immagini del carosello
let itemsContentSlider = '';
let itemsContentPreview = '';

imagesArray.forEach((el) => {
    
    itemsContentSlider += `<div class="item">
                                <img src="${el.url}">
                                <div class="image-text">
                                  <h2>${el.titolo}</h2>
                                  <p>${el.descrizione}</p>
                                </div>
                          </div>`;

    itemsContentPreview += `<div class="item">
                                <img src="${el.url}">
                            </div>`;   
});

//inseriamo le immagini nel div che le deve contenere
const itemsSlider = document.querySelector('.item-slider');
itemsSlider.innerHTML += itemsContentSlider;

const itemsPreview = document.querySelector('.preview');
itemsPreview.innerHTML +=itemsContentPreview;


//const items = document.querySelector('.item'); //ALTERNATIVA
const items = document.querySelectorAll('.slider .item');
const previewItems = document.querySelectorAll('.preview .item');

let itemActive = 0;

items[itemActive].classList.add('active');
previewItems[itemActive].classList.add('active');

const circles = document.querySelector('.circles-container');

//creo dinamicamente i cerchi
for(let i = 0; i < imagesArray.length; i++){
    let circle = document.createElement("div");
    circle.classList.add("circle");
    circle.addEventListener('click', function(){
        removeActive();

        //vado a mettere il mio indice in base a quale cerchio l'utente ha cliccato
        itemActive = i;

    
        addActive();
    });
    circles.appendChild(circle);
}

//metto il primo cerchio attivo
document.getElementsByClassName("circle")[itemActive].classList.add('active');

const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

//aggiunscroll degli EventListener ad ogni cerchio di navigazione e se premuto va a quella immagine

//
previewItems.forEach((item,i) => {
    item.addEventListener('click', () => {
        removeActive();

        //vado a mettere il mio indice in base a quale cerchio l'utente ha cliccato
        itemActive = i;

    
        addActive();
    });
})

next.addEventListener('click', scroll_Left_Up);

prev.addEventListener('click', scroll_Right_Down);

//Aggiunscroll gli eventi alla freccia a destra e sotto(puoi scorrere premendo la freccia a destra e sotto)
document.addEventListener('keydown', (event) => {
    
    if(event.key == "ArrowRight" || event.key == "ArrowDown"){
       scroll_Right_Down();
    }

}, false);

//Aggiunscroll gli eventi alla freccia a sinistra e sopra(puoi scorrere premendo la freccia a sinistra e sopra)
document.addEventListener('keydown', (event) => {

    if(event.key == "ArrowLeft" || event.key == "ArrowUp"){
        scroll_Left_Up();
    }

}, false);

//Auto play sezione
let interval;
const autoplayContainer =  document.getElementById('autoplay-container');
const autoplay = document.getElementById('autoplay-btn');
const scrollRight = document.getElementById('scroll-right');
const scrollLeft = document.getElementById('scroll-left');

autoplay.addEventListener("click", function(){

    if(this.innerHTML == `<i class="fa-solid fa-play"></i>`){
        //se clicca il bottone ed è in pause scorri il carosello(5s)
        this.innerHTML = `<i class="fa-solid fa-pause"></i>`;

        if(scrollLeft.classList.contains('active'))
            interval = setInterval(scroll_Left_Up, 3000);
        if(scrollRight.classList.contains('active'))
            interval = setInterval(scroll_Right_Down, 3000);
        
        this.classList.add('active');
        
    }
    //se clicca il bottone ed è in play blocca lo scorrimento
    else{
        this.innerHTML = `<i class="fa-solid fa-play"></i>`;
        clearInterval(interval);
        this.classList.remove('active');
    }

});

// se clicca la freccia a destra dell'autoplay, scorre verso destra
scrollRight.addEventListener("click", function(){
    clearInterval(interval);
    //se la freccia a destra è 'attiva', rimuovi la classe active 
    if(scrollLeft.classList.contains('active'))
            scrollLeft.classList.remove('active');
    
    this.classList.add('active');
    interval = setInterval(scroll_Right_Down, 3000);
}) 

// se clicca la freccia a sinistra dell'autoplay, scorre verso sinistra
scrollLeft.addEventListener("click", function(){
    clearInterval(interval);
    //se la freccia a sinistra è 'attiva', rimuovi la classe active 
    if(scrollRight.classList.contains('active'))
        scrollRight.classList.remove('active');
    
    this.classList.add('active');
    interval = setInterval(scroll_Left_Up, 3000);
});

let opacityInterval;

//Se il mouse non è sopra il container della sezione autoplay, questo scompare
autoplayContainer.addEventListener('mouseleave', function(){
    clearInterval(opacityInterval);
    opacityInterval = setTimeout(()=>this.style.opacity = '0', 3000);
});

//Se il mouse invece entra nella sezione questo appare
autoplayContainer.addEventListener('mouseenter', function(){
    this.style.opacity = '1';    
});


function scroll_Right_Down(){

    removeActive();

    //verifico che non siamo fuori dall'array
    (itemActive < imagesArray.length - 1) ? itemActive++ : itemActive = 0;


    addActive();

}

function scroll_Left_Up(){

    removeActive();

    //verifico che non siamo fuori dall'array
    (itemActive > 0) ? itemActive-- : itemActive = imagesArray.length - 1;

    addActive();

}

//vado a rimuovere la classe active da quello attuale
function removeActive(){
    items[itemActive].classList.remove('active');
    circles.childNodes[itemActive+1].classList.remove('active');
    previewItems[itemActive].classList.remove('active');
}

//aggiungere la class active all'elemento precedente dell'Array items e cicle
function addActive(){
    console.log()
    items[itemActive].classList.add('active');
    circles.childNodes[itemActive+1].classList.add('active');
    previewItems[itemActive].classList.add('active');
}