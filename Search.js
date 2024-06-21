document.getElementById("searchIcon").addEventListener("click", function () {
  const searchContainer = document.getElementById("search-container");
  const textSearch = document.getElementById("text-search");
  if (
    searchContainer.style.display === "none" ||
    searchContainer.style.display === ""
  ) {
    searchContainer.style.display = "inline-block";
    textSearch.style.display = "none";
  } else {
    searchContainer.style.display = "none";
    textSearch.style.display = "inline";
  }
});

document.getElementById("searchButton").addEventListener("click", searchArtist);

function searchArtist() {
  var artistName = document.getElementById("searchInput").value;

  var encodedArtistName = encodeURIComponent(artistName);

  var url = "http://127.0.0.1:5500/ArtistPage.html?artist=" + encodedArtistName;

  window.location.href = url;
}
