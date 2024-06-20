document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const artistName = urlParams.get("artist");

  const albumData = JSON.parse(localStorage.getItem("albumData"));
  if (
    albumData &&
    albumData.artist.name.replace(/\s+/g, "-").toLowerCase() === artistName
  ) {
    const albumDetailsContainer = document.getElementById("album-details");

    const formatDuration = seconds => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const albumDetailsHtml = `
          <h1>${albumData.title}</h1>
          <img src="${albumData.cover_medium}" alt="${albumData.title} cover">
          <p><a href="./ArtistPage.html?artist=${encodeURIComponent(
            albumData.artist.name
          )}"> <strong>Artist:</strong> ${albumData.artist.name} </a></p>
          <p><strong>Release Date:</strong> ${new Date(
            albumData.release_date
          ).toDateString()}</p>
          
          <ul class="track-list">
            ${albumData.tracks.data
              .map(
                track => `
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col mt-3">${track.title} </br> ${
                  track.artist.name
                }</div>
                      <div class="col mt-3">${track.rank}</div>
                      <div class="col mt-3">${formatDuration(
                        track.duration
                      )}</div>
                    </div>
                  </li>
            `
              )
              .join("")}
          </ul>
        `;

    albumDetailsContainer.innerHTML = albumDetailsHtml;
  } else {
    document.body.innerHTML = "<p>Album non trovato.</p>";
  }
});
