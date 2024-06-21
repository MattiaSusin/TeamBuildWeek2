document.getElementById("searchButton").addEventListener("click", searchArtist);

function searchArtist() {
  var artistName = document.getElementById("searchInput").value;

  var encodedArtistName = encodeURIComponent(artistName);

  var url = "http://127.0.0.1:5500/ArtistPage.html?artist=" + encodedArtistName;

  window.location.href = url;
}
