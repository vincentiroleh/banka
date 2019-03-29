// Dashboard toggle 
const menuIconEl = $('.menu-icon');
const sidenavEl = $('.sidenav');
const sidenavCloseEl = $('.sidenav__close-icon');

// Add and remove provided class names
function toggleClassName(el, className) {
  if (el.hasClass(className)) {
    el.removeClass(className);
  } else {
    el.addClass(className);
  }
}

// Open the side nav on click
menuIconEl.on('click', function () {
  toggleClassName(sidenavEl, 'active');
});

// Close the side nav on click
sidenavCloseEl.on('click', function () {
  toggleClassName(sidenavEl, 'active');
});

// Set current date
const currentDate = () => {
  let date = new Date();
  let n = date.getDate();
  document.getElementById("date").innerHTML = n;
}
currentDate();

// Return month of the year 
const currentMonth = () => {
  let month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  let date = new Date();
  let n = month[date.getMonth()];
  document.getElementById("month").innerHTML = n;
}
currentMonth();