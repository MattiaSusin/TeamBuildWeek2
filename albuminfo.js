document.addEventListener("DOMContentLoaded", () => {
  const albumData = JSON.parse(localStorage.getItem("albumData"));
  if (albumData) {
    const albumDetailsContainer = document.getElementById("album-details");

    const formatDuration = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
    };

    const albumDetailsHtml = `
    <div class="container-fluid">
      <div class="row align-items-center mt-5">
        <div class="col-2 d-flex align-items-center">
          <img class="img" src="${albumData.cover_medium}" alt="${albumData.title}" />
        </div>
        <div class="col-10 d-flex flex-column justify-content-between">
          <h1 class="text-light m-0">${albumData.title}</h1>
          <div class="d-flex align-items-center mt-3">
            <img class="artist-img rounded-circle me-2" src="./assets/imgs/main/image-12.jpg" alt="artistImage" />
            <p class="text-light m-0">${albumData.artist.name}</p>
            <p class="text-light ms-2 m-0">${new Date(albumData.release_date).toDateString()}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-3 mb-3">
            <button type="button" class="btn btn-success">Play</button>
            <button type="button" class="btn btn-outline-light">♥</button>
            <button type="button" class="btn btn-outline-light">...</button>
          </div>

          <div class="container">
            <div class="row">
              <div class="col-12">
                <ol class="ms-4 mt-3">
                  <li class="mb-3 song-item">
                    <div class="details">
                      <span>#TITOLO</span>
                      <span class="ms-5">RIPRODUZIONI</span>
                      <span class="ms-3">DURATION</span>
                    </div>
                  </li>
                </ol>
                <div id="album-details"></div>
                <hr class="text-secondary" />
              </div>
            </div>
          </div>
        </div>

    
    <ul class="track-list ms-4 mt-3">
      ${albumData.tracks.data
        .map(
          (track) => `
        <li class="list-group-item">
          <div class="row">
        
            <div class="col-6 mt-3">${track.title} <br> ${track.artist.name}</div>
            <div class="col-3 mt-3">${track.rank}</div>
            <div class="col-3 mt-3">${formatDuration(track.duration)}</div>
            
          </div>
        </li>
      `
        )
        .join("")}
    </ul>
  `;

    /*llll*/

    ` <h1 class="text-light m-0">${albumData.title}</h1>
          <img class="img" src="${albumData.cover_medium}" alt="${albumData.title} cover">
          <p><strong>Artist:</strong> ${albumData.artist.name}</p>
          <p><strong>Release Date:</strong> ${new Date(albumData.release_date).toDateString()}</p>
          <h2>Tracks</h2>
          <ul class="track-list">
            ${albumData.tracks.data
              .map(
                (track) => `
              <li>
                <p><strong></strong> ${track.title}</p>
                <p><strong></strong> ${track.artist.name}</p>
                <p><strong></strong> ${track.rank}</p>
                <p><strong></strong> ${formatDuration(track.duration)}</p>
              </li>
            `
              )
              .join("")}
          </ul>
        `;

    albumDetailsContainer.innerHTML = albumDetailsHtml;
  } else {
    document.body.innerHTML = "<p>Not</p>";
  }
});
