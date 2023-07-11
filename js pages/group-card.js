// var searchInput = document.getElementsByName("search");
// var fName = document.querySelector(".fName");
// var body = document.getElementById("body");
// var infoBox = document.getElementsByClassName("info-box")
// var Email = document.querySelector('.Email');
// var Phone = document.querySelector('.Phone');
// var ID = document.querySelector('.ID');
// var Requests = document.getElementById('Requests');
// var Complaint = document.getElementById('Complaint');
// var searchButton = document.querySelector('.search-button');
// var pic = document.getElementById("profile-pic")
// var headName = document.querySelector('.headName') 
const seeMore4 = document.querySelector('.seeMore4');
const footer4 = document.querySelector('.footer4');



async function getInfoGroup(id) {
  const response = await fetch('https://script.google.com/macros/s/AKfycbwAIsY5c7ebcjrDN58-l097iqHF-_Rd6gChIbA4rcKggLD0qgVP95fgm2oHS8FjhxM5Iw/exec', {
    method: 'POST',
    body: JSON.stringify({ "id": id })
  })
  var data = await response.json();
  console.log(data);
  return data;
}




async function showGroup(id) {
  const students = await getInfoGroup(id);
  const tableBody = document.querySelector('.tbody2');

  // Remove all existing rows from the table
  // while (tableBody.firstChild) {
  //   tableBody.removeChild(tableBody.firstChild);
  // }

  // Create spinner element
  // const spinner = document.createElement('div');
  // spinner.classList.add('spinner');
  // document.body.appendChild(spinner);

  let totalDoneModules = 0;
  let moduleCount = 0;
  let i;

  for (let i = 1; i <= 12; i++) {
    students.forEach(student => {
      if (student[`g${i} module`]) {
        const date = new Date(student[`g${i} date`]);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString(undefined, options);
        const newRow = document.createElement('tr');
        const moduleCell = document.createElement('td');
        const groupCell = document.createElement('td');
        const dateCell = document.createElement('td');
        newRow.appendChild(groupCell);
        newRow.appendChild(moduleCell);
        newRow.appendChild(dateCell);
        moduleCell.textContent = student[`g${i} module`];
        groupCell.textContent = student[`g${i}`];
        dateCell.textContent = formattedDate;
        // tableBody.appendChild(newRow);
        moduleCount++;
        if (student[`g${i} grade`]) {
          totalDoneModules++;
        }
      }
    });
  }
  // Hide spinner element
  // document.body.removeChild(spinner);

  // Update the module count
  const moduleCountElement = document.getElementById('moduleCount');
  moduleCountElement.textContent = `${totalDoneModules} / ${moduleCount}`;

  // Update the footer based on the next module deadline
  const filteredModules = students.filter(student => {
    const date = new Date(student[`g${i} date`]);
    return date >= new Date();
  });
  const nextModule = filteredModules.sort((a, b) => new Date(a[`g${i} date`]) - new Date(b[`g${i} date`]))[0];
  if (nextModule) {
    const formattedDueDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(nextModule[`g${i} date`]));
    footer4.textContent = `Next Module: ${formattedDueDate}`;
  } else {
    footer4.textContent = 'No upcoming Module';
  }
  let moduleUrl = `Group.html?id=${id}`;
  seeMore4.href = moduleUrl;
  let module = await fetch(moduleUrl);
  let moduleData = await module.json();
  localStorage.setItem('moduleData', JSON.stringify(moduleData));
  window.open(moduleUrl);
}

// const page = document.querySelector('body');


// page.addEventListener('click', (event) => {
//     if (event.target !== searchInput) {
//         const tableBody = document.querySelector('.divTableBody');
//         tableBody.innerHTML = ""; // حذف جميع الصفوف في الجدول
//     }
// });

searchButton.addEventListener('click', () => {
  const id = searchInput[0].value;
  showGroup(id);
});
