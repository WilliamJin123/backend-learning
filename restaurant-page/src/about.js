export default function loadAbout() {
    const content = document.getElementById('content');

    const heading = document.createElement('h1');
    heading.textContent = 'About Us';
    heading.id = 'about-heading';
    heading.classList.add('heading');

    const paragraph = document.createElement('p');
    paragraph.textContent = 'Our restaurant was founded on a love for exceptional cuisine and heartfelt hospitality. Located in the heart of the city, we have been serving our community with passion and pride since 2005. Join us and experience what makes our place truly special!';
    paragraph.id = 'about-description';
    paragraph.classList.add('text-content');

    content.appendChild(heading);
    content.appendChild(paragraph);
}
