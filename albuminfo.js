document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const artistName = urlParams.get("artist");

  const albumData = JSON.parse(localStorage.getItem("albumData"));
  if (
    albumData &&
    albumData.artist.name.replace(/\s+/g, "-").toLowerCase() === artistName
  ) {
    const albumDetailsContainer = document.getElementById("album-details");
    const trackListContainer = document.getElementById("tracklist-container");

    const formatDuration = seconds => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const trackList = albumData.tracks.data
      .map(track => {
        return `
        <li class="list-group-item ">
          <div class="row rowDettails">
            <div class="col-6 mt-3">
              ${track.title} <br>
              ${track.artist.name}
            </div>
            <div class="col-3 mt-3">${track.rank}</div>
            <div class="col-3 mt-3 durationEdit">${formatDuration(track.duration)}</div>
          </div>
        </li>
      `;
      })
      .join("");

    const albumDetailsHtml = `
      <div class="ms-4 mt-3">
        <img src="${albumData.cover_medium}" alt="${albumData.title} cover">
      </div>

      <div class="ms-4 mt-5 pt-4 align-items-end">
        <div><p class="text-light">ALBUM</p></div>
        <div><h1 class="h1Album text-light text-white fw-bold">${
          albumData.title
        }</h1></div>
        <div class="nameAlbum mt-5">
          <div><img src="./assets/imgs/search/image-4.jpg" alt="" class="artist-img me-1"></div>
          <div><p>
            <span class="text-white text-light">${
              albumData.artist.name
            } • ${new Date(albumData.release_date).toDateString()} •</span>
            <span class="text-light-emphasis">53 min 20 sec</span></p></div>
        </div>
      </div>
    `;

    albumDetailsContainer.innerHTML = albumDetailsHtml;
    trackListContainer.innerHTML = trackList; // Add this line to insert the tracklist
  } else {
    document.body.innerHTML = "<p>Album not found.</p>";
  }
});
