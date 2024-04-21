document.addEventListener('DOMContentLoaded', function() {
    const contributeLink = document.querySelector('a[href="./feed.html#post-box"]');
    const postBox = document.getElementById('post-box');

    // Function to add highlighting border around post-box
    function highlightPostBox() {
        if (postBox) {
            postBox.style.border = '2px solid #FFA500'; // Orange border
            setTimeout(() => {
                postBox.style.border = 'none'; // Remove border after 5 seconds
            }, 5000);
        }
    }

    // Function to handle clicking on contribute link
    function handleContributeLink(event) {
        event.preventDefault(); // Prevent default link behavior
        const hash = this.getAttribute('href'); // Get the hash value

        // Redirect to the specified URL
        window.location.href = hash;

        // Highlight the post-box
        highlightPostBox();
    }

    // Event listener for clicking on the contribute link
    if (contributeLink) {
        contributeLink.addEventListener('click', handleContributeLink);
    }

    // Check if the contribute link is not found or the user is not on the feed page
    if (!contributeLink || window.location.pathname !== '/feed.html') {
        // Highlight the post-box directly
        highlightPostBox();
    }
});



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
  
  //contribute
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

  // send course selection to server
// via form

function sendSidebarData() {
    document.getElementById("sidebarForm").submit();
}

  // ajax (not working)

/*
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
*/

function toggleForm(formToShow, formToHide) {
    document.getElementById(formToShow).style.display = "block";
    document.getElementById(formToHide).style.display = "none";
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button-post-box');
    buttons.forEach(button => button.classList.remove('active'));

    // Add active class to the clicked button
    document.querySelector(`button[data-form="${formToShow}"]`).classList.add('active');
}
