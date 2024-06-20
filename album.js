document.addEventListener("DOMContentLoaded", () => {
  const albumContainers = {
    album1: "https://striveschool-api.herokuapp.com/api/deezer/album/597941372",
    album2: "https://striveschool-api.herokuapp.com/api/deezer/album/595243",
    album3: "https://striveschool-api.herokuapp.com/api/deezer/album/309377597",
    album4: "https://striveschool-api.herokuapp.com/api/deezer/album/75621062",
    album5: "https://striveschool-api.herokuapp.com/api/deezer/album/69804312",
    album6: "https://striveschool-api.herokuapp.com/api/deezer/album/13994766",
    album7: "https://striveschool-api.herokuapp.com/api/deezer/album/14048552",
    album8: "https://striveschool-api.herokuapp.com/api/deezer/album/533077002",
    album9: "https://striveschool-api.herokuapp.com/api/deezer/album/451171485",
    album10: "https://striveschool-api.herokuapp.com/api/deezer/album/80674402",
    album11:
      "https://striveschool-api.herokuapp.com/api/deezer/album/101230302",
    album12:
      "https://striveschool-api.herokuapp.com/api/deezer/album/285890322",
    album13:
      "https://striveschool-api.herokuapp.com/api/deezer/album/569618961",
    album14:
      "https://striveschool-api.herokuapp.com/api/deezer/album/561958172",
    album15:
      "https://striveschool-api.herokuapp.com/api/deezer/album/239880872",
    album16:
      "https://striveschool-api.herokuapp.com/api/deezer/album/216835762",
    album17:
      "https://striveschool-api.herokuapp.com/api/deezer/album/279228922",
    album18: "https://striveschool-api.herokuapp.com/api/deezer/album/58448032",
    album19:
      "https://striveschool-api.herokuapp.com/api/deezer/album/557619402",
    album20:
      "https://striveschool-api.herokuapp.com/api/deezer/album/374523387",
    album21:
      "https://striveschool-api.herokuapp.com/api/deezer/album/258772832",
    album22:
      "https://striveschool-api.herokuapp.com/api/deezer/album/100896762",
    album23:
      "https://striveschool-api.herokuapp.com/api/deezer/album/342924587",
    album24:
      "https://striveschool-api.herokuapp.com/api/deezer/album/303950837",
    album25:
      "https://striveschool-api.herokuapp.com/api/deezer/album/558810572",
    album26:
      "https://striveschool-api.herokuapp.com/api/deezer/album/556294552",
    album27:
      "https://striveschool-api.herokuapp.com/api/deezer/album/579783251",
    album28:
      "https://striveschool-api.herokuapp.com/api/deezer/album/393727427",
    album29:
      "https://striveschool-api.herokuapp.com/api/deezer/album/568901281",
    album30:
      "https://striveschool-api.herokuapp.com/api/deezer/album/560433462",
    album31: "https://striveschool-api.herokuapp.com/api/deezer/album/746059",
  };

  const fetchAlbumData = url => {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("Error fetching album data:", error);
        throw error;
      });
  };

  const albumIds = Object.keys(albumContainers);

  Promise.all(albumIds.map(id => fetchAlbumData(albumContainers[id])))
    .then(albums => {
      albums.forEach((album, index) => {
        if (album.error) {
          console.error("Error in album data:", album.error);
          return;
        }

        const albumHtml = `
          <img id="albumCover${index}" src="${album.cover_medium}" alt="${album.title} cover" style="cursor:pointer;">
          <p> Artista: ${album.artist.name}</p>
          <p>Album: ${album.title}</p>
        `;

        const id = albumIds[index];
        const albumContainer = document.getElementById(id);

        if (albumContainer) {
          albumContainer.innerHTML = albumHtml;

          const albumCover = albumContainer.querySelector(
            `#albumCover${index}`
          );
          albumCover.addEventListener("click", () => {
            localStorage.setItem("albumData", JSON.stringify(album));
            const artistName = album.artist.name
              .replace(/\s+/g, "-")
              .toLowerCase();
            window.location.href = `albumPage.html?artist=${artistName}`;
          });
        } else {
          console.error(`Element with id ${id} not found.`);
        }
      });
    })
    .catch(error => {
      albumIds.forEach(id => {
        const albumContainer = document.getElementById(id);
        if (albumContainer) {
          albumContainer.innerHTML = "<p>Album non trovato.</p>";
        }
      });
      console.error("Error in Promise.all:", error);
    });
});
