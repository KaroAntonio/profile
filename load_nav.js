document.addEventListener("DOMContentLoaded", function() {
    var navPlaceholder = document.getElementById("nav-placeholder");

    // Fetch the navigation header
    fetch("nav.html")
        .then(response => response.text())
        .then(data => {
            // Inject the navigation header into the placeholder element
            navPlaceholder.innerHTML = data;
        })
        .catch(error => console.error("Error fetching navigation header:", error));
});