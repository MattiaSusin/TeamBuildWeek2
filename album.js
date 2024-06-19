document.addEventListener("DOMContentLoaded", () => {
  const albumIds = ["album1", "album2", "album3", "album4", "album5"];

  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
    .then(response => response.json())
    .then(album => {
      const albumHtml = `
        <img id="albumCover" src="${album.cover_medium}" alt="${album.title} cover" style="cursor:pointer;">
        <p>Artista: ${album.artist.name}</p>
        <p>Album: ${album.title}</p>
      `;

      albumIds.forEach(id => {
        const albumContainer = document.getElementById(id);
        albumContainer.innerHTML = albumHtml;

        const albumCover = albumContainer.querySelector("#albumCover");
        albumCover.addEventListener("click", () => {
          localStorage.setItem("albumData", JSON.stringify(album));
          window.location.href = "albumPage.html";
        });
      });
    })
    .catch(error => {
      albumIds.forEach(id => {
        const albumContainer = document.getElementById(id);
        albumContainer.innerHTML = "<p>Album non trovato.</p>";
      });
      console.error("Error fetching album data:", error);
    });
});
