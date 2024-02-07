const goSignup = async (event) => {
    event.preventDefault();

  
    // Collect values from the login form
    const name = document.querySelector('#name-signup')
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password && name) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password, name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the home page
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.signup-form')
  .addEventListener('submit', goSignup);