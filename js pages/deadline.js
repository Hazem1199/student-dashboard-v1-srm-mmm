const searchInput = document.getElementsByName("search");
const searchButton = document.querySelector('.search-button');


async function getInfoDeadlines(id) {
    const baseUrl = `https://script.google.com/macros/s/AKfycbxTI9S1emlI6Vls1ZVLIDRCpPlxKEXf7mRTjc8XaG7zXsXAVAGfhLeTUfoTnCfYQ2LlAQ/exec`;
    let url = baseUrl;
    if (id) {
      url += `?id=${id}`;
    }
    const response = await fetch(url);
  const data = await response.json();
  return data;
  }
  

var loadingDiv = document.querySelector('.loading-div')

var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
    loadingDiv.style.display = "block";
    overlay.style.display = "block";
}

function hide() {
    overlay.style.display = "none";
    loadingDiv.style.display = "none";
}


async function showDeadlines(id) {
    change();
    const students = await getInfoDeadlines(id);
    const tableBody = document.querySelector('.tbody1');
    // Remove all existing rows from the table
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }

    students.forEach(element => {
        if (id == element.ID) {
            const student = { DueDate: element[`Due Date`], Amount: element.Amount, Status: element.Status };
            const newRow = document.createElement('tr');
            const DueDateCell = document.createElement('td');
            const AmountCell = document.createElement('td');
            const StatusCell = document.createElement('td');
            newRow.appendChild(DueDateCell);
            newRow.appendChild(AmountCell);
            newRow.appendChild(StatusCell);
            DueDateCell.innerHTML = student.DueDate;
            AmountCell.innerHTML = student.Amount;

            // Create and append img element based on student.Status
            const img = document.createElement('img');
            img.src = student.Status === "paid" ? "../imgs/correct.png" : "./imgs/png-transparent-computer-icons-ok-miscellaneous-trademark-cross.png";
            img.alt = student.Status;
            img.style.width = "7%";
            StatusCell.appendChild(img);
            tableBody.appendChild(newRow);
        }
    });
    hide(); // hide the loading overlay once the requests are shown
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
showDeadlines(id);

// add an event listener to the window object to run the `change()` function when a new window is opened
window.addEventListener('open', change);

window.onload = function () {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search")

  closeBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open")
    menuBtnChange()
  })

  searchBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open")
    menuBtnChange()
  })

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
    }
  }
}