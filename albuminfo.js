document.addEventListener("DOMContentLoaded", () => {
  const albumData = JSON.parse(localStorage.getItem("albumData"));
  if (albumData) {
    const albumDetailsContainer = document.getElementById("album-details");
    const albumDetailsHtml = `
            <h1>${albumData.title}</h1>
            <img src="${albumData.cover_medium}" alt="${albumData.title} cover">
            <p><strong>Artist:</strong> ${albumData.artist.name}</p>
            <p><strong>Release Date:</strong> ${new Date(
              albumData.release_date
            ).toDateString()}</p>
            <h2>Tracks</h2>
            <ul class="track-list">
                ${albumData.tracks.data
                  .map(track => `<li>${track.title}</li>`)
                  .join("")}
            </ul>
        `;
    albumDetailsContainer.innerHTML = albumDetailsHtml;
  } else {
    document.body.innerHTML =
      "<p>Album data not found. Please go back and try again.</p>";
  }
});
