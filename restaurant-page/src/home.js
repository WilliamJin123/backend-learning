export default function loadHome() {
    const content = document.getElementById('content')
    const heading = document.createElement('h1')
    heading.textContent = 'Welcome to our Restaurant'
    const image = document.createElement('img');
    image.src = 'https://via.placeholder.com/400';
    image.alt = 'Delicious food';
    const paragraph = document.createElement('p');
    paragraph.textContent = 'At Our Restaurant, we pride ourselves on serving the finest dishes made with fresh, locally sourced ingredients. Whether you\'re here for a casual meal or a special occasion, our warm atmosphere and exceptional service will make your visit unforgettable. Come taste the difference!';
    content.appendChild(heading)
    content.appendChild(image);
    content.appendChild(paragraph);
}