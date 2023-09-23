async function logTransactionFormHandler (cat_id) {
  // event.preventDefault();

  // Collect values from the new post
  const transactionAmount = document
    .querySelector("#transactionAmt")
    .value.trim();


  if (transactionAmount) {
    // Send a POST request to the Homeroutes
    const response = await fetch(`/logTransaction`, {
      method: "POST",
      body: JSON.stringify({ transactionAmount, cat_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/logger");
    } else {
      alert(response.statusText);
    }
  }
};


const category_id = document.querySelectorAll("#category");

category_id.forEach(function(cm) {
    cm.addEventListener('click', function(){
        logTransactionFormHandler(this.dataset.indexNumber)
    })

})

// document
//   .querySelector(".newTransaction")
//   .addEventListener("click", logTransactionFormHandler);
