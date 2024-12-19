import home from "./home"
import about from "./about"
import menu from "./menu"
function clearContent() {
    const content = document.getElementById('content')
    content.innerHTML = ''
}

home()

document.getElementById('home').addEventListener('click', () => {
    clearContent()
    home()
})


document.getElementById('menu').addEventListener('click', () => {
    clearContent()
    menu()
})


document.getElementById('about').addEventListener('click', () => {
    clearContent()
    about()
})