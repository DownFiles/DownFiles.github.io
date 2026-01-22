document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".download-form");
  const statusMsg = document.getElementById("statusMsg");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = document.getElementById("linkInput").value;
    const format = document.getElementById("formatSelect").value;

    if (!link || !link.startsWith("http")) {
      statusMsg.textContent = "❌ Por favor ingresa un enlace válido.";
      statusMsg.style.color = "red";
      return;
    }

    statusMsg.textContent = "⏳ Preparando tu descarga...";
    statusMsg.style.color = "black";

    setTimeout(() => {
      const mediafireLink = `https://www.mediafire.com/file/sample_${format}`;
      window.open(mediafireLink, "_blank");
      statusMsg.textContent = "✅ Tu descarga está lista 🚀";
      statusMsg.style.color = "green";
    }, 1500);
  });
});
