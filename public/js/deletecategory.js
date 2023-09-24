async function deleteCatFormHandler(cat_id) {
  // event.preventDefault();

  if (cat_id) {
    const response = await fetch(`/delete/${cat_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/logger");
    } else {
      alert(response.statusText);
    }
  }
}

const category_id = document.querySelectorAll("#category");

category_id.forEach(function (cm) {
  cm.addEventListener("click", function () {
    deleteCatFormHandler(this.dataset.indexNumber);
  });
});
