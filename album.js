document.addEventListener("DOMContentLoaded", () => {
  const albumContainer = document.getElementById("album");

  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
    .then(response => response.json())
    .then(album => {
      const albumHtml = `
                <img id="albumCover" src="${album.cover_medium}" alt="${album.title} cover" style="cursor:pointer;">
                <p>Artista: ${album.artist.name}</p>
                <p>Album: ${album.title}</p>
            `;
      albumContainer.innerHTML = albumHtml;

      const albumCover = document.getElementById("albumCover");
      albumCover.addEventListener("click", () => {
        localStorage.setItem("albumData", JSON.stringify(album));
        window.location.href = "Prototipopagina2.html";
      });
    })
    .catch(error => {
      albumContainer.innerHTML = "<p>Album non trovato.</p>";
      console.error("Error fetching album data:", error);
    });
});
