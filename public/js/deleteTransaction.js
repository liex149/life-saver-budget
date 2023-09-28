async function deleteTranFormHandler(tran_id) {
    // event.preventDefault();
  
    if (tran_id) {
      const response = await fetch(`/deletetransaction/${tran_id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        document.location.replace("/transactions");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  const transaction_id = document.querySelectorAll("#transactiondelete");
  
  transaction_id.forEach(function (cm) {
    cm.addEventListener("click", function () {
      deleteTranFormHandler(this.dataset.indexNumber);
    });
  });
  