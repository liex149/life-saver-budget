const newCatFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the new post
    const category_name = document.querySelector('#categoryname').value.trim();
 
    const expense = document.querySelector('input[name="flexRadioDefault"]:checked').id

console.log(expense)

    if (category_name) {
      // Send a POST request to the Homeroutes
      const response = await fetch(`/newcat`, {
        method: 'POST',
        body: JSON.stringify({ category_name, expense }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the logger page
        document.location.replace('/logger');
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.newcatpost')
    .addEventListener('click', newCatFormHandler);
  
