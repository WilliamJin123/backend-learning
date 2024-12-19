export default function loadMenu() {
    const content = document.getElementById('content');

    const heading = document.createElement('h1');
    heading.textContent = 'Our Menu';
    heading.id = 'menu-heading';
    heading.classList.add('heading');

    const menuList = document.createElement('ul');
    menuList.id = 'menu-list';
    menuList.classList.add('menu-list');

    const items = [
        'Spaghetti Carbonara',
        'Margherita Pizza',
        'Caesar Salad',
        'Tiramisu'
    ];

    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.classList.add('menu-item');
        menuList.appendChild(listItem);
    });

    content.appendChild(heading);
    content.appendChild(menuList);
}