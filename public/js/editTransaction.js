const editTranFormHandler = async (event) => {
  event.preventDefault();
console.log('hi')
  // Collect values for the update
  const transactionAmount = document.querySelector("#total").value.trim();
  const transactionNote = document.querySelector("#note").value.trim();
  const transaction_id = document.querySelector("#tranid").dataset.indexNumber;
  const cat_id = document.querySelector('input[name="flexRadioDefault"]:checked').id

console.log(transactionAmount)
console.log(transactionNote)
console.log(transaction_id)
console.log(cat_id)
  if (transactionAmount && transactionNote && cat_id) {
    // Send a PUT request to the API endpoint
    const response = await fetch(`/transactions/${transaction_id}`, {
      method: "PUT",
      body: JSON.stringify({ transactionAmount, transactionNote,transaction_id, cat_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/transactions");
    } else {
      alert(response.statusText);
    }
  }
};


document
.querySelector('.edittran')
.addEventListener('click', editTranFormHandler);


