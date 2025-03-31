const form = document.querySelector("[data-form]");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {};
  const submitButton = event.submitter;
  const isAnother = submitButton.hasAttribute("data-another");

  formData.forEach((value, key) => {
    const numberFields = ["idade", "preco", "quantidade_em_stock"];
    data[key] = numberFields.includes(key) ? Number(value) : value;
  });

  console.log(JSON.stringify(data));

  const url = window.location.href;
  const method = url.includes("new") ? "POST" : "PUT";
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
