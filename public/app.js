function loadPage(page) {
  const url = page.endsWith(".html") ? page : `pages/${page}.html`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Page not found");
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      attachNavHandlers(); // <- reattach after content load
    })
    .catch(error => {
      document.getElementById('content').innerHTML = "<p>Error loading page.</p>";
    });
}

function attachNavHandlers() {
  document.querySelectorAll('.navbar a[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      loadPage(page);
      history.pushState({ page }, "", `#${page}`);
    });
  });
}

// Run once on load
attachNavHandlers();

// Load correct page on first load
const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage);

// Support back/forward buttons
window.addEventListener('popstate', (event) => {
  const page = event.state?.page || 'home';
  loadPage(page);
});
