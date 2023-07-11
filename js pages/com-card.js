const cardText2 = document.querySelector(".text2");
const cardFooter2 = document.querySelector(".footer2");
// const searchInput = document.getElementsByName("search")[0];
// const fName = document.querySelector(".fName");
// const body = document.getElementById("body");
// const infoBox = document.getElementsByClassName("info-box");
// const Email = document.querySelector('.Email');
// const Phone = document.querySelector('.Phone');
// const ID = document.querySelector('.ID');
// const Requests = document.getElementById('Requests');
// const Complaint = document.getElementById('Complaint');
// const searchButton = document.querySelector('.search-button');
// const pic = document.getElementById("profile-pic");
// const headName = document.querySelector('.headName');
const seeMore2 = document.querySelector(".seeMore2");

async function getInfoComplaint() {
  const url = `https://script.google.com/macros/s/AKfycbwO4ZvcLywR7K06KqYbDNau2VuVENY_3IAaJHvLlixq1W2ANSQNYnMpB_sdFEphHjMg/exec`;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data[0].Name);
  return data;
}

// async function showLastComplaint(value) {
//     const complaints = await getInfoComplaint();
//     // let lastComplaint;
//     // let latestDate;
//     // for (let i = complaints.length - 1; i >= 0; i--) {
//     //     if (complaints[i].ID == value) {
//     //         if (!lastComplaint) {
//     //             lastComplaint = complaints[i];
//     //             latestDate = lastComplaint.Date;
//     //         } else if (complaints[i].Date > latestDate) {
//     //             lastComplaint = complaints[i];
//     //             latestDate = lastComplaint.Date;
//     //         }
//     //     }
//     // }
//     // if (lastComplaint) {
//     //     let comp = { Message: lastComplaint.Message, Date: lastComplaint.Date }
//     //     cardText2.textContent = comp.Message;
//     //     let date = new Date(latestDate);
//     //     let options = { year: 'numeric', month: 'short', day: 'numeric' };
//     //     let formattedDate = date.toLocaleDateString(undefined, options);
//     //     let formattedTime = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
//     //     cardFooter2.textContent = "last complaint : " + formattedDate + " at " + formattedTime;
//     //     let complaintUrl = `Complaint.html?id=${value}`;
//     //     seeMore2.href = complaintUrl;
//     //     let complaint = await fetch(complaintUrl);
//     //     let complaintData = await complaint.json();
//     //     localStorage.setItem('complaintData', JSON.stringify(complaintData));
//     //     window.open = complaintUrl;
//     // } else {
//     //     cardText2.textContent = "No request found with ID " + value;
//     // }
// }

async function getInfoComplaint(id) {
  const baseUrl = `https://script.google.com/macros/s/AKfycbwO4ZvcLywR7K06KqYbDNau2VuVENY_3IAaJHvLlixq1W2ANSQNYnMpB_sdFEphHjMg/exec`;
  let url = baseUrl;
  if (id) {
    url += `?id=${id}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const numComplaint = document.querySelector(".num-complaint");
const savedDatacom = sessionStorage.getItem("myDataCom");
if (savedDatacom) {
  const data = JSON.parse(savedDataReq);
  // Use the data to render the page
  // numRequest.innerHTML = data.totalRequest;
  showComplaint(data.ID);
}

async function showComplaint(id) {
  const complaints = await getInfoComplaint(id);
  // let tableBody = document.querySelector('.divTableBody');
  // tableBody.innerHTML = '';
  let filteredComplaint = complaints.filter((complaint) => complaint.ID == id);
  let complaintCount = filteredComplaint.length;
  // console.log(requestCount);
  numComplaint.textContent = complaintCount;
  let lastComplaint;
  let latestDate;
  for (let i = complaints.length - 1; i >= 0; i--) {
    if (complaints[i].ID == id) {
      if (!lastComplaint) {
        lastComplaint = complaints[i];
        latestDate = lastComplaint.Date;
      } else if (complaints[i].Date > latestDate) {
        lastComplaint = complaints[i];
        latestDate = lastComplaint.Date;
      }
    }
  }
  if (lastComplaint) {
    let comp = {
      ID: lastComplaint.ID,
      Message: lastComplaint.Message,
      Date: lastComplaint.Date,
      totalComplaint: filteredComplaint.length,
    };
    sessionStorage.setItem("myDataCom", JSON.stringify(comp));

    // cardText2.textContent = comp.Message;
    let date = new Date(latestDate);
    let options = { year: "numeric", month: "short", day: "numeric" };
    let formattedDate = date.toLocaleDateString(undefined, options);
    let formattedTime = date.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    cardFooter2.textContent =
      "last complaint : " + formattedDate + " at " + formattedTime;
    let complaintUrl = `Complaint.html?id=${id}`;
    seeMore2.href = complaintUrl;
    let complaint = await fetch(complaintUrl);
    let complaintData = await complaint.json();
    localStorage.setItem("complaintData", JSON.stringify(complaintData));
    window.open = complaintUrl;
  } else {
    // cardText2.textContent = "No request found with ID " + value;
  }
}

searchButton.addEventListener("click", () => {
  const id = searchInput[0].value;
  // showLastComplaint(value);
  showComplaint(id);
});
