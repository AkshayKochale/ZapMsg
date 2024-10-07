document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
    const userElement = document.getElementById('username');

    if (username) {
        userElement.textContent = `Welcome, ${username}`;
    } else {
        userElement.textContent = 'Welcome, Guest';
    }

    document.getElementById('logout').addEventListener('click', function() {
        localStorage.removeItem('jwt'); // Removing JWT from storage
        window.location.href = '/login'; // Redirecting to login page
    });
});


function changeContent(tabName) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = `You clicked on: ${tabName}`;
}
