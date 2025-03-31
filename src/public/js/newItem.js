const form = document.querySelector("[data-form]");
const url = window.location.href;
const isCreating = url.includes("new");
if (!isCreating) {
  const btns = document.querySelectorAll("button");
  console.log(btns);
  btns.forEach((btn) => {
    if (btn.hasAttribute("data-another")) {
      btn.textContent = "Editar".toUpperCase();
      console.log("achei");
    } else {
      btn.style.display = "none";
    }
  });
}
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};
  const submitButton = event.submitter;
  const isAnother = isCreating
    ? submitButton.hasAttribute("data-another")
    : false;

  formData.forEach((value, key) => {
    const numberFields = ["idade", "preco", "stock"];
    data[key] = numberFields.includes(key) ? Number(value) : value;
  });

  console.log(JSON.stringify(data));

  const method = isCreating ? "POST" : "PUT";
  const type = window.location.pathname.split("/")[1];

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      if (method === "POST" && isAnother) {
        alert("Criado");
        form.reset();
      } else {
        window.location.href = `/${type}`;
      }
    }
  } catch (error) {
    console.error("Erro:", error);
  }
});
