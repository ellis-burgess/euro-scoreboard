const newUser = document.getElementById('new-user');
const welcome = document.getElementById('welcome');

if (localStorage.getItem('name')) {
    newUser.remove();
    welcome.textContent = `Welcome, ${localStorage.getItem('name')}!`;
} else {
    let userName = document.getElementById('name-entry');
    let submit = document.querySelector('button');
    submit.addEventListener('click', () => {
        localStorage.setItem('name', userName.value);
        newUser.remove();
        welcome.textContent = `Welcome, ${localStorage.getItem('name')}!`;
    })
}