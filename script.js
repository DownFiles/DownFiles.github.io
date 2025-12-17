document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".download-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const link = form.querySelector("input").value;
    const format = form.querySelector("select").value;

    // Simulación de redirección a MediaFire
    const mediafireLink = `https://www.mediafire.com/file/sample_${format}`;
    window.open(mediafireLink, "_blank");
  });
});
