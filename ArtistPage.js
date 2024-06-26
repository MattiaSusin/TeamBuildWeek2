document.addEventListener("DOMContentLoaded", async function () {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const artist = urlParams.get("artist");
      const titleElement = document.getElementById("title");
      if (titleElement) {
        titleElement.textContent = artist;
      }
      const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`;
  
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      const songs = data.data;
  
      const songsList = document.createElement("ol");
      songsList.classList.add("ms-4", "mt-3");
  
      const bgTestElement = document.querySelector(".bg-test");
      if (songs.length > 0) {
        const bgImage = songs[10].album.cover_xl;
        bgTestElement.style.backgroundImage = `url(${bgImage})`;
        bgTestElement.style.backgroundSize = "cover";
        bgTestElement.style.backgroundPosition = "center";
      }
  
      songs.forEach(song => {
        const listItem = document.createElement("li");
        listItem.classList.add(
          "mb-3",
          "song-item",
          "d-flex",
          "align-items-center"
        );
  
        const image = document.createElement("img");
        image.src = song.album.cover_medium;
        image.alt = song.title;
        image.classList.add("me-3");
  
        const details = document.createElement("div");
        details.classList.add(
          "details",
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "flex-grow-1"
        );
  
        const titleSpan = document.createElement("span");
        titleSpan.textContent = song.title;
        titleSpan.classList.add("me-5");
  
        const viewsSpan = document.createElement("span");
        viewsSpan.textContent = `${song.rank}`;
        viewsSpan.classList.add("me-3");
  
        const durationSpan = document.createElement("span");
        
  durationSpan.classList.add("duration-span");
        const durationMinutes = Math.floor(song.duration / 60);
        const durationSeconds = song.duration % 60;
        durationSpan.textContent = `${durationMinutes}:${
          durationSeconds < 10 ? "0" : ""
        }${durationSeconds}`;
  
        const durationWrapper = document.createElement("div");
        durationWrapper.classList.add("duration-wrapper");
        durationWrapper.appendChild(durationSpan);
  
        details.appendChild(titleSpan);
        details.appendChild(viewsSpan);
        details.appendChild(durationWrapper);
  
        listItem.appendChild(image);
        listItem.appendChild(details);
  
        songsList.appendChild(listItem);
      });
  
      const popularHeading = document.querySelector(".text-white.mt-4.ms-4");
      popularHeading.after(songsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });