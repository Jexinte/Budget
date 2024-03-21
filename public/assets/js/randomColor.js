const cardLink = document.querySelectorAll('.card')
const randomColor =  () =>  {
    cardLink.forEach((card) => {
        card.style.borderTopColor = Math.floor(Math.random()*16777215).toString(16)
    })
}
randomColor()
// // Appliquer des couleurs aléatoires aux éléments HTML avec la classe 'random-color'
// var elements = document.querySelectorAll('.random-color');
// elements.forEach(function(element) {
//     element.style.backgroundColor = randomColor();
// });