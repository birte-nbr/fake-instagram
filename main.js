

//toggle menu

const showSidebar = (toggleId, sidebarId, mainId) => {
    const toggle = document.getElementById(toggleId),
        sidebar = document.getElementById(sidebarId),
        main = document.getElementById(mainId)

    if (toggle && sidebar && main) {
        toggle.addEventListener('click', () => {
            /* open sidebar */
            sidebar.classList.toggle('show-sidebar');
            main.classList.toggle('main-pd');

            // Adjust main-container padding dynamically
            if (sidebar.classList.contains('show-sidebar')) {
                main.style.paddingLeft = sidebar.offsetWidth + 'px';
            } else {
                main.style.paddingLeft = '';
            }
        });
    }
}

showSidebar('navbar-top-toggle', 'sidebar', 'main');



function getTab(el) {
    const active = document.querySelector(".active");
    const visible = document.querySelector(".content-visible");
    const tabContent = document.getElementById(el.href.split("#")[1]);
  
    active.classList.toggle("active");
    visible.classList.toggle("content-visible");
  
    el.classList.add("active");
    tabContent.classList.add("content-visible");
  }
  
  document.addEventListener("click", (e) => {
    if (e.target.matches(".tab-item a")) {
      getTab(e.target);
    }
  });