// const getResponse = response => response.json();
// const processJSON = data => {const data = JSON}


var searchInput = document.getElementsByName("search");
var fName = document.querySelector(".fName");
var body = document.getElementById("body");
var infoBox = document.querySelector(".info-box");
var Email = document.querySelector(".Email");
var Phone = document.querySelector(".Phone");
var ID = document.querySelector(".ID");
var Requests = document.getElementById("Requests");
var Complaint = document.querySelector("#Complaint");
var searchButton = document.querySelector(".search-button");
var pic = document.getElementById("profile-pic");
var headName = document.querySelector(".headName");
var loadingDiv = document.querySelector(".loading-div");


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

async function getData() {
  const url = `https://script.googleusercontent.com/macros/echo?user_content_key=RmImvI_1fBKSBc3BQRgZcd0pMbjoi2WPy7p8Gl-jp1FanUiZpWok-P_1vyqoNtXPIvLoSHB-YR6TuynDKaFmUU3U4gEeuheZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGs-e9gwa0Ae-WtYW7QGGv96K2sSkHDFYJixQ8WV4H0jDu1Qf_oSHKRcYFtRYbNxLCfJ3zQRKTiXpDt6znfr0IuyTQ8p70QBO9z9Jw9Md8uu&lib=MQfVKFgVXIr2Rm9shkxeT9DVOmtUjdkhJ`;
  response = await fetch(url);
  data = await response.json();
  // console.log(data[0].Name);
  return data;
}

// Get data from session storage if it exists
const savedData = sessionStorage.getItem("myData");
if (savedData) {
  const data = JSON.parse(savedData);
  // Use the data to render the page
  fName.innerHTML = data.Name;
  ID.innerHTML = data.ID;
  Email.innerHTML = data.Email;
  Phone.innerHTML = data.Phone;
  headName.innerHTML = data.Name.slice(0, 50);
  pic.src = data.img;
  change();
  display(data.ID);
  hide()
}

async function display(value) {
  change();
  var users = await getData();

  users.forEach((element) => {
    if (value == element.ID) {
      let user = {
        Name: element.Name,
        ID: element.ID,
        Email: element.Email,
        Phone: element.Phone,
        img: element["Profile Pic"],
      };
      // Save the data to session storage
      sessionStorage.setItem("myData", JSON.stringify(user));
      // Use the data to render the page
      fName.innerHTML = user.Name;
      ID.innerHTML = user.ID;
      Email.innerHTML = user.Email;
      Phone.innerHTML = user.Phone;
      headName.innerHTML = user.Name.slice(0, 50);
      pic.src = user.img;
    }
  });
  hide();
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  const value = searchInput[0].value;
  display(value);
});

window.onload = function () {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search");

  closeBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  searchBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
};
