let currentPage = 1;
const rowsPerPage = 5;

function showPage(page) {
  const rows = document.querySelectorAll(".data-row");
  rows.forEach((row) => row.classList.remove("highlight-page"));

  rows.forEach((row, index) => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    row.style.display = index >= start && index < end ? "" : "none";
  });

  const pageElement = document.getElementById("pageNumber");
  pageElement.textContent = `Página ${page}`;
  pageElement.classList.add("highlight");

  setTimeout(() => {
    pageElement.classList.remove("highlight");
  }, 500);
}

function nextPage() {
  const totalRows = document.querySelectorAll(".data-row").length;
  if (currentPage * rowsPerPage < totalRows) {
    currentPage++;
    showPage(currentPage);
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
  }
}
showPage(currentPage);

document.querySelectorAll(".delete-btn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const clientId = event.target.dataset.id;
    const confirmDelete = confirm(
      "Tem certeza que deseja excluir este cliente?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(`/clients/${clientId}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          window.location.reload();
        } else {
          alert("Erro ao excluir cliente");
        }
      } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao conectar com o servidor");
      }
    }
  });
});
