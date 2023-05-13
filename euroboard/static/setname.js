const newUser = document.getElementById('new-user');
const welcome = document.getElementById('welcome');

if (localStorage.getItem('name')) {
    newUser.getElementsByTagName('p')[0].textContent = 'Change Name:';
    welcome.textContent = `Welcome to the Euro App, ${localStorage.getItem('name')}!`;
}
    let userName = document.getElementById('name-entry');
    let submit = document.getElementById('submit-btn');
    submit.addEventListener('click', () => {
        localStorage.setItem('name', userName.value);
        welcome.textContent = `Welcome to the Euro App, ${localStorage.getItem('name')}!`;
    })