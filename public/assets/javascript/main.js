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

  // send course selection to server
  document.querySelector(".sidebar-select").addEventListener("click", function(event) {
    console.log("clicked");
    const course = $(this).data("sidebar"); // get data from particular course
    console.log({ course: course });


    $.ajax({
        url: '/feed',        //?course=${course}`,
        method: "POST",
        data: { course: course },
        success: function(response) {
          // Handle successful response from the server
          
            console.log("Data sent successfully!");
          
        },
        error: function(error) {
          // Handle network errors or server-side errors
          console.error("Error sending data:", error);
        }
      });
    });

    // toggle between img or text upload
    
    function setChooseForm(value) {
      const imageFields = document.getElementById('img-form');
      const codeFields = document.getElementById('text-form');
      // hide or show fields 
      if (value) {
          imageFields.style.display = 'block';
          codeFields.style.display = 'none';
      } else {
          imageFields.style.display = 'none';
          codeFields.style.display = 'block';
      }
  }
