function loadPage(page) {
  const content = document.getElementById('content');

  // Fade out content
  content.classList.add('fade-out');

  setTimeout(() => {
    const url = page.endsWith(".html") ? page : `pages/${page}.html`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error("Page not found");
        return response.text();
      })
      .then(html => {
        content.innerHTML = html;
        content.classList.remove('fade-out');
        attachNavHandlers();
      })
      .catch(error => {
        content.innerHTML = "<p>Error loading page.</p>";
        content.classList.remove('fade-out');
      });
  }, 300);
}

function attachNavHandlers() {
  document.querySelectorAll('[data-page]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      loadPage(page);
      history.pushState({ page }, "", `#${page}`);
    });
  });
}

attachNavHandlers();

const initialPage = location.hash.replace('#', '') || 'home';
loadPage(initialPage);

window.addEventListener('popstate', (event) => {
  const page = event.state?.page || 'home';
  loadPage(page);
});
