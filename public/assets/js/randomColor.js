const cardLink = document.querySelectorAll('.card')
const randomColor =  () =>  {
    cardLink.forEach((card) => {
        card.style.borderTopColor = Math.floor(Math.random()*16777215).toString(16)
    })
}
randomColor()
