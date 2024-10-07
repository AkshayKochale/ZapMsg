function login(type) {
  console.log("Login function was called....");

  // Redirect to OAuth2 authorization URL
  window.location.href = `http://localhost:8080/oauth2/authorization/${type}`;
}
// Function to handle OAuth2 callback and fetch JWT
function handleOAuthCallback() {
  // Parse the URL and get the token from the query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  if (token) {
    console.log('JWT:', token);

    // Step 3: Store the JWT in localStorage
    localStorage.setItem('jwt', token);

    // Redirect to the application dashboard
    window.location.href ="http://localhost:5173/src/html/dashboard.html";

  } else {
    console.error('No JWT token found');
  }
}

// Call this function when the user lands back on your application after OAuth2 authentication
window.addEventListener('load', handleOAuthCallback);





function dbLogin(event)
{
    console.log("db login called...")
      event.preventDefault(); 
      const username = event.target.username.value;
      const password = event.target.password.value;

            const loginData = {
              username: username,
              password: password
            };

      console.log(loginData);

            axios.post('http://localhost:8080/login', loginData)
                .then(response => {
                    console.log('Response:', response.data); // Log the response to the console
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

}


function changeHeaderOnScroll() {
  const priTitle = document.querySelector('.priTitle');
  const header = document.querySelector('.header');

 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        
        header.style.backgroundColor = '#723aff';  // Example CSS change
        header.style.boxShadow = '0 4px 2px -2px gray';  // Example change
      } else {
        
        header.style.backgroundColor = '#edf0f7';  // Reset CSS
        header.style.boxShadow = 'none';  // Reset CSS
      }
    });
  });

  
  observer.observe(priTitle);
}

// Call the function on page load
window.onload = changeHeaderOnScroll1;