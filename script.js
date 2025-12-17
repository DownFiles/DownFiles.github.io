document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".download-form");
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = form.querySelector("input").value;
    const format = form.querySelector("select").value;

    // Simulación: redirigir a MediaFire
    alert(`Tu archivo en formato ${format} está listo. Serás enviado a MediaFire.`);
    window.location.href = "https://www.mediafire.com"; 
  });
});
