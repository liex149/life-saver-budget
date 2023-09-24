const newCatFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the new post
    const name = document.querySelector('#title').value.trim();
    const post = document.querySelector('#post').value.trim();

    if (post) {
      // Send a POST request to the Homeroutes
      const response = await fetch(`/newpost`, {
        method: 'POST',
        body: JSON.stringify({ name, post }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.newblogpost')
    .addEventListener('submit', newCatFormHandler);
  
